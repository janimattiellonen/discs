import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import debounce from 'lodash.debounce';
import queryString from 'query-string';

import styled from '@emotion/styled';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Paper from '@mui/material/Paper';

const SearchField = styled(TextField)({
    margin: '20px 20px 20px 0',
    width: 'calc(100% - 20px)',
    '&.MuiTextField-root': {
        '.MuiInputBase-input': {
            fontSize: '1em',
            padding: '5px 12px',
        },
    },
});

const ControlledField = ({ name, label, labelPlacement, control, handleOnChange, RenderComponent }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel
                control={
                    <RenderComponent
                        {...field}
                        onChange={(data) => {
                            field.onChange(data);
                            handleOnChange();
                        }}
                    />
                }
                label={label}
                labelPlacement={labelPlacement ? labelPlacement : ''}
            />
        )}
    />
);

const ControlledTextField = ({ name, label, labelPlacement, control, handleOnChange }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel
                control={
                    <SearchField
                        {...field}
                        onChange={(data) => {
                            field.onChange(data);
                            handleOnChange();
                        }}
                    />
                }
                label={label}
                labelPlacement={labelPlacement ? labelPlacement : ''}
            />
        )}
    />
);

const ControlledTextField2 = ({ name, label, labelPlacement, control, handleOnChange, ...rest }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <SearchField
                label={label}
                {...field}
                onChange={(data) => {
                    field.onChange(data);
                    handleOnChange();
                }}
                {...rest}
            />
        )}
    />
);

export const Filter = ({ handleChange }) => {
    const manufacturers = useSelector((state) => state.discs.data?.manufacturers || []);

    const {
        control,
        register,
        handleSubmit,
        watch,
        trigger,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            type: '',
            manufacturer: '',
            lastName: '',
            forSale: '',
            holeInOne: '',
            donated: '',
            lost: '',
            missing: '',
            name: '',
            termType: '',
        },
    });

    const debounceSearch = useCallback(
        debounce((nextValue) => {
            const filtered = Object.entries(nextValue).filter(([key, value]) => {
                return value !== false && value !== '' && value !== null;
            });

            const asObjects = Object.fromEntries(filtered);

            if (asObjects.termType) {
                asObjects[asObjects.termType] = true;
                delete asObjects.termType;
            }

            const query = queryString.stringify(asObjects);
            handleChange(query);
        }, 300),
        [],
    );

    const onSubmit = (data) => console.log(data);

    const handleOnChange = () => {
        const values = getValues();

        console.log('handleOnChange, values: ' + JSON.stringify(values));

        debounceSearch(values);
    };
    return (
        <div style={{ marginLeft: '30px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledTextField2
                    variant="outlined"
                    name="name"
                    label=""
                    labelPlacement="start"
                    control={control}
                    handleOnChange={handleOnChange}
                />

                <Paper elevation={3} style={{ marginBottom: '20px', marginRight: '20px', padding: '10px' }}>
                    <Controller
                        name={'type'}
                        control={control}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl style={{ width: '150px', marginRight: '60px', marginBottom: '20px' }}>
                                <InputLabel id="demo-simple-select-label">Disc type</InputLabel>
                                <Select
                                    name={name}
                                    label="Disc type"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={(e) => {
                                        onChange(e);
                                        handleOnChange();
                                    }}
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

                    <Controller
                        name={'manufacturer'}
                        control={control}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl style={{ width: '150px' }}>
                                <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
                                <Select
                                    name={name}
                                    label="Manufacturer"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={(e) => {
                                        onChange(e);
                                        handleOnChange();
                                    }}
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
                </Paper>

                <Paper elevation={3} style={{ marginBottom: '20px', marginRight: '20px', padding: '10px' }}>
                    <div style={{ display: 'flex', gap: '60px' }}>
                        <div>
                            <Controller
                                name="termType"
                                control={control}
                                render={({ field: { onChange, onBlur, name, value } }) => (
                                    <RadioGroup
                                        style={{ display: 'inline' }}
                                        row
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e);
                                            handleOnChange();
                                        }}
                                    >
                                        <FormControlLabel value="missing" control={<Radio />} label="Lost" />
                                        <FormControlLabel value="donated" control={<Radio />} label="Donated" />{' '}
                                        <FormControlLabel value="sold" control={<Radio />} label="Sold" />
                                        <FormControlLabel value="forSale" control={<Radio />} label="For sale" />{' '}
                                    </RadioGroup>
                                )}
                            />

                            <Link
                                href="#"
                                onClick={() => {
                                    setValue('termType', null);
                                    handleOnChange();
                                }}
                            >
                                Reset
                            </Link>
                        </div>
                        <div>
                            <ControlledField
                                name="ownStamp"
                                label="Own stamp"
                                labelPlacement="end"
                                control={control}
                                handleOnChange={handleOnChange}
                                RenderComponent={Checkbox}
                            />

                            <ControlledField
                                name="collection"
                                label="Collection item"
                                labelPlacement="end"
                                control={control}
                                handleOnChange={handleOnChange}
                                RenderComponent={Checkbox}
                            />

                            <ControlledField
                                name="holeInOne"
                                label="Hole in one"
                                labelPlacement="end"
                                control={control}
                                handleOnChange={handleOnChange}
                                RenderComponent={Checkbox}
                            />
                        </div>
                    </div>
                </Paper>
            </form>
        </div>
    );
};
