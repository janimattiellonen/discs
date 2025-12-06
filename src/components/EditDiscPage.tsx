import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useParams } from 'react-router';

import { DiscForm } from './DiscForm';
import { useDiscForm } from '../contexts';

export function EditDiscPage(): React.JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { disc, fetchDisc, resetDisc, updateDisc } = useDiscForm();
    const { getIdTokenClaims } = useAuth0();

    useEffect(() => {
        resetDisc();
        if (id) {
            fetchDisc(id);
        }
    }, [resetDisc, fetchDisc, id]);

    if (!disc?.name) {
        return <div>LOADING...</div>;
    }

    const saveHandler = async (
        data: Record<string, unknown>,
    ): Promise<void> => {
        const tokenData = await getIdTokenClaims();

        // eslint-disable-next-line no-underscore-dangle
        const token = tokenData?.__raw;

        if (token && id) {
            await updateDisc(id, data, token);
        }
    };

    return (
        <div className="mt-10 m-auto px-4 [max-width:800px]">
            <h1 className="mb-5">Edit disc {disc ? `(${disc.name})` : ''}</h1>

            <DiscForm
                disc={disc as Record<string, unknown>}
                saveHandler={saveHandler}
            />
        </div>
    );
}
