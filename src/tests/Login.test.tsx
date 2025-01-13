import { render, screen } from '@testing-library/react'
import { Login } from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest'

describe('Login', () => {
  const renderComponent = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      }
    ]);

    render (
      <RouterProvider router={router} />
    )

    return { 
      header: screen.getByRole('heading'),
      inputUsername: screen.getByPlaceholderText('User'),
      inputPassword: screen.getByPlaceholderText('Password'),
      loginButton: screen.getByRole('button',{ name: 'Login' }),
      user: userEvent.setup(),
    }
  }

  it('should render Login screen correctly', () => {
    const { header, inputUsername, inputPassword } = renderComponent();

    expect(header).toBeInTheDocument();
    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  })

  it('should login correctly if user enters the correct user and password', async () => {
    const { inputUsername, inputPassword, loginButton, user } = renderComponent();

    await user.type(inputUsername, 'franco');
    await user.type(inputPassword, '123Franco');
    await user.click(loginButton);

    const message = screen.getByText(/successful/);

    expect(message).toBeInTheDocument();
  })

  it('should not login if user enters password with name in lowercase', async () => {
    const { inputUsername, inputPassword, loginButton, user } = renderComponent();

    await user.type(inputUsername, 'franco');
    await user.type(inputPassword, '123franco');
    await user.click(loginButton);

    const message = screen.getByText(/incorrect/);
    

    expect(message).toBeInTheDocument()
  })

  it('should not login if user enters username with numbers and incorrect password', async () => {
    const { inputUsername, inputPassword, loginButton, user } = renderComponent();

    await user.type(inputUsername, '123franco');
    await user.type(inputPassword, '12345Franco');
    await user.click(loginButton)

    const messageUsername = screen.getByText(/numbers/);
    const messagePassword = screen.getByText(/incorrect/);

    expect(messageUsername).toBeInTheDocument();
    expect(messagePassword).toBeInTheDocument();
  })

  it('should not login if user enters incorrect name as password', async () => {
    const { inputUsername, inputPassword, loginButton, user } = renderComponent();

    await user.type(inputUsername, 'franco');
    await user.type(inputPassword, '12345Jorge');
    await user.click(loginButton);

    const messagePassword = screen.getByText(/incorrect/);

    expect(messagePassword).toBeInTheDocument();
  })

  it('should not login if user enters username with capital letter', async () => {
    const { inputUsername, inputPassword, loginButton, user } = renderComponent();

    await user.type(inputUsername, 'Franco');
    await user.type(inputPassword, '123franco');
    await user.click(loginButton);

    const messageUsername = screen.getByText(/lowercase/);
    const messagePassword = screen.getByText(/incorrect/);

    expect(messageUsername).toBeInTheDocument();
    expect(messagePassword).toBeInTheDocument();
  })

})

