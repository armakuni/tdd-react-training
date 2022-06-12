import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import Options from './Options';

describe('Options', () => {
  const options = { a: 'Option A', b: 'Option B' };

  test('initial state snapshot', () => {
    const view = render(<Options question="question text" options={options} />);
    expect(view).toMatchSnapshot();
  });

  it('displays the question', async () => {
    render(<Options question="question text" options={options} />);
    const questionElement = await screen.findByText('question text');
    expect(questionElement).toBeInTheDocument();
  });

  it('displays options', async () => {
    render(<Options question="question text" options={options} />);
    const aElement = await screen.findByLabelText('Option A');
    const bElement = await screen.findByLabelText('Option B');

    expect(aElement).toBeInTheDocument();
    expect(aElement).toBeInstanceOf(HTMLInputElement);
    expect((aElement as HTMLInputElement).type).toBe('radio');

    expect(bElement).toBeInTheDocument();
    expect(bElement).toBeInstanceOf(HTMLInputElement);
    expect((bElement as HTMLInputElement).type).toBe('radio');
  });

  it('selects the initialValue', async () => {
    render(<Options question="question text" options={options} initialValue="b" />);
    const aElement = await screen.findByLabelText('Option A');
    const bElement = await screen.findByLabelText('Option B');

    expect((aElement as HTMLInputElement).checked).toBe(false);
    expect((bElement as HTMLInputElement).checked).toBe(true);
  });

  it('selects a different value', async () => {
    render(<Options question="question text" options={options} initialValue="b" />);
    const aElement = await screen.findByLabelText('Option A');
    const bElement = await screen.findByLabelText('Option B');

    act(() => { fireEvent.click(aElement); });

    expect((aElement as HTMLInputElement).checked).toBe(true);
    expect((bElement as HTMLInputElement).checked).toBe(false);
  });

  it('sends back selections on change', async () => {
    const onUpdate = jest.fn();

    render(<Options question="question text" options={options} initialValue="b" onUpdate={onUpdate} />);
    const aElement = await screen.findByLabelText('Option A');

    act(() => { fireEvent.click(aElement); });

    expect(onUpdate).toBeCalledWith('a');
  });
});
