# Visitor Trend Visualization Implementation Plan

## Project Structure Analysis

### Existing Components and Utilities
1. **UI Components** (src/components/ui/)
   - Select - For prefecture and store selection
   - Chart - For visualization with Recharts
   - Card - For layout structure

2. **Data Management** (src/lib/)
   - stores.ts - Contains prefecture and store data
   - api.ts - API client for data fetching
   - utils.ts - Utility functions for styling

3. **Data Hooks** (src/hook/)
   - useVisitorData - Ready-to-use hook for fetching data

4. **Provider** (src/provider/)
   - TanStack Query provider - Already configured

## Implementation Plan

### 1. Data Hook Enhancement
```typescript
// Modify useVisitorData to handle both current and previous week
const { data: currentData } = useQuery({
  queryKey: ["visitor-data", shop, date],
  queryFn: () => apiClient.fetchVisitorData({ shop, date })
});

const { data: prevData } = useQuery({
  queryKey: ["visitor-data", shop, prevDate],
  queryFn: () => apiClient.fetchVisitorData({ 
    shop, 
    date: format(subDays(new Date(date), 7), "yyyy-MM-dd")
  })
});
```

### 2. Store Selection
```typescript
// Using existing stores.ts data and Select components
const StoreSelection = () => {
  const [prefecture, setPrefecture] = useState<string | null>(null);
  const [store, setStore] = useState<string | null>(null);
  
  const stores = useMemo(() => 
    prefecture ? getStoresByPrefecture(prefecture) : [], 
    [prefecture]
  );
  
  return (
    <div>
      <Select onValueChange={setPrefecture}>
        {prefectures.map(pref => (
          <SelectItem key={pref} value={pref}>{pref}</SelectItem>
        ))}
      </Select>
      <Select 
        onValueChange={setStore} 
        disabled={!prefecture}
      >
        {stores.map(store => (
          <SelectItem key={store.id} value={store.id}>
            {store.name} ({store.location})
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
```

### 3. Graph Visualization
```typescript
// Using existing Chart component with Recharts
const VisitorChart = ({ currentData, prevData }) => {
  const chartConfig = {
    male: { color: "#2563eb", label: "男性" },
    female: { color: "#db2777", label: "女性" }
  };

  return (
    <ChartContainer config={chartConfig}>
      <LineChart>
        {/* Current week - solid lines */}
        <Line 
          dataKey="male" 
          stroke="#2563eb" 
          strokeWidth={2}
        />
        <Line 
          dataKey="female" 
          stroke="#db2777" 
          strokeWidth={2}
        />
        
        {/* Previous week - dashed lines */}
        <Line 
          dataKey="prevMale" 
          stroke="#2563eb" 
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <Line 
          dataKey="prevFemale" 
          stroke="#db2777" 
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ChartContainer>
  );
};
```

### 4. Main Page Component
```typescript
// Utilizing existing Card component for layout
export default function Page() {
  const [store, setStore] = useState<string | null>(null);
  const [date, setDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const { data, isLoading } = useVisitorData({
    shop: store,
    date
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>相席カウンター</CardTitle>
      </CardHeader>
      <CardContent>
        <StoreSelection onStoreSelect={setStore} />
        <VisitorChart data={data} />
      </CardContent>
    </Card>
  );
}
```

## Next Steps
1. Implement main page component
2. Set up store selection
3. Configure chart with proper data transformations
4. Add loading and error states using existing Card components

## Key Points
- Using existing UI components without modification
- Leveraging TanStack Query setup
- Utilizing existing data structures and types
- Making use of pre-configured providers