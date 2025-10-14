import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";
import { auth } from "@/lib/auth";

import {
  AgentsViewLoading,
  AgentsView,
  AgentsViewError,
} from "@/modules/agents/ui/views/agents-view";
import ListHeader from "@/modules/agents/ui/components/list-header";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryCleint = getQueryClient();
  void queryCleint.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryCleint)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
