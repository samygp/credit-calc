import { FormControl, FormControlProps, FormHelperText, FormLabel, Grid2 as Grid } from '@mui/material';
import { PropsWithChildren } from 'react';
export interface ILabeledControlProps extends FormControlProps {
    label?: string;
    helperText?: string;
}
export interface IGridLabeledControlProps extends ILabeledControlProps {
    xs?: number;
}

export function LabeledControl({ label, required, helperText, children, sx, ...props }: PropsWithChildren<ILabeledControlProps>) {
    return (
        <FormControl required={required} sx={{ ...sx, display: 'flex', flexDirection: 'column'}} {...props}>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            {children}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}

export function GridLabeledControl({ xs, ...props }: PropsWithChildren<IGridLabeledControlProps>) {
    return (
        <Grid size={xs} >
            <LabeledControl {...props} />
        </Grid>
    );
}
