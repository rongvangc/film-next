import { Content } from "@/components/content";
import { Loader } from "@/components/loader";
import { getDiscover } from "@/services/discover";
import { Suspense } from "react";

export default async function DiscoverPage({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const heading = "Discover Movie";
  const page = searchParams?.page ? +searchParams?.page : 1;

  const movies: MovieList = await getDiscover("movie", page);

  return (
    <Suspense fallback={<Loader />}>
      <Content heading={heading} type="movie" movies={movies} page={+page} />
    </Suspense>
  );
}
