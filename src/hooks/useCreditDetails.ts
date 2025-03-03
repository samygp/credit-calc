import { CreditType, ICreditDetails } from '@/shared/models';
import { AmortizationCalculator } from '@/shared/utils/amortizationCalculator';
import { useMemo, useState } from 'react';

export interface ICreditDetailsHook extends ICreditDetails {
    setInsurance: React.Dispatch<React.SetStateAction<number>>;
    setCreditType: React.Dispatch<React.SetStateAction<CreditType>>;
    setPrincipal: React.Dispatch<React.SetStateAction<number>>;
    setInterestRate: React.Dispatch<React.SetStateAction<number>>;
    setYears: React.Dispatch<React.SetStateAction<number>>;
}

export default function useCreditDetails(): ICreditDetailsHook {
    const [creditType, setCreditType] = useState<CreditType>(CreditType.Mortgage);
    const [principal, setPrincipal] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(10);
    const [years, setYears] = useState<number>(10);
    const [insurance, setInsurance] = useState<number>(0.008);
    const incomeRequired = useMemo(() => {
        return new AmortizationCalculator({ principal, interestRate, years } as ICreditDetails).getMinimumIncomeRequired();
    }, [principal, interestRate, years]);

    return { years, setYears, creditType, setCreditType, principal, setPrincipal, interestRate, setInterestRate, insurance, setInsurance, incomeRequired };
}
