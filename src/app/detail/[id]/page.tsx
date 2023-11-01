import { MovieDetail } from "@/components/movie-detail";
import { getMoviesDetail } from "@/services/movie";

export default async function DetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params?.id;

  const movieDetail = await getMoviesDetail(+id);

  return <MovieDetail movie={movieDetail} />;
}
