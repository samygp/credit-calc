import { Box } from '@mui/material';
import CreditDetails from './CreditDetails';
import PaymentDetails from './PaymentDetails';

export default function CreditForm() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2}} >
            <Box sx={{width: '50%'}}>
                <CreditDetails />
            </Box>
            <Box sx={{width: '50%'}}>
                <PaymentDetails />
            </Box>
        </Box>
    );
}
