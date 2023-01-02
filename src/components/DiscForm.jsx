import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { fetchDiscDataAsync } from '../ducks/discs';

import { ImageUpload } from './ImageUpload';

const ControlledField = ({ name, label, labelPlacement, control, RenderComponent, ...rest }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel
                control={<RenderComponent {...field} {...rest} checked={field.value} />}
                label={label}
                labelPlacement={labelPlacement ? labelPlacement : ''}
            />
        )}
    />
);

const ControlledTextField = ({ name, label, labelPlacement, control, rules, errorComponent, ...rest }) => (
    <div className="block mt-4">
        <Controller
            rules={rules}
            name={name}
            control={control}
            render={({ field }) => <TextField label={label} {...field} {...rest} />}
        />
        {errorComponent}
    </div>
);

const Error = ({ text }) => (
    <Alert className="w-fit" severity="error">
        {text}
    </Alert>
);

export const DiscForm = ({}) => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

    const manufacturers = useSelector((state) => state.discs.data?.manufacturers || []);
    const images = useSelector((state) => state.images?.images || []);

    const dispatch = useDispatch();
    const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchDiscDataAsync());
    }, [fetchDiscDataAsync]);

    const {
        control,
        getValues,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            'HIO date': '',
            additional: '',
            broken: '',
            collection_item: '',
            color: '',
            donated: '',
            'Donation description': '',
            //dyeing_costs: '',
            fade: '',
            favourite: '',
            glide: '',
            glow: '',
            hole_in_one: '',
            huk: '',
            image: '',
            in_the_bag: '',
            manufacturer: '',
            material: '',
            missing_description: '',
            missing: '',
            name: '',
            own_stamp: '',
            price: '',
            //profit: '',
            sold_at: '',
            sold_for: '',
            sold_to: '',
            sold: '',
            speed: '',
            stability: '',
            type: '',
            weight: '',
        },
    });

    const onSubmit = (data) => {
        if (images?.length) {
            data.image = images[0];
        }

        console.log(data);
    };

    console.log(`Errors: ${JSON.stringify(errors, null, 2)}`);

    const watchShowLostFields = watch('missing', false);
    const watchShowSoldFields = watch('sold', false);
    const watchShowHIOFields = watch('hole_in_one', false);
    const watchDonatedFields = watch('donated', false);

    return (
        <div className="flex gap-4">
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ControlledTextField
                        name="name"
                        label="Name"
                        labelPlacement="start"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        errorComponent={errors.name && <Error text={errors.name?.message} />}
                    />
                    <div className="mt-4">
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{ required: 'Type is required' }}
                            render={({ field: { onChange, onBlur, name, value } }) => (
                                <FormControl style={{ width: '150px' }}>
                                    <InputLabel id="demo-simple-select-label">Disc type</InputLabel>
                                    <Select
                                        name={name}
                                        label="Disc type"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        <MenuItem value={''}>Select...</MenuItem>
                                        <MenuItem value={'putter'}>Putters</MenuItem>
                                        <MenuItem value={'midrange'}>Midranges</MenuItem>
                                        <MenuItem value={'fairwayDriver'}>Fairway drivers</MenuItem>
                                        <MenuItem value={'distanceDriver'}>Distance drivers</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {errors.type && <Error text={errors.type?.message} />}
                    </div>
                    <div className="mt-4">
                        <Controller
                            name={'manufacturer'}
                            control={control}
                            rules={{ required: 'Manufacturer is required' }}
                            render={({ field: { onChange, onBlur, name, value } }) => (
                                <FormControl style={{ width: '150px' }}>
                                    <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
                                    <Select
                                        name={name}
                                        label="Manufacturer"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    >
                                        <MenuItem value={''}>Select...</MenuItem>
                                        {manufacturers.map((manufacturer, i) => (
                                            <MenuItem key={`manufacturer-${i}`} value={manufacturer}>
                                                {manufacturer}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        {errors.manufacturer && <Error text={errors.manufacturer?.message} />}
                    </div>

                    <div className="mt-4">
                        <h2>Image</h2>

                        <p onClick={() => setIsImageUploadVisible(!isImageUploadVisible)}>Upload</p>

                        {images &&
                            images.map((imageId, index) => {
                                return (
                                    <p>
                                        {imageId}:
                                        <img src={`https://testdb-8e20.restdb.io/media/${imageId}`} />
                                    </p>
                                );
                            })}
                    </div>

                    <ControlledTextField name="color" label="Colour" labelPlacement="start" control={control} />
                    <ControlledTextField name="material" label="Material" labelPlacement="start" control={control} />

                    <ControlledTextField
                        type="number"
                        name="speed"
                        label="Speed"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 1, max: 16 }}
                        errorComponent={errors.speed && <Error text="Invalid value. Must be between 1 and 16" />}
                    />
                    <ControlledTextField
                        type="number"
                        name="glide"
                        label="Glide"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 1, max: 7 }}
                        errorComponent={errors.glide && <Error text="Invalid value. Must be between 1 and 7" />}
                    />
                    <ControlledTextField
                        type="number"
                        name="stability"
                        label="Stability"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: -5, max: 1 }}
                        errorComponent={errors.stability && <Error text="Invalid value. Must be between 5 and 1" />}
                    />
                    <ControlledTextField
                        type="number"
                        name="fade"
                        label="Fade"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 0, max: 5 }}
                        errorComponent={errors.stability && <Error text="Invalid value. Must be between 0 and 5" />}
                    />

                    <ControlledTextField
                        name="additional"
                        label="Additional"
                        labelPlacement="start"
                        control={control}
                    />

                    <ControlledTextField
                        type="number"
                        name="weight"
                        label="Weight"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 0 }}
                        errorComponent={errors.weight && <Error text="Invalid value. Must be at least 0" />}
                    />

                    <div className="mt-4">
                        <ControlledField
                            name="missing"
                            label="Lost"
                            labelPlacement="end"
                            control={control}
                            RenderComponent={Checkbox}
                        />

                        {watchShowLostFields && (
                            <ControlledTextField
                                name="missing_description"
                                label="Lost description"
                                labelPlacement="start"
                                control={control}
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <ControlledField
                            name="sold"
                            label="Sold"
                            labelPlacement="end"
                            control={control}
                            RenderComponent={Checkbox}
                        />

                        {watchShowSoldFields && (
                            <div className="mt-4">
                                <Controller
                                    control={control}
                                    name="sold_at"
                                    render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                        <DesktopDatePicker
                                            {...field}
                                            inputRef={ref}
                                            inputFormat="dd.MM.yyyy"
                                            label="Sold at"
                                            labelPlacement="start"
                                            renderInput={(inputProps) => (
                                                <TextField
                                                    {...inputProps}
                                                    onBlur={onBlur}
                                                    name={name}
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <ControlledTextField
                                    type="number"
                                    name="sold_for"
                                    label="Sold for"
                                    labelPlacement="start"
                                    control={control}
                                    rules={{ min: 0 }}
                                    errorComponent={
                                        errors.sold_for && <Error text="Invalid value. Must be at least 0" />
                                    }
                                />
                                <ControlledTextField
                                    name="sold_to"
                                    label="Sold to"
                                    labelPlacement="start"
                                    control={control}
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <ControlledField
                            name="hole_in_one"
                            label="Hole in one"
                            labelPlacement="end"
                            control={control}
                            RenderComponent={Checkbox}
                        />

                        {watchShowHIOFields && (
                            <ControlledTextField
                                name="HIO date"
                                label="HIO date"
                                labelPlacement="start"
                                control={control}
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <ControlledField
                            name="donated"
                            label="Donated"
                            labelPlacement="end"
                            control={control}
                            RenderComponent={Checkbox}
                        />

                        {watchDonatedFields && (
                            <ControlledTextField
                                name="Donation description"
                                label="Donation description"
                                labelPlacement="start"
                                control={control}
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <ControlledField
                            name="broken"
                            label="Broken"
                            labelPlacement="end"
                            control={control}
                            RenderComponent={Checkbox}
                        />
                    </div>

                    <div className="mt-4">
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            <div>{isImageUploadVisible && <ImageUpload />}</div>
        </div>
    );
};
