import { Content } from "@/components/content";
import { mappingHeading } from "@/lib/common";
import { getDiscover } from "@/services/discover";

export default async function DiscoverPage({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cat = params?.cat;

  const heading = mappingHeading(cat);
  const page = searchParams?.page ? +searchParams?.page : 1;

  const movies: MovieList = await getDiscover(cat, page);

  return (
    <Content heading={heading} type="movie" movies={movies} page={+page} />
  );
}
