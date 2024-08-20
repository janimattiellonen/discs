import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

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
            <LoginIcon style={{marginRight: '5px'}}/>
          Sign in
        </Button>
      )}
    </div>
  );
}
