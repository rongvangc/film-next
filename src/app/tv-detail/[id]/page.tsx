import { TvDetail } from "@/components/tv-detail";
import { getTvsDetail } from "@/services/tv";

export default async function TvDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params?.id;

  const tvDetail = await getTvsDetail(+id);

  return <TvDetail tvData={tvDetail} />;
}
