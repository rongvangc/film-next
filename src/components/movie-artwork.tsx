import { mergeUrlImg, rankByPoint } from "@/lib/common";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UnknownSVG from "@/assets/images/unknown.svg";

interface MovieArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function MovieArtwork({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MovieArtworkProps) {
  const heading = movie?.title || movie?.original_title;

  return (
    <div className={cn("space-y-3 mb-3 cursor-pointer", className)} {...props}>
      <div className="overflow-hidden rounded-md relative hover:shadow-md mb-5">
        <Image
          src={
            movie?.poster_path ? mergeUrlImg(movie?.poster_path) : UnknownSVG
          }
          alt={heading}
          width={width}
          height={height}
          loading="lazy"
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
        {movie?.origin_country?.map((item) => (
          <span
            key={item}
            className="text-sm rounded-sm bg-white text-slate-900 font-semibold absolute top-1 p-1 py-0 left-1 capitalize"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="space-y-1 text-sm relative">
        {!!movie?.vote_average && (
          <span
            className={cn(
              rankByPoint(Math.round(movie?.vote_average)),
              "baged-point"
            )}
          >
            {Math.round(movie?.vote_average)} &#9734;
          </span>
        )}
        <h3 className="font-medium leading-none">{heading}</h3>
        <p className="text-xs text-muted-foreground truncate-2-line">
          {movie?.overview}
        </p>
        {movie?.release_date && (
          <p className="inline-block rounded-sm py-0.5 px-2 text-xs text-green-600 bg-green-200 shadow-sm font-medium">
            {movie?.release_date}
          </p>
        )}
      </div>
    </div>
  );
}
