import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { MeetingStatus } from "../../types";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { CommandSelect } from "@/components/command-select";

const oprions = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Complated,
    value: MeetingStatus.Complated,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Complated}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <CommandSelect
      placeholder="Filter by status"
      options={oprions}
      className="h-9"
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status || ""}
    />
  );
};

export default StatusFilter;
