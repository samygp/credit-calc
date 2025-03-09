'use client';
import useAmortization from '@/hooks/useAmortization';
import useCreditDetails from '@/hooks/useCreditDetails';
import usePaymentDetails from '@/hooks/usePaymentDetails';
import { ICreditDetails, IPaymentDetails, SupportedLocale } from '@/shared/models';
import AppContext from '@/shared/models/appContext';
import { useMediaQuery, useTheme } from '@mui/material';
import { PropsWithChildren, useMemo, useState } from 'react';

export default function AppContextProvider({ children }: PropsWithChildren) {
    const [locale, setLocale] = useState<SupportedLocale>('en');
    const creditDetailsHook = useCreditDetails();
    const paymentDetailsHook = usePaymentDetails();

    const creditDetails = useMemo<ICreditDetails>(() => ({ ...creditDetailsHook }), [creditDetailsHook]);
    const paymentDetails = useMemo<IPaymentDetails>(() => ({ ...paymentDetailsHook }), [paymentDetailsHook]);

    const amortizationHook = useAmortization(creditDetails, paymentDetails);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppContext.Provider value={{ locale, setLocale, creditDetails, paymentDetails, creditDetailsHook, paymentDetailsHook, amortizationHook, isMobile }}>
            {children}
        </AppContext.Provider>
    );
}
