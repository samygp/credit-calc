import AppContext from '@/shared/models/appContext';
import { useContext } from 'react';

export function useAppContext() {
    return useContext(AppContext);
}

export function useCreditDetailsContext() {
    const { creditDetails, creditDetailsHook } = useAppContext();
    return { creditDetails, creditDetailsHook };
}

export function usePaymentContext() {
    const { paymentDetails, paymentDetailsHook } = useAppContext();
    return { paymentDetails, paymentDetailsHook };
}
