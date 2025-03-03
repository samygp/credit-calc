'use client';
import AppContextProvider from '@/components/AppContextProvider';
import AppHeader from '@/components/AppHeader';
import CreditForm from '@/components/CreditForm';
import CreditSummary from '@/components/CreditSummary';
import Amortization from '@/components/Amortization';
import { Box } from '@mui/material';

export default function CreditCalcView() {
    return (
        <Box bgcolor={'background.default'} >
        <AppContextProvider>
            <AppHeader />
            <Box gap={2} display={'flex'} flexDirection={'column'} padding={2} >
                <CreditForm />
                <CreditSummary />
                <Amortization />
            </Box>
        </AppContextProvider>
        </Box>
    );
}
