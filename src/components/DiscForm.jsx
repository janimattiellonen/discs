import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { fetchDiscDataAsync } from '../ducks/discs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ControlledTextField = ({
    name,
    label,
    labelPlacement,
    control,
    handleOnChange,
    rules,
    errorComponent,
    ...rest
}) => (
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
    const manufacturers = useSelector((state) => state.discs.data?.manufacturers || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDiscDataAsync());
    }, [fetchDiscDataAsync]);

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            manufacturer: '',
            type: '',
        },
    });
    const onSubmit = (data) => console.log(data);

    console.log(`Errors: ${JSON.stringify(errors, null, 2)}`);
    return (
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
                    <Controller
                        name={'type'}
                        control={control}
                        rules={{ required: 'Type is required' }}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl style={{ width: '150px' }}>
                                <InputLabel id="demo-simple-select-label">Disc type</InputLabel>
                                <Select name={name} label="Disc type" value={value} onBlur={onBlur} onChange={onChange}>
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
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};
