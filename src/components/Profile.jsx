import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const foo = async () => {
            const token = await getIdTokenClaims();
            console.log('token: ' + JSON.stringify(token, null, 2));
        };

        foo();
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    console.log('user: ' + JSON.stringify(user, null, 2));

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};
