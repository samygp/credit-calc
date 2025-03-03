import { useAppContext } from '@/hooks/useAppContext';
import { Box, Card } from '@mui/material';
import { useEffect } from 'react';
import AmortizationTable from './AmortizationTable';

export default function Amortization() {
    const { amortizationHook: { recalculateAmortization }, creditDetails, paymentDetails } = useAppContext();
    const { interestRate, insurance, principal, years } = creditDetails;
    const { principalContribution } = paymentDetails;

    useEffect(() => {
        recalculateAmortization({ creditDetails, paymentDetails });
    }, [interestRate, insurance, principal, years, principalContribution]);
    return (
        <Box sx={{ height: '100%' }}>
            <Card>
                <AmortizationTable />
            </Card>
        </Box>
    );
}
