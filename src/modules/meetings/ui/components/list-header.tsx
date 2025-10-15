"use client";

import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import StatusFilter from "./status-filter";
import AgentIdFilter from "./agent-id-filter";
import NewMeetingDialog from "./new-meeting-dialog";
import MeetingsSearchFilter from "./meetings-search-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const ListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDilaogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () =>
    setFilters({ status: null, agentId: "", search: "", page: 1 });

  return (
    <>
      <NewMeetingDialog open={isDilaogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button onClick={onClearFilters} variant="outline">
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default ListHeader;
