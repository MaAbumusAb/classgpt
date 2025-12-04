import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the ClassGPT title', () => {
    render(<Header />);
    const title = screen.getByText(/ClassGPT/i);
    expect(title).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<Header />);
    const chatButton = screen.getByText('Chat');
    const signInButton = screen.getByText('Sign In');
    expect(chatButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
});
