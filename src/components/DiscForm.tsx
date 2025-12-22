import React, { ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Reorder } from 'framer-motion';
import styled from '@emotion/styled';
import {
    Controller,
    Control,
    useFieldArray,
    useForm,
    RegisterOptions,
    Path,
    FieldArrayPath,
} from 'react-hook-form';

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
    saveHandler: (
        data: Partial<DiscFormValues> | Record<string, unknown>,
    ) => void;
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

const Container = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 10rem;
`;

const StyledForm = styled.form`
    width: 100%;
`;

const FieldWrapper = styled.div`
    display: block;
    margin-top: 1rem;
`;

const StyledTextField = styled(TextField)`
    width: max-content;
`;

const StyledAlert = styled(Alert)`
    width: fit-content;
    margin-top: 0.375rem;
`;

const SpacedDiv = styled.div`
    margin-top: 1rem;
`;

const GridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1rem;
`;

const ImageSection = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const ImageSectionTitle = styled.h2`
    margin-bottom: 1rem;
`;

const StyledBox = styled(Box)`
    margin-top: 1rem;
`;

const UploadButtonWrapper = styled.div`
    margin: auto;
    width: fit-content;
    display: block;
`;

const SubmitButtonWrapper = styled.div`
    margin-top: 2.5rem;
`;

const StyledAccordion = styled(Accordion)`
    margin-top: 1rem;
`;

const AccordionContent = styled.div`
    margin-top: 1rem;
`;

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
                    control={
                        <RenderComponent
                            {...field}
                            {...rest}
                            checked={field.value as boolean}
                        />
                    }
                    label={label}
                    labelPlacement={labelPlacement || 'end'}
                />
            )}
        />
    );
}

function ControlledDateField({
    control,
    name,
    label,
}: ControlledDateFieldProps): React.JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={null}
            render={({
                field: { ref, onBlur, value, ...field },
                fieldState,
            }) => (
                <DesktopDatePicker
                    {...field}
                    value={(value as Date) || null}
                    inputRef={ref}
                    format="dd.MM.yyyy"
                    label={label}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            style: { width: '15em' },
                            onBlur,
                            name,
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                        },
                    }}
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
        <FieldWrapper>
            <Controller
                rules={rules}
                name={name}
                control={control}
                render={({ field }) => (
                    <StyledTextField
                        fullWidth
                        label={label}
                        {...field}
                        {...rest}
                    />
                )}
            />
            {errorComponent}
        </FieldWrapper>
    );
}

function Error({ text }: ErrorProps): React.JSX.Element {
    return <StyledAlert severity="error">{text}</StyledAlert>;
}

export function DiscForm({
    disc,
    saveHandler,
    onSuccess,
}: DiscFormProps): React.JSX.Element {
    const { manufacturers, materials, fetchData } = useReferenceData();
    const { saved, markSavedAsAcknowledged } = useDiscForm();
    const { uploadedImages } = useImageUpload();

    const [isImageUploadVisible, setIsImageUploadVisible] =
        useState<boolean>(false);
    const [isDiscSavedDialogVisible, setIsDiscSavedDialogVisible] =
        useState<boolean>(false);

    useEffect(() => {
        setIsDiscSavedDialogVisible(saved);
    }, [saved]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const defaultValues: Partial<DiscFormValues> = (
        disc?.name
            ? disc
            : {
                  name: '',
                  type: '',
                  manufacturer: '',
                  image: [],
              }
    ) as Partial<DiscFormValues>;

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
            clonedData[key] =
                clonedData[key] === '' ? undefined : clonedData[key];
        });

        const formatDate = (date: Date | string): string =>
            format(new Date(date), 'dd.MM.yyyy');

        clonedData.image = clonedData.image.map(
            (image: DiscImage) => image.id,
        ) as unknown as DiscImage[];

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
        <Container>
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
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <ControlledTextField
                    name="name"
                    label="Name"
                    labelPlacement="start"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    errorComponent={
                        errors.name && <Error text={errors.name?.message} />
                    }
                />

                <SpacedDiv>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: 'Type is required' }}
                        render={({
                            field: { onChange, onBlur, name, value },
                        }) => (
                            <FormControl fullWidth>
                                <InputLabel>Disc type</InputLabel>
                                <Select
                                    name={name}
                                    label="Disc type"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                >
                                    <MenuItem value="">Select...</MenuItem>
                                    <MenuItem value="Putter">Putters</MenuItem>
                                    <MenuItem value="Mid-range">
                                        Midranges
                                    </MenuItem>
                                    <MenuItem value="Fairway driver">
                                        Fairway drivers
                                    </MenuItem>
                                    <MenuItem value="Distance driver">
                                        Distance drivers
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    {errors.type && <Error text={errors.type?.message} />}
                </SpacedDiv>

                <SpacedDiv>
                    <Controller
                        name="manufacturer"
                        control={control}
                        rules={{ required: 'Manufacturer is required' }}
                        render={({
                            field: { onChange, onBlur, name, value },
                        }) => (
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
                                        <MenuItem
                                            key={`manufacturer-${manufacturer}`}
                                            value={manufacturer}
                                        >
                                            {manufacturer}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                    {errors.manufacturer && (
                        <Error text={errors.manufacturer?.message} />
                    )}
                </SpacedDiv>

                <ImageSection>
                    <ImageSectionTitle>Image</ImageSectionTitle>
                    <Reorder.Group
                        axis="y"
                        onReorder={(values) => {
                            const foundItem = values.find((item) => {
                                const valueIndex = values.findIndex(
                                    (valueItem) => valueItem.id === item.id,
                                );
                                const fieldIndex = fields.findIndex(
                                    (fieldItem) => fieldItem.id === item.id,
                                );

                                return valueIndex !== fieldIndex;
                            });

                            if (foundItem) {
                                const valIndex = values.findIndex(
                                    (item) => item.id === foundItem.id,
                                );
                                const fieldIndex = fields.findIndex(
                                    (item) => item.id === foundItem.id,
                                );

                                move(fieldIndex, valIndex);
                            }
                        }}
                        values={fields}
                    >
                        {fields.map((field, index) => (
                            <Reorder.Item
                                key={field.id}
                                value={field}
                                id={field.id}
                            >
                                <input
                                    key={field.id}
                                    {...register(`image.${index}.id`)}
                                    type="hidden"
                                />

                                <DraggableImage
                                    url={`url(https://testdb-8e20.restdb.io/media/${getValues(
                                        `image.${index}.id`,
                                    )}`}
                                    onRemove={() => {
                                        remove(index);
                                    }}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                    <StyledBox sx={{ p: 4, border: '1px dashed grey' }}>
                        <UploadButtonWrapper>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() =>
                                    setIsImageUploadVisible(
                                        !isImageUploadVisible,
                                    )
                                }
                            >
                                Upload
                            </Button>
                        </UploadButtonWrapper>
                    </StyledBox>

                    <div>
                        <ImageUpload
                            open={isImageUploadVisible}
                            handleClose={() => setIsImageUploadVisible(false)}
                        />
                    </div>
                </ImageSection>

                <ControlledTextField
                    name="color"
                    label="Colour"
                    labelPlacement="start"
                    control={control}
                />

                <SpacedDiv>
                    <Controller
                        name="material"
                        control={control}
                        render={({
                            field: { onChange, onBlur, name, value },
                        }) => (
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
                                        <MenuItem
                                            key={`material-${material}`}
                                            value={material}
                                        >
                                            {material}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </SpacedDiv>

                <GridLayout>
                    <ControlledTextField
                        type="number"
                        name="speed"
                        label="Speed"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 1, max: 16 }}
                        errorComponent={
                            errors.speed && (
                                <Error text="Invalid value. Must be between 1 and 16" />
                            )
                        }
                    />
                    <ControlledTextField
                        type="number"
                        name="glide"
                        label="Glide"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 1, max: 7 }}
                        errorComponent={
                            errors.glide && (
                                <Error text="Invalid value. Must be between 1 and 7" />
                            )
                        }
                    />
                    <ControlledTextField
                        type="number"
                        name="stability"
                        label="Stability"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: -5, max: 1 }}
                        errorComponent={
                            errors.stability && (
                                <Error text="Invalid value. Must be between -5 and 1" />
                            )
                        }
                    />
                    <ControlledTextField
                        type="number"
                        name="fade"
                        label="Fade"
                        labelPlacement="start"
                        control={control}
                        rules={{ min: 0, max: 5 }}
                        errorComponent={
                            errors.fade && (
                                <Error text="Invalid value. Must be between 0 and 5" />
                            )
                        }
                    />
                </GridLayout>
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
                    errorComponent={
                        errors.weight && (
                            <Error text="Invalid value. Must be at least 0" />
                        )
                    }
                />

                <ControlledTextField
                    type="number"
                    name="price"
                    label="Price"
                    labelPlacement="start"
                    control={control}
                    rules={{ min: 0 }}
                    errorComponent={
                        errors.price && (
                            <Error text="Invalid value. Must be at least 0" />
                        )
                    }
                />

                <SpacedDiv>
                    <ControlledField
                        name="for_sale"
                        label="For sale"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
                </SpacedDiv>

                <SpacedDiv>
                    <ControlledField
                        name="sold"
                        label="Sold"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />

                    {watchShowSoldFields && (
                        <SpacedDiv>
                            <ControlledDateField
                                control={control}
                                name="sold_at"
                                label="Sold at"
                            />

                            <ControlledTextField
                                type="number"
                                name="sold_for"
                                label="Sold for"
                                labelPlacement="start"
                                control={control}
                                rules={{ min: 0 }}
                                errorComponent={
                                    errors.sold_for && (
                                        <Error text="Invalid value. Must be at least 0" />
                                    )
                                }
                            />
                            <ControlledTextField
                                name="sold_to"
                                label="Sold to"
                                labelPlacement="start"
                                control={control}
                            />
                        </SpacedDiv>
                    )}
                </SpacedDiv>

                <SpacedDiv>
                    <ControlledField
                        name="collection_item"
                        label="Collection item"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
                </SpacedDiv>

                <SpacedDiv>
                    <ControlledField
                        name="own_stamp"
                        label="Own stamp"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />
                </SpacedDiv>

                <SpacedDiv>
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
                </SpacedDiv>

                <SpacedDiv>
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
                </SpacedDiv>

                <SpacedDiv>
                    <ControlledField
                        name="hole_in_one"
                        label="Hole in one"
                        labelPlacement="end"
                        control={control}
                        RenderComponent={Checkbox}
                    />

                    {watchShowHIOFields && (
                        <SpacedDiv>
                            <ControlledDateField
                                control={control}
                                name="HIO date"
                                label="HIO date"
                            />

                            <ControlledTextField
                                name="HIO description"
                                label="HIO description"
                                labelPlacement="start"
                                control={control}
                            />
                        </SpacedDiv>
                    )}
                </SpacedDiv>

                <StyledAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Additional settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionContent>
                            <ControlledField
                                name="glow"
                                label="Glow"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </AccordionContent>

                        <AccordionContent>
                            <ControlledField
                                name="huk"
                                label="Huk Lab stamp"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </AccordionContent>

                        <AccordionContent>
                            <ControlledField
                                name="favourite"
                                label="Favourite"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </AccordionContent>

                        <AccordionContent>
                            <ControlledField
                                name="in_the_bag"
                                label="In the bag"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </AccordionContent>

                        <AccordionContent>
                            <ControlledField
                                name="broken"
                                label="Broken"
                                labelPlacement="end"
                                control={control}
                                RenderComponent={Checkbox}
                            />
                        </AccordionContent>
                    </AccordionDetails>
                </StyledAccordion>

                <SubmitButtonWrapper>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </SubmitButtonWrapper>
            </StyledForm>
        </Container>
    );
}
