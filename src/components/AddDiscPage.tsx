import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom';

import { DiscForm } from './DiscForm';
import { useDiscForm } from '../contexts';

export function AddDiscPage(): React.JSX.Element {
    const navigate = useNavigate();
    const { savedDiscId, addNewDisc, resetDisc } = useDiscForm();
    const { getIdTokenClaims } = useAuth0();

    useEffect(() => {
        resetDisc();
    }, [resetDisc]);

    const saveHandler = async (data: Record<string, unknown>): Promise<void> => {
        const tokenData = await getIdTokenClaims();

        // eslint-disable-next-line no-underscore-dangle
        const token = tokenData?.__raw;

        if (token) {
            await addNewDisc(data, token);
        }
    };
    return (
        <div className="mt-10 m-auto px-4 [max-width:800px]">
            <h1 className="mb-5">Add new disc</h1>

            <DiscForm
                saveHandler={saveHandler}
                onSuccess={() => {
                    navigate(`/disc/${savedDiscId}/edit`, { replace: true });
                }}
            />
        </div>
    );
}
