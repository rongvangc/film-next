import { Content } from "@/components/content";
import { mappingHeading } from "@/lib/common";
import { getTvs } from "@/services/tv";

export default async function TvPage({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cat = params?.cat;
  const page = searchParams?.page ? +searchParams?.page : 1;

  const heading = mappingHeading(cat);
  const tvs: MovieList = await getTvs(cat, page);

  return <Content heading={heading} type="tv" movies={tvs} page={+page} />;
}
