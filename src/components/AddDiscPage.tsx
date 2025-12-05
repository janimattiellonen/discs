import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom';

import { DiscForm } from './DiscForm';
import { addNewDiscAsync, resetDisc } from '../ducks/discs';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export function AddDiscPage(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const id = useAppSelector((state) => state.discs.savedDiscId);
    const { getIdTokenClaims } = useAuth0();

    useEffect(() => {
        dispatch(resetDisc());
    }, [dispatch]);

    const saveHandler = async (data: any): Promise<void> => {
        const tokenData = await getIdTokenClaims();

        // eslint-disable-next-line no-underscore-dangle
        const token = tokenData?.__raw;

        dispatch(addNewDiscAsync({ data, token }));
    };
    return (
        <div className="mt-10 m-auto px-4 [max-width:800px]">
            <h1 className="mb-5">Add new disc</h1>

            <DiscForm
                saveHandler={saveHandler}
                onSuccess={() => {
                    navigate(`/disc/${id}/edit`, { replace: true });
                }}
            />
        </div>
    );
}
