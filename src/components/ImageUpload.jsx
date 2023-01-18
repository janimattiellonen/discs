import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import { uploadImageAsync } from '../ducks/images';

export function ImageUpload({ handleClose, open }) {
    const { getIdTokenClaims } = useAuth0();

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        (async () => {
            const tokenData = await getIdTokenClaims();

            const files = data.image ? [...data.image] : [];
            // eslint-disable-next-line no-underscore-dangle
            const token = tokenData?.__raw;
            const formData = new FormData();

            files.forEach((file) => {
                formData.append('image', file, file.name);
            });

            console.info(`FUCK: ${JSON.stringify(formData, null, 2)}`);

            dispatch(uploadImageAsync({ formData, token }));
        })();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image upload</DialogTitle>
            <DialogContent>
                <form
                    onSubmit={(event) => {
                        event.stopPropagation();
                        handleSubmit(onSubmit)(event);
                    }}
                >
                    <input {...register('image')} type="file" multiple />

                    <Button variant="contained" type="submit">
                        Upload
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
