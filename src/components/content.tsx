"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { MovieArtwork } from "./movie-artwork";

type ContentType = {
  heading: string;
  page: number;
  type: SeriesType;
  movies: MovieList;
};

export const Content = ({ movies, heading, page, type }: ContentType) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const handleChangePage = (selectedItem: { selected: number }) => {
    push(`${pathname}?page=${selectedItem?.selected + 1}`, {
      scroll: true,
    });
  };

  const handleToDetailPage = (id: number) => {
    if (type === "movie") {
      push(`/detail/${id}`);
      return;
    }
    push(`/tv-detail/${id}`);
  };

  return (
    <div className="border-none p-0 outline-none">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies?.results?.map((movie) => (
          <MovieArtwork
            key={movie.id}
            movie={movie}
            width={350}
            height={430}
            onClick={() => handleToDetailPage(movie?.id)}
          />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        disableInitialCallback
        onPageChange={handleChangePage}
        pageRangeDisplayed={2}
        forcePage={page - 1}
        pageCount={movies?.total_pages}
        previousLabel={<ArrowLeftSquare size={24} />}
        nextLabel={<ArrowRightSquare size={24} />}
      />
    </div>
  );
};
