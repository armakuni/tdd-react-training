import { useMemo, ReactElement, ReactNode } from 'react';
import {
  act, fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import SauceSelector from './SauceSelector';
import Config from '../../Config';

interface WithConfigProps {
  config: Config
  children: ReactNode
}

function WithConfig({ config, children }: WithConfigProps): ReactElement {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      { children }
    </ConfigContext.Provider>
  );
}

function renderSauceSelector(
  onUpdate: ((_value: string) => void) | undefined = undefined,
): RenderResult | undefined {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <SauceSelector onUpdate={onUpdate || jest.fn()} />
    </WithConfig>,
  );
}

describe('SauceSelector', () => {
  const httpMock = new MockAdapter(axios);

  beforeEach(() => {
    httpMock.onGet('http://example.com/sauces').reply(200, ['big', 'small']);
  });

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('displays the title', async () => {
    renderSauceSelector();
    const titleElement = await screen.findByText('Select the sauce of your pizza');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the sauces', async () => {
    renderSauceSelector();
    const bigElement = await screen.findByText('big');
    const smallElement = await screen.findByText('small');

    expect(bigElement).toBeInTheDocument();
    expect(smallElement).toBeInTheDocument();
  });

  test('populated snapshot', async () => {
    const wrapper = renderSauceSelector();
    await screen.findByText('big');
    expect(wrapper).toMatchSnapshot();
  });

  it('only makes the request once', async () => {
    renderSauceSelector();
    await screen.findByText('big');
    // todo trigger a redraw
    expect(httpMock.history.get.length).toBe(1);
  });

  it('sends back selections on change', async () => {
    const onUpdate = jest.fn();
    renderSauceSelector(onUpdate);
    const bigSelector = await screen.findByLabelText('big');
    act(() => { fireEvent.click(bigSelector); });
    expect(onUpdate).toBeCalledWith('big');
  });
});
