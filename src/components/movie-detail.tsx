import { mergeUrlImg, randomColorTailWind, rankByPoint } from "@/lib/common";
import { cn } from "@/lib/utils";
import {
  ArrowBigLeft,
  BarChart2,
  BookA,
  CalendarRange,
  CircleDollarSign,
  Link,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import UnknownSVG from "@/assets/images/unknown.svg";
import { BackIcon } from "./back-icon";

type MovieDetailProps = {
  movie: MovieDetail;
} & React.HTMLAttributes<HTMLDivElement>;

export const MovieDetail = ({ movie, className }: MovieDetailProps) => {
  const heading = movie?.title || movie?.original_title;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      <BackIcon />
      <div
        className={cn(
          "mb-3 rounded-md min-w-96 h-min relative col-span-1",
          className
        )}
      >
        <Image
          src={
            movie?.poster_path ? mergeUrlImg(movie?.poster_path) : UnknownSVG
          }
          alt={heading}
          width={400}
          height={600}
          loading="lazy"
          className={cn(
            "h-auto w-full object-cover rounded-md overflow-hidden",
            "aspect-[3/4]"
          )}
        />
        {!!movie?.vote_average && (
          <span
            className={cn(
              rankByPoint(Math.round(movie?.vote_average)),
              "baged-point-detail"
            )}
          >
            {Math.round(movie?.vote_average)} &#9734;
          </span>
        )}
      </div>

      <div className="col-span-2 py-4 px-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {movie?.title}
          {movie?.adult && (
            <span className="text-sm rounded-sm bg-red-300 text-red-700 px-1 font-semibold capitalize">
              18+
            </span>
          )}
          <a href={movie?.homepage} target="_blank">
            <Link size={14} />
          </a>
        </h3>

        <em>{movie?.tagline}</em>

        <Separator className="my-4" />

        <div className="mb-2 flex justify-start items-center gap-2 text-xs font-medium">
          <p>Genres:</p>
          {movie?.genres?.map((genre) => (
            <span
              key={genre?.id}
              className={cn(randomColorTailWind(), "mr-1 rounded-sm py-1 px-2")}
            >
              {genre?.name}
            </span>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <CalendarRange />
          </i>
          Release date:
          <p>{movie?.release_date}</p>
        </div>

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <CircleDollarSign />
          </i>
          Budget:
          <p>{new Intl.NumberFormat("en-US").format(movie?.budget)}$</p>
        </div>

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <BookA />
          </i>
          Languages:
          {movie?.spoken_languages?.map((item, index) => (
            <span
              key={item?.iso_639_1}
              className="text-sm rounded-sm bg-white text-slate-900 font-semibold capitalize"
            >
              {item?.name}
              {index !== movie.spoken_languages.length - 1 && ","}
            </span>
          ))}
        </div>

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <BarChart2 />
          </i>
          Status:
          <p
            className={`${
              movie?.status === "Released"
                ? "bg-green-300 text-green-700"
                : "bg-orange-300 text-orange-700"
            } py-0.5 px-2 rounded-sm`}
          >
            {movie?.status}
          </p>
        </div>

        <Separator className="my-4" />

        <div className="mb-2">
          <h3 className="text-lg font-bold mb-4">Overview</h3>
          <p>{movie?.overview}</p>
        </div>

        <Separator className="my-4" />

        <div className="mb-2">
          <h3 className="text-lg font-bold mb-4">Production Companies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {movie?.production_companies?.map((company) => (
              <div
                key={company?.id}
                className="flex flex-col justify-center items-center text-center p-2 border-neutral-200 border-spacing-1 border border-dashed"
              >
                <div className="h-32 w-32 relative">
                  <Image
                    loading="lazy"
                    src={
                      company?.logo_path
                        ? mergeUrlImg(company?.logo_path)
                        : UnknownSVG
                    }
                    fill
                    alt={company?.name}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-medium">{company?.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
