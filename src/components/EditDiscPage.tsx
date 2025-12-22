import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';

import { useParams } from 'react-router';

import { DiscForm } from './DiscForm';
import { useDiscForm } from '../contexts';

const Container = styled.div`
    margin-top: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    max-width: 800px;
`;

const Title = styled.h1`
    margin-bottom: 1.25rem;
`;

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
        <Container>
            <Title>Edit disc {disc ? `(${disc.name})` : ''}</Title>

            <DiscForm
                disc={disc as Record<string, unknown>}
                saveHandler={saveHandler}
            />
        </Container>
    );
}
