# Day 1 Exercise 2: TDD React Component

This exercise involves building a React component using tests to drive the development.

## Approach

When doing this exercise, try to implement the component using tests to convince
yourself that the code you have written is correct.

**BONUS POINTS TO ANYONE WHO MANAGES TO WRITE THE WHOLE COMPONENT USING ONLY
TESTS AND HAS IT WORKING THE FIRST TIME IT IS OPENED IN THE BROWSER!**

## Component Requirements

The component you have to develop is an Accordion menu. An accordion is a
vertically stacked, sectioned list ([see example](https://react-accordion-demo.netlify.app/)). Each section can be expanded by clicking the heading. The component must be developed **from scratch**. 

### Functional requirements

1. On initialization, no sections are expanded
2. A section expands when you click the title
3. When a section expands, all other sections close
4. You can close all sections by clicking the currently expanded title

### HTML

The generated HTML should look something like this:

```html
<div class="accordion">
  <div class="accordion__section accordion__section--closed">
    <div class="accordion__section-title">Bakery</div>
  </div>
  <div class="accordion__section accordion__section--opened">
    <div class="accordion__section-title">Dairy</div>
    <ul class="accordion__items">
      <li class="accordion__item">Milk</li>
      <li class="accordion__item">Cheeses</li>
      <li class="accordion__item">Yoghurts</li>
    </ul>
  </div>
  <div class="accordion__section accordion__section--closed">
    <div class="accordion__section-title">Produce</div>
  </div>
</div>
```

### Input

```typescript
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
```

### Usage

```typescript jsx
<App>
  <Accordion items={accordionItems} />
</App>
```

## How to Work

1. Create new files for your component and tests. Recommended locations would be
   `src/Accordion.tsx` and `src/Accordion.test.tsx`.
2. Develop your component.
3. Add `<Accordion items={accordionItems} />` to the `<App>` section of
   [App.tsx](./src/App.tsx).
4. Check in your browser and update/style to your heart's content.

## Stretch Exercises

If you want to add some additional functionality, here are some ideas to try
(in no particular order).

- Add a `boolean` property called `allowMultiple`; when set to true, multiple
  sections can be expanded at the same time. Also, consider added _Close All_
  and _Expand All_ buttons.
- Add an `onClick` property to the items so that they could be used as menu items.
- Consider whether it would make sense to de-compose into smaller sub-components. Some interesting reading might be looking into: [Break the UI into a component hierarchy](https://beta.reactjs.org/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy=)
