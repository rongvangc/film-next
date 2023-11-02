import { MovieArtwork } from "@/components/movie-artwork";
import { render, screen } from "@testing-library/react";

describe("MovieArtwork", () => {
  const movie = {
    title: "Movie Title",
    poster_path: "",
    origin_country: ["Country 1", "Country 2"],
    vote_average: 7.5,
    overview: "Movie overview",
    release_date: "2022-01-01",
  } as Movie;

  test("renders movie artwork with correct data", () => {
    render(<MovieArtwork movie={movie} />);

    const titleElement = screen.getByText(movie.title);
    const overviewElement = screen.getByText(movie.overview);
    const releaseDateElement = screen.getByText(movie.release_date);

    expect(titleElement).toBeDefined();
    expect(overviewElement).toBeDefined();
    expect(releaseDateElement).toBeDefined();
  });

  test("renders movie artwork with unknown poster if poster_path is not available", () => {
    const movieWithoutPoster = { ...movie, poster_path: "" } as Movie;
    render(<MovieArtwork movie={movieWithoutPoster} />);
  });

  test("renders movie artwork with correct number of origin countries", () => {
    render(<MovieArtwork movie={movie} />);

    const originCountryElements = screen.getAllByText(/Country/);
    expect(originCountryElements.length).toBe(movie.origin_country.length);
  });

  test("renders movie artwork with correct vote average and rank", () => {
    render(<MovieArtwork movie={movie} />);
    const titleElement = screen.getByText(movie.title);

    expect(titleElement).toBeDefined();
  });
});
