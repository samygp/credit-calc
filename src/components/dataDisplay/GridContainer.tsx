import { Grid2 as Grid, Grid2Props } from '@mui/material';

export default function GridContainer({children, ...props}: Grid2Props) {
    return (
        <Grid container spacing={2} size={12} {...props}>
            {children}
        </Grid>
    );
}
