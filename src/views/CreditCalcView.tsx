'use client';
import AppContextProvider from '@/components/AppContextProvider';
import AppHeader from '@/components/AppHeader';
import CreditSummary from '@/components/CreditSummary';
import Amortization from '@/components/Amortization';
import { Box, Grid2 as Grid } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { useMemo } from 'react';
import GridContainer from '@/components/dataDisplay/GridContainer';
import CreditDetails from '@/components/Forms/CreditDetails';
import PaymentDetails from '@/components/Forms/PaymentDetails';

function CreditViewContent() {
    const { isMobile } = useAppContext();
    const width = useMemo(() => (isMobile ? 12 : 6), [isMobile]);
    return (
        <>
            <AppHeader />
            <GridContainer sx={{padding: 2}}>
                <Grid size={width}>
                    <CreditDetails />
                </Grid>
                <Grid size={width}>
                    <PaymentDetails />
                </Grid>
                <Grid size={12}>
                    <CreditSummary />
                </Grid>
                <Grid size={12}>
                <Amortization />
                </Grid>
            </GridContainer>
        </>
    );
}

export default function CreditCalcView() {
    return (
        <Box bgcolor={'background.default'} >
            <AppContextProvider>
                <CreditViewContent />
            </AppContextProvider>
        </Box >
    );
}
