import { IAmortizationHook } from '@/hooks/useAmortization';
import { ICreditDetailsHook } from '@/hooks/useCreditDetails';
import { IPaymentDetailsHook } from '@/hooks/usePaymentDetails';
import { ICreditDetails, IPaymentDetails, SupportedLocale } from '@/shared/models';
import { createContext } from 'react';

export interface IAppContext {
    locale: SupportedLocale;
    setLocale: React.Dispatch<React.SetStateAction<SupportedLocale>>;
    creditDetails: ICreditDetails;
    paymentDetails: IPaymentDetails;
    creditDetailsHook: ICreditDetailsHook;
    paymentDetailsHook: IPaymentDetailsHook;
    amortizationHook: IAmortizationHook;
    isMobile: boolean;
}

export default createContext<IAppContext>({} as IAppContext);
