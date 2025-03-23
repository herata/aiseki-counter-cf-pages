interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="min-h-100 flex items-center justify-center text-destructive">
      エラーが発生しました: {message}
    </div>
  );
}