import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import { useImageUpload } from '../contexts';

interface ImageUploadProps {
    handleClose: () => void;
    open: boolean;
}

interface ImageFormData {
    image?: FileList;
}

export function ImageUpload({
    handleClose,
    open,
}: ImageUploadProps): React.JSX.Element {
    const { getIdTokenClaims } = useAuth0();

    const { register, handleSubmit } = useForm<ImageFormData>();
    const { uploadImage } = useImageUpload();

    const onSubmit = (data: ImageFormData): void => {
        (async () => {
            const tokenData = await getIdTokenClaims();

            const files = data.image ? [...data.image] : [];
            // eslint-disable-next-line no-underscore-dangle
            const token = tokenData?.__raw;
            const formData = new FormData();

            files.forEach((file) => {
                formData.append('image', file, file.name);
            });

            if (token) {
                await uploadImage(formData, token);
            }
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
