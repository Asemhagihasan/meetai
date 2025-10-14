"use client";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import GeneratedAvatar from "@/components/ui/generated-avatar";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import UpdateAgentDialog from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [udpaetAgentDialogOpen, setUdpaetAgentDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemovedConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "This action cannot be undone.",
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    console.log("ok", ok);

    if (!ok) return;

    removeAgent.mutate({ id: agentId });
  };

  return (
    <>
      <RemovedConfirmation />
      <UpdateAgentDialog
        open={udpaetAgentDialogOpen}
        onOpenChange={setUdpaetAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUdpaetAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="rounded-lg border bg-white">
          <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong"
    />
  );
};
