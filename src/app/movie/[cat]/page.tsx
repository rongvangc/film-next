import { Content } from "@/components/content";
import { mappingHeading } from "@/lib/common";
import { getMovies } from "@/services/movie";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function MoviePage({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cat = params?.cat;

  const page = searchParams?.page ? +searchParams?.page : 1;

  const heading = mappingHeading(cat);
  const movies: MovieList = await getMovies(cat, page);

  return (
    <Suspense fallback={<Loader />}>
      <Content heading={heading} type="movie" movies={movies} page={+page} />
    </Suspense>
  );
}
