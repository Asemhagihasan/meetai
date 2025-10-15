import EmptyState from "@/components/empty-state";

const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-4">
      <EmptyState
        image="/processing.svg"
        title="Meeting complated"
        description="This meeting was complated, a summary will appear here."
      />
    </div>
  );
};

export default ProcessingState;
