'use client';
import useAmortization from '@/hooks/useAmortization';
import useCreditDetails from '@/hooks/useCreditDetails';
import usePaymentDetails from '@/hooks/usePaymentDetails';
import { ICreditDetails, IPaymentDetails, SupportedLocale } from '@/shared/models';
import AppContext from '@/shared/models/appContext';
import { PropsWithChildren, useMemo, useState } from 'react';

export default function AppContextProvider({ children }: PropsWithChildren) {
    const [locale, setLocale] = useState<SupportedLocale>('en');
    const creditDetailsHook = useCreditDetails();
    const paymentDetailsHook = usePaymentDetails();

    const creditDetails = useMemo<ICreditDetails>(() => ({...creditDetailsHook}), [creditDetailsHook]);
    const paymentDetails = useMemo<IPaymentDetails>(() => ({...paymentDetailsHook}), [paymentDetailsHook]);

    const amortizationHook = useAmortization(creditDetails, paymentDetails);

    return (
        <AppContext.Provider value={{ locale, setLocale, creditDetails, paymentDetails, creditDetailsHook, paymentDetailsHook, amortizationHook }}>
            {children}
        </AppContext.Provider>
    );
}
