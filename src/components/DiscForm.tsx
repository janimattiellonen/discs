import React, { ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Reorder } from 'framer-motion';
import { Controller, Control, useFieldArray, useForm, RegisterOptions, Path, FieldArrayPath } from 'react-hook-form';

import Box from '@mui/material/Box';
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

import { DraggableImage } from './DraggableImage';
import { ImageUpload } from './ImageUpload';
import { DiscSavedDialog } from './DiscSavedDialog';
import { useReferenceData, useImageUpload, useDiscForm } from '../contexts';

interface DiscImage {
    id: string;
}

interface DiscFormValues {
    name: string;
    type: string;
    manufacturer: string;
    material?: string;
    color?: string;
    speed?: number | string;
    glide?: number | string;
    stability?: number | string;
    fade?: number | string;
    weight?: number | string;
    price?: number | string;
    additional?: string;
    for_sale?: boolean;
    sold?: boolean;
    sold_at?: Date | string | null;
    sold_for?: number | string;
    sold_to?: string;
    collection_item?: boolean;
    own_stamp?: boolean;
    donated?: boolean;
    'Donation description'?: string;
    missing?: boolean;
    missing_description?: string;
    hole_in_one?: boolean;
    'HIO date'?: Date | string | null;
    'HIO description'?: string;
    glow?: boolean;
    huk?: boolean;
    favourite?: boolean;
    in_the_bag?: boolean;
    broken?: boolean;
    image: DiscImage[];
    [key: string]: unknown;
}

interface DiscFormProps {
    disc?: Partial<DiscFormValues> | Record<string, unknown>;
    saveHandler: (data: Partial<DiscFormValues> | Record<string, unknown>) => void;
    onSuccess?: () => void;
}

interface ControlledFieldProps {
    name: Path<DiscFormValues>;
    label: string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    control: Control<DiscFormValues>;
    RenderComponent: typeof Checkbox;
}

interface ControlledDateFieldProps {
    control: Control<DiscFormValues>;
    name: Path<DiscFormValues>;
    label: string;
}

interface ControlledTextFieldProps {
    name: Path<DiscFormValues>;
    label: string;
    labelPlacement?: string;
    control: Control<DiscFormValues>;
    rules?: RegisterOptions<DiscFormValues>;
    errorComponent?: ReactNode;
    type?: string;
}

interface ErrorProps {
    text: string;
}

function ControlledField({
    name,
    label,
    labelPlacement,
    control,
    RenderComponent,
    ...rest
}: ControlledFieldProps): React.JSX.Element {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<RenderComponent {...field} {...rest} checked={field.value as boolean} />}
                    label={label}
                    labelPlacement={labelPlacement || 'end'}
                />
            )}
        />
    );
}

function ControlledDateField({ control, name, label }: ControlledDateFieldProps): React.JSX.Element {
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

function ControlledTextField({
    name,
    label,
    labelPlacement,
    control,
    rules,
    errorComponent,
    ...rest
}: ControlledTextFieldProps): React.JSX.Element {
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

function Error({ text }: ErrorProps): React.JSX.Element {
    return (
        <Alert className="w-fit mt-1.5" severity="error">
            {text}
        </Alert>
    );
}

export function DiscForm({ disc, saveHandler, onSuccess }: DiscFormProps): React.JSX.Element {
    const { manufacturers, materials, fetchData } = useReferenceData();
    const { saved, markSavedAsAcknowledged } = useDiscForm();
    const { uploadedImages } = useImageUpload();

    const [isImageUploadVisible, setIsImageUploadVisible] = useState<boolean>(false);
    const [isDiscSavedDialogVisible, setIsDiscSavedDialogVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsDiscSavedDialogVisible(saved);
    }, [saved]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const defaultValues: Partial<DiscFormValues> = (disc?.name
        ? disc
        : {
              name: '',
              type: '',
              manufacturer: '',
              image: [],
          }) as Partial<DiscFormValues>;

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        getValues,
        register,
    } = useForm<DiscFormValues>({
        defaultValues,
    });

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'image' as FieldArrayPath<DiscFormValues>,
    });

    useEffect(() => {
        const images = getValues('image');

        uploadedImages.forEach((img: string) => {
            const found = images.find((item) => item.id === img);

            if (!found) {
                append({ id: img });
            }
        });
    }, [append, getValues, uploadedImages]);

    const onSubmit = (data: DiscFormValues): void => {
        const clonedData = { ...data };

        const keys = Object.keys(clonedData);

        keys.forEach((key) => {
            clonedData[key] = clonedData[key] === '' ? undefined : clonedData[key];
        });

        const formatDate = (date: Date | string): string => format(new Date(date), 'dd.MM.yyyy');

        clonedData.image = clonedData.image.map((image: DiscImage) => image.id) as unknown as DiscImage[];

        if (clonedData.glide === '') {
            clonedData.glide = undefined;
        }

        if (clonedData.sold_at) {
            clonedData.sold_at = formatDate(clonedData.sold_at);
        }

        if (clonedData['HIO date']) {
            clonedData['HIO date'] = formatDate(clonedData['HIO date']);
        }

        (async () => {
            saveHandler(clonedData);
        })();
    };

    const watchShowLostFields = watch('missing', false);
    const watchShowSoldFields = watch('sold', false);
    const watchShowHIOFields = watch('hole_in_one', false);
    const watchDonatedFields = watch('donated', false);

    if (!materials?.length || !manufacturers?.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex gap-4 mb-40">
            <DiscSavedDialog
                open={isDiscSavedDialogVisible}
                handleClose={() => {
                    setIsDiscSavedDialogVisible(false);
                    markSavedAsAcknowledged();

                    if (onSuccess) {
                        onSuccess();
                    }
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
                    <Reorder.Group
                        axis="y"
                        onReorder={(values) => {
                            const foundItem = values.find((item) => {
                                const valueIndex = values.findIndex((valueItem) => valueItem.id === item.id);
                                const fieldIndex = fields.findIndex((fieldItem) => fieldItem.id === item.id);

                                return valueIndex !== fieldIndex;
                            });

                            if (foundItem) {
                                const valIndex = values.findIndex((item) => item.id === foundItem.id);
                                const fieldIndex = fields.findIndex((item) => item.id === foundItem.id);

                                move(fieldIndex, valIndex);
                            }
                        }}
                        values={fields}
                    >
                        {fields.map((field, index) => (
                            <Reorder.Item key={field.id} value={field} id={field.id}>
                                <input key={field.id} {...register(`image.${index}.id`)} type="hidden" />

                                <DraggableImage
                                    url={`url(https://testdb-8e20.restdb.io/media/${getValues(`image.${index}.id`)}`}
                                    onRemove={() => {
                                        remove(index);
                                    }}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

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
                </div>

                <ControlledTextField name="color" label="Colour" labelPlacement="start" control={control} />

                <div className="mt-4">
                    <Controller
                        name="material"
                        control={control}
                        render={({ field: { onChange, onBlur, name, value } }) => (
                            <FormControl fullWidth>
                                <InputLabel>Material</InputLabel>
                                <Select
                                    name={name}
                                    label="Manuterial"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                >
                                    <MenuItem value="">Select...</MenuItem>
                                    {materials.map((material) => (
                                        <MenuItem key={`material-${material}`} value={material}>
                                            {material}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </div>

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
