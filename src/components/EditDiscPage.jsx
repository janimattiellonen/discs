import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { useParams } from 'react-router';
import { fetchDiscAsync, resetDisc, updateDiscAsync } from '../ducks/discs';

import { DiscForm } from './DiscForm';

export function EditDiscPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const disc = useSelector((state) => state.discs.disc);
    const { getIdTokenClaims } = useAuth0();

    useEffect(() => {
        dispatch(resetDisc());
        dispatch(fetchDiscAsync(id));
    }, [dispatch, id]);

    if (!disc?.name) {
        return <div>LOADING...</div>;
    }

    const saveHandler = async (data) => {
        const tokenData = await getIdTokenClaims();

        // eslint-disable-next-line no-underscore-dangle
        const token = tokenData?.__raw;

        dispatch(updateDiscAsync({ id, data, token }));
    };

    return (
        <div className="mt-10 m-auto px-4 [max-width:800px]">
            <h1 className="mb-5">Edit disc {disc ? `(${disc.name})` : ''}</h1>

            <DiscForm disc={disc} saveHandler={saveHandler} />
        </div>
    );
}
