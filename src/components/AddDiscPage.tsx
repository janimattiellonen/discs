import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

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

export function AddDiscPage(): React.JSX.Element {
    const navigate = useNavigate();
    const { savedDiscId, addNewDisc, resetDisc } = useDiscForm();
    const { getIdTokenClaims } = useAuth0();

    useEffect(() => {
        resetDisc();
    }, [resetDisc]);

    const saveHandler = async (
        data: Record<string, unknown>,
    ): Promise<void> => {
        const tokenData = await getIdTokenClaims();

        // eslint-disable-next-line no-underscore-dangle
        const token = tokenData?.__raw;

        if (token) {
            await addNewDisc(data, token);
        }
    };
    return (
        <Container>
            <Title>Add new disc</Title>

            <DiscForm
                saveHandler={saveHandler}
                onSuccess={() => {
                    navigate(`/disc/${savedDiscId}/edit`, { replace: true });
                }}
            />
        </Container>
    );
}
