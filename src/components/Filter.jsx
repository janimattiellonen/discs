import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import debounce from 'lodash.debounce';
import queryString from 'query-string';

import styled from '@emotion/styled';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
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

function ControlledField({ name, label, labelPlacement, control, handleOnChange, RenderComponent, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <RenderComponent
                            {...field}
                            {...rest}
                            checked={field.value}
                            onChange={(data) => {
                                field.onChange(data);
                                handleOnChange();
                            }}
                        />
                    }
                    label={label}
                    labelPlacement={labelPlacement || ''}
                />
            )}
        />
    );
}

function ControlledTextField({ name, label, labelPlacement, control, handleOnChange, ...rest }) {
    return (
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
}

const mapTermType = (params) => {
    if (params?.available === 'true') {
        return 'available';
    }

    if (params?.sold === 'true') {
        return 'sold';
    }

    if (params?.missing === 'true') {
        return 'missing';
    }

    if (params?.forSale === 'true') {
        return 'forSale';
    }

    if (params?.donated === 'true') {
        return 'donated';
    }
    return null;
};

export function Filter({ handleChange, params }) {
    const isExtraMarginNeeded = useMediaQuery('(max-width:444px)');

    const manufacturers = useSelector((state) => state.discs.data?.manufacturers || []);

    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            type: params?.type || '',
            manufacturer: params?.manufacturer || '',
            collection: '',
            forSale: '',
            holeInOne: '',
            ownStamp: '',
            donated: '',
            lost: '',
            missing: '',
            name: '',
            favourite: '',
            glow: '',
            huk: '',
            termType: mapTermType(params),
        },
    });

    useEffect(() => {
        if (params?.type) {
            setValue('type', params.type);
        }

        setValue('collection', !!params?.collection);
        setValue('holeInOne', !!params?.holeInOne);
        setValue('ownStamp', !!params?.ownStamp);
        setValue('favourite', !!params?.favourite);
        setValue('glow', !!params?.glow);
        setValue('huk', !!params?.huk);

        const termType = mapTermType(params);

        setValue('termType', termType || '');
    }, [params, setValue]);

    const debounceSearch = useCallback(
        debounce((nextValue) => {
            const filtered = Object.entries(nextValue).filter(
                ([, value]) => value !== false && value !== '' && value !== null,
            );

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

    const handleOnChange = () => {
        debounceSearch(getValues());
    };

    return (
        <div>
            <form>
                <ControlledTextField
                    variant="outlined"
                    name="name"
                    label=""
                    labelPlacement="start"
                    control={control}
                    handleOnChange={handleOnChange}
                />

                <Paper
                    elevation={3}
                    style={{
                        alignItems: 'center',
                        marginBottom: '20px',
                        marginRight: '20px',
                        padding: '10px',
                        display: 'flex',
                        gap: '20px',
                        flexFlow: 'row wrap',
                    }}
                >
                    <div style={{ flexGrow: 4 }}>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field: { onChange, onBlur, name, value } }) => (
                                <FormControl
                                    style={{
                                        width: '150px',
                                        marginRight: '60px',
                                        marginBottom: isExtraMarginNeeded ? '10px' : 0,
                                    }}
                                >
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
                                        <MenuItem value="">Select...</MenuItem>
                                        <MenuItem value="putter">Putters</MenuItem>
                                        <MenuItem value="midrange">Midranges</MenuItem>
                                        <MenuItem value="fairwayDriver">Fairway drivers</MenuItem>
                                        <MenuItem value="distanceDriver">Distance drivers</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="manufacturer"
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
                                        <MenuItem value="">Select...</MenuItem>
                                        {manufacturers.map((manufacturer) => (
                                            <MenuItem key={`manufacturer-${manufacturer}`} value={manufacturer}>
                                                {manufacturer}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            columnGap: '60px',
                            rowGap: '10px',
                            flexFlow: 'row wrap',
                        }}
                    >
                        <div>
                            <Controller
                                name="termType"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
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
                                        <FormControlLabel value="available" control={<Radio />} label="Available" />
                                        <FormControlLabel value="missing" control={<Radio />} label="Lost" />
                                        <FormControlLabel value="donated" control={<Radio />} label="Donated" />{' '}
                                        <FormControlLabel value="sold" control={<Radio />} label="Sold" />
                                        <FormControlLabel value="forSale" control={<Radio />} label="For sale" />{' '}
                                    </RadioGroup>
                                )}
                            />

                            <Button
                                variant="text"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue('termType', null);
                                    handleOnChange();
                                }}
                            >
                                Reset
                            </Button>
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

                            <ControlledField
                                name="favourite"
                                label="Favourite"
                                labelPlacement="end"
                                control={control}
                                handleOnChange={handleOnChange}
                                RenderComponent={Checkbox}
                            />

                            <ControlledField
                                name="glow"
                                label="Glow disc"
                                labelPlacement="end"
                                control={control}
                                handleOnChange={handleOnChange}
                                RenderComponent={Checkbox}
                            />

                            <ControlledField
                                name="huk"
                                label="Huk Lab stamp"
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
}
