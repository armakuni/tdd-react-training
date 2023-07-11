import {render, RenderResult, screen} from "@testing-library/react";
import Accordion from "./Accordion";


describe('<Accordion />',  () => {
  let view: RenderResult;

  it('should display the section headings',  () => {
    const accordionItems = [
      {
        title: "Bakery",
        items: ["Bread", "Cakes"],
      },
      {
        title: "Dairy",
        items: ["Milk", "Cheeses", "Yoghurts"],
      },
      {
        title: "Produce",
        items: ["Vegetables", "Salads", "Fruit"],
      },
    ];

    view = render(<Accordion />)

    expect(screen.findByText("Bakery")).toBeInTheDocument()
    // expect(screen.findByText("Dairy")).toBeInTheDocument()
    // expect(screen.findByText("Produce")).toBeInTheDocument()
  });

});
