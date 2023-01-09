import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

export function Login() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      {isAuthenticated && <Button onClick={() => logout()}>Sign out</Button>}

      {!isAuthenticated && (
        <Button
          onClick={async () => {
            await loginWithRedirect();
          }}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}
