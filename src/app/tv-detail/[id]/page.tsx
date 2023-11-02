import { Loader } from "@/components/loader";
import { TvDetail } from "@/components/tv-detail";
import { getTvsDetail } from "@/services/tv";
import { Suspense } from "react";

export default async function TvDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params?.id;

  const tvDetail = await getTvsDetail(+id);

  return (
    <Suspense fallback={<Loader />}>
      <TvDetail tvData={tvDetail} />;
    </Suspense>
  );
}
