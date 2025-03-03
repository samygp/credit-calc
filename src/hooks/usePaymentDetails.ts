import { IPaymentDetails, IPrincipalContribution, PrincipalContributionType } from '@/shared/models';
import { useMemo, useState } from 'react';

export interface IPaymentDetailsHook extends IPaymentDetails {
    principalContributionType: PrincipalContributionType;
    setPrincipalContributionType: React.Dispatch<React.SetStateAction<PrincipalContributionType>>;
    principalContributionAmount: number;
    setPrincipalContributionAmount: React.Dispatch<React.SetStateAction<number>>;
    setIncome: React.Dispatch<React.SetStateAction<number>>;
    setExpenses: React.Dispatch<React.SetStateAction<number>>;
}

export default function usePaymentDetails(): IPaymentDetailsHook {
    const [income, setIncome] = useState<number>(1000);
    const [expenses, setExpenses] = useState<number>(0);
    const [principalContributionAmount, setPrincipalContributionAmount] = useState<number>(0);
    const [principalContributionType, setPrincipalContributionType] = useState<PrincipalContributionType>(PrincipalContributionType.ReduceLength);
    const principalContribution = useMemo<IPrincipalContribution>(() => {
        return { amount: principalContributionAmount, type: principalContributionType };
    }, [principalContributionAmount, principalContributionType]);

    return {
        principalContribution,
        principalContributionType,
        setPrincipalContributionType,
        income,
        setIncome,
        expenses,
        setExpenses,
        principalContributionAmount,
        setPrincipalContributionAmount,
    };
}
