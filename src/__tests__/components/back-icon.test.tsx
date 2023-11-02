import { BackIcon } from "@/components/back-icon";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      back: () => jest.fn(),
    };
  },
}));

describe("BackIcon", () => {
  test("renders the back button", () => {
    const { container } = render(<BackIcon />);

    expect(container.querySelector(".absolute")).toBeDefined();
  });

  test("calls the back function when clicked", () => {
    const mockBack = jest.fn();

    const { container } = render(<BackIcon />);

    const button = container.querySelector(".absolute") as Element;

    fireEvent.click(button);

    expect(mockBack).toBeDefined();
  });
});
