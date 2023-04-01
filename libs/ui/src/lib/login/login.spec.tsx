import { render } from '@testing-library/react';
import { signIn, signOut } from 'next-auth/client';
import React from 'react';

import { LogIn } from './login';

describe('Log In', () => {
  it('should render successfully', () => {
    const logIn = () => signIn();
    const logOut = () => signOut();

    const { baseElement } = render(<LogIn logIn={logIn} logOut={logOut} />);
    expect(baseElement).toBeTruthy();
  });
});
