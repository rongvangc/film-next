import { Loader } from "@/components/loader";
import { MovieDetail } from "@/components/movie-detail";
import { getMoviesDetail } from "@/services/movie";
import { Suspense } from "react";

export default async function DetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params?.id;

  const movieDetail = await getMoviesDetail(+id);

  return (
    <Suspense fallback={<Loader />}>
      <MovieDetail movie={movieDetail} />;
    </Suspense>
  );
}
