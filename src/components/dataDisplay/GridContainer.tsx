import { Grid2 as Grid } from '@mui/material';

export default function GridContainer({ children }: { children?: React.ReactNode }) {
    return (
        <Grid container spacing={2} size={12}>
            {children}
        </Grid>
    );
}
