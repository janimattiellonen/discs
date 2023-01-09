import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { addNewDiscAsync, fetchDiscDataAsync, markSavedAsAcknowledged } from '../ducks/discs';
import { ImageUpload } from './ImageUpload';
import { DiscSavedDialog } from './DiscSavedDialog';

function ControlledField({ name, label, labelPlacement, control, RenderComponent, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<RenderComponent {...field} {...rest} checked={field.value} />}
                    label={label}
                    labelPlacement={labelPlacement || ''}
                />
            )}
        />
    );
}

function ControlledAutoCompleteField({ options, control, name, label }) {
    return (
        <div className="block mt-4">
            <Controller
                control={control}
                name={name}
                defaultValue=""
                render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                        {...field}
                        onChange={(_, data) => onChange(data)}
                        getOptionLabel={(option) => option}
                        freeSolo
                        options={options}
                        renderInput={(params) => <TextField name={name} {...params} label={label} />}
                    />
                )}
            />
        </div>
    );
}
function ControlledDateField({ control, name, label }) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={null}
            render={({ field: { ref, onBlur, ...field }, fieldState }) => (
                <DesktopDatePicker
                    {...field}
                    inputRef={ref}
                    inputFormat="dd.MM.yyyy"
                    label={label}
                    labelPlacement="start"
                    renderInput={(inputProps) => (
                        <TextField
                            fullWidth
                            style={{ width: '15em' }}
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
    );
}

function ControlledTextField({ name, label, labelPlacement, control, rules, errorComponent, ...rest }) {
    return (
        <div className="block mt-4">
            <Controller
                rules={rules}
                name={name}
                control={control}
                render={({ field }) => <TextField fullWidth className="w-max" label={label} {...field} {...rest} />}
            />
            {errorComponent}
        </div>
    );
}

function Error({ text }) {
    return (
        <Alert className="w-fit mt-1.5" severity="error">
            {text}
        </Alert>
    );
}

export function DiscForm() {
    const manufacturers = useSelector((state) => state.discs.data?.manufacturers || []);
    const materials = useSelector((state) => state.discs.data?.materials || []);
    const saved = useSelector((state) => state.discs.saved);
    const navigate = useNavigate();

    const images = useSelector((state) => state.images?.images || []);

    const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);
    const [isDiscSavedDialogVisible, setIsDiscSavedDialogVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsDiscSavedDialogVisible(saved);
    }, [saved]);

    useEffect(() => {
        dispatch(fetchDiscDataAsync());
    }, [fetchDiscDataAsync]);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            'HIO date': '',
            'HIO description': '',
            additional: '',
            broken: '',
            collection_item: '',
            color: '',
            donated: '',
            'Donation description': '',
            // dyeing_costs: '',
            fade: '',
            favourite: '',
            for_sale: '',
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
            // profit: '',
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
        const clonedData = { ...data };

        const formatDate = (date) => format(new Date(date), 'dd.MM.yyyy');

        if (images?.length) {
            const index = 0;

            clonedData.image = images[index];
        }

        if (clonedData.sold_at) {
            clonedData.sold_at = formatDate(clonedData.sold_at);
        }

        if (clonedData['HIO date']) {
            clonedData['HIO date'] = formatDate(clonedData['HIO date']);
        }

        (async () => {
            console.log(JSON.stringify(clonedData, null, 2));

            dispatch(addNewDiscAsync(clonedData));
        })();
    };

    console.log(`Errors: ${JSON.stringify(errors, null, 2)}`);

    const watchShowLostFields = watch('missing', false);
    const watchShowSoldFields = watch('sold', false);
    const watchShowHIOFields = watch('hole_in_one', false);
    const watchDonatedFields = watch('donated', false);

    return (
        <div className="flex gap-4 mb-40">
            <DiscSavedDialog
                open={isDiscSavedDialogVisible}
                handleClose={() => {
                    setIsDiscSavedDialogVisible(false);
                    dispatch(markSavedAsAcknowledged());
                    navigate('/gallery', { replace: true });
                }}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                        name="type"
                        control={control}
                        rules={{ required: 'Type is required' }}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl fullWidth>
                                <InputLabel>Disc type</InputLabel>
                                <Select name={name} label="Disc type" value={value} onBlur={onBlur} onChange={onChange}>
                                    <MenuItem value="">Select...</MenuItem>
                                    <MenuItem value="Putter">Putters</MenuItem>
                                    <MenuItem value="Mid-range">Midranges</MenuItem>
                                    <MenuItem value="Fairway driver">Fairway drivers</MenuItem>
                                    <MenuItem value="Distance driver">Distance drivers</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    {errors.type && <Error text={errors.type?.message} />}
                </div>

                <div className="mt-4">
                    <Controller
                        name="manufacturer"
                        control={control}
                        rules={{ required: 'Manufacturer is required' }}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl fullWidth>
                                <InputLabel>Manufacturer</InputLabel>
                                <Select
                                    name={name}
                                    label="Manufacturer"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
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
                    {errors.manufacturer && <Error text={errors.manufacturer?.message} />}
                </div>

                <div className="mt-4 mb-4">
                    <h2 className="mb-4">Image</h2>

                    <Box className="mt-4" sx={{ p: 4, border: '1px dashed grey' }}>
                        <div className="m-auto w-fit block">
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => setIsImageUploadVisible(!isImageUploadVisible)}
                            >
                                Upload
                            </Button>
                        </div>
                    </Box>

                    <div>
                        <ImageUpload open={isImageUploadVisible} handleClose={() => setIsImageUploadVisible(false)} />
                    </div>

                    {images &&
                        images.map((imageId) => (
                            <p>
                                <img
                                    alt=""
                                    style={{ width: '400px' }}
                                    src={`https://testdb-8e20.restdb.io/media/${imageId}`}
                                />
                            </p>
                        ))}
                </div>

                <ControlledTextField name="color" label="Colour" labelPlacement="start" control={control} />

                {/* Use a basic text field for now, until issues with material API has been resolved */}
                {/*
                <ControlledAutoCompleteField
                    name="material"
                    label="Material"
                    control={control}
                    options={materials.map((item) => item)}
                />
                */}

                <ControlledTextField name="material" label="Material" labelPlacement="start" control={control} />

                <div className="grid grid-cols-2 gap-x-4">
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
                        errorComponent={errors.stability && <Error text="Invalid value. Must be between -5 and 1" />}
                    />
                    <ControlledTextField
                        type="number"
                        name="fade"
                        label="Fade"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 0, max: 5 }}
                        errorComponent={errors.fade && <Error text="Invalid value. Must be between 0 and 5" />}
                    />
                </div>
                <ControlledTextField name="additional" label="Additional" labelPlacement="start" control={control} />

                <ControlledTextField
                    type="number"
                    name="weight"
                    label="Weight"
                    labelPlacement="start"
                    control={control}
                    rules={{ min: 0 }}
                    errorComponent={errors.weight && <Error text="Invalid value. Must be at least 0" />}
                />

                <ControlledTextField
                    type="number"
                    name="price"
                    label="Price"
                    labelPlacement="start"
                    control={control}
                    rules={{ min: 0 }}
                    errorComponent={errors.price && <Error text="Invalid value. Must be at least 0" />}
                />

                <div className="mt-4">
                    <ControlledField
                        name="for_sale"
                        label="For sale"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
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
                            <ControlledDateField control={control} name="sold_at" label="Sold at" />

                            <ControlledTextField
                                type="number"
                                name="sold_for"
                                label="Sold for"
                                labelPlacement="start"
                                control={control}
                                rules={{ min: 0 }}
                                errorComponent={errors.sold_for && <Error text="Invalid value. Must be at least 0" />}
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
                        name="collection_item"
                        label="Collection item"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
                </div>

                <div className="mt-4">
                    <ControlledField
                        name="own_stamp"
                        label="Own stamp"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
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
                        name="hole_in_one"
                        label="Hole in one"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />

                    {watchShowHIOFields && (
                        <div className="mt-4">
                            <ControlledDateField control={control} name="HIO date" label="HIO date" />

                            <ControlledTextField
                                name="HIO description"
                                label="HIO description"
                                labelPlacement="start"
                                control={control}
                            />
                        </div>
                    )}
                </div>

                <Accordion className="mt-4">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Additional settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="mt-4">
                            <ControlledField
                                name="glow"
                                label="Glow"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </div>

                        <div className="mt-4">
                            <ControlledField
                                name="huk"
                                label="Huk Lab stamp"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </div>

                        <div className="mt-4">
                            <ControlledField
                                name="favourite"
                                label="Favourite"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </div>

                        <div className="mt-4">
                            <ControlledField
                                name="in_the_bag"
                                label="In the bag"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
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
                    </AccordionDetails>
                </Accordion>

                <div className="mt-10">
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
