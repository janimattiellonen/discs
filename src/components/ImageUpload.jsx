import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImageAsync } from '../ducks/images';

import Button from '@mui/material/Button';

export const ImageUpload = ({ handleClose, open }) => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

    const { control, register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data);

        console.log(`data.image[0]: ${JSON.stringify(data.image[0].name)}`);
        console.log('Ryan');

        (async () => {
            const tokenData = await getIdTokenClaims();

            const token = tokenData?.__raw;
            const formData = new FormData();
            formData.append('image', data.image[0], data.image[0].name);

            dispatch(uploadImageAsync(formData, token));
        })();
    };
    console.log(`open: ${open}`);
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image upload</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('image')} type="file" multiple />

                    <Button variant="contained" type="submit">
                        Upload
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
