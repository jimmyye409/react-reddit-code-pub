import React from 'react';
import { fireEvent, screen,render} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

test('first page next button', () => {
  //const { getByText } = render(<App />);
  //const nextElement = getByText(/Next/i);
  //expect(nextElement).toBeInTheDocument();
  const {getByText}=render(<App />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input,{target:{value:"sports"}})
  const usernameElement = await waitForElement(
    () => getByLabelText(container, 'username'),
    { container }
  )
  screen.getByRole('button',{name: 'Next'})
  
});

/*
test('types inside textarea', async () => {
  
  //document.body.innerHTML = `<textarea />`
  //await userEvent.type(screen.getByRole('textbox'), 'Hello, World!')
  //expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
  const { getByText } = render(<App />);
  const input = screen.getByRole('textbox')
  await userEvent.type(input, 'news')
  screen.getByRole('button')
  
})
*/
