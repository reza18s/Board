import Home from "@/app/(dashboard)/[[...rest]]/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<div className="App">hello world</div>);

    const heading = screen.queryByText("hello world");

    expect(heading).toBeVisible();
  });
});
