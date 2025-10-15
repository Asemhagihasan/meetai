"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex flex-1 flex-col gap-y-4 overflow-x-scroll px-4 pb-4 md:px-8">
      {" "}
      <DataTable data={data.items} columns={columns} />;
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create a meeting to join your meetings. Each meeting will follow your instructions and can instract with participants during the call."
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => (
  <LoadingState
    title="Loading Meetings"
    description="This may take a few seconds..."
  />
);

export const MeetingsViewError = () => (
  <ErrorState
    title="Error Loading Meetings"
    description="Something went wrong."
  />
);
