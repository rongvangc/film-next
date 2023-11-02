import { MovieDetail } from "@/components/movie-detail";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      back: () => null,
    };
  },
}));

describe("MovieDetail", () => {
  const movie = {
    title: "Movie Title",
    original_title: "Original Title",
    poster_path: "poster.jpg",
    vote_average: 7.5,
    adult: true,
    homepage: "https://example.com",
    tagline: "Movie Tagline",
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
    ],
    release_date: "2023-01-01",
    budget: 1000000,
    spoken_languages: [{ iso_639_1: "en", name: "English" }],
    status: "Released",
    overview: "Movie Overview",
    production_companies: [
      { id: 1, name: "Company 1", logo_path: "logo1.jpg" },
    ],
  } as MovieDetail;

  test("renders movie details correctly", () => {
    render(<MovieDetail movie={movie} />);

    expect(screen.getByText("Movie Title")).toBeDefined();
    expect(screen.getByText("18+")).toBeDefined();
    expect(screen.getByAltText("Movie Title")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
    expect(screen.getByText("Adventure")).toBeDefined();
    expect(screen.getByText("2023-01-01")).toBeDefined();
    expect(screen.getByText("Released")).toBeDefined();
  });
});
