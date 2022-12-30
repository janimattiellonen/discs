import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
export const Login = () => {
    const { loginWithRedirect, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

    return (
        <div>
            <button
                onClick={async () => {
                    const foo = await loginWithRedirect();
                    console.log(`foo: ${JSON.stringify(foo, null, 2)}`);

                    const d = await getAccessTokenSilently();

                    console.log(`d: ${JSON.stringify(d, null, 2)}`);
                }}
            >
                Login
            </button>
        </div>
    );
};
