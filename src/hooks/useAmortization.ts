import { IAmortizationRow, IAmortizationSummary, ICreditDetails, IPaymentDetails } from '@/shared/models';
import { AmortizationCalculator } from '@/shared/utils/amortizationCalculator';
import { AmortizationReCalculator, IRecalculateAmortizationOptions } from '@/shared/utils/recalculateAmortization';
import { useCallback, useMemo, useState } from 'react';

type IRecalculateAmortizationHookOptions = Omit<IRecalculateAmortizationOptions, 'previousAmortizationRows' | 'vanillaAmortizationRows'>;
export interface IAmortizationHook {
    amortizationRows: IAmortizationRow[];
    recalculateAmortization: (options: IRecalculateAmortizationHookOptions) => void;
    amortizationSummary?: IAmortizationSummary;
}

interface IAmortizationRowTuple {
    amortizationRows: IAmortizationRow[];
    vanillaAmortizationRows: IAmortizationRow[];
}

export default function useAmortization(creditDetails: ICreditDetails, paymentDetails: IPaymentDetails): IAmortizationHook {
    const [{
        amortizationRows,
        vanillaAmortizationRows,
    }, setAmortizationRows] = useState<IAmortizationRowTuple>({
        amortizationRows: new AmortizationCalculator(creditDetails).calculateFullAmortization(creditDetails.principal, paymentDetails.principalContribution),
        vanillaAmortizationRows: new AmortizationCalculator(creditDetails).calculateFullAmortization(creditDetails.principal),
    });

    const recalculateAmortization = useCallback((opts: IRecalculateAmortizationHookOptions) => {
        const { creditDetails } = opts;
        const vanillaAmortizationRows = new AmortizationCalculator(creditDetails).calculateFullAmortization(creditDetails.principal);
        setAmortizationRows((prev) => {
            const previousAmortizationRows = prev.amortizationRows;
            const options = { ...opts, previousAmortizationRows, vanillaAmortizationRows };
            const amortizationRows = new AmortizationReCalculator(options).recalculateAmortization();
            return { amortizationRows, vanillaAmortizationRows };
        });
    }, [setAmortizationRows]);

    const amortizationSummary = useMemo<IAmortizationSummary|undefined>(() => {
        if (!vanillaAmortizationRows.length || !amortizationRows.length) { return undefined; }
        const lastVanillaRow = vanillaAmortizationRows[vanillaAmortizationRows.length - 1];
        const lastAmortizationRow = amortizationRows[amortizationRows.length - 1];

        const totalPrincipalContributions = amortizationRows.reduce((acc, row) => {
            return acc + (row.principalContribution?.amount ?? 0);
        }, 0);

        const vanillaSummary = {
            interest: lastVanillaRow.accInterest,
            insurance: lastVanillaRow.accInsurance ?? 0,
            total: lastVanillaRow.accTotal,
        };
        const amortizationSummary = {
            interest: lastAmortizationRow.accInterest,
            insurance: lastAmortizationRow.accInsurance ?? 0,
            total: lastAmortizationRow.accTotal,
        };
        const actualAmortizedPeriods = amortizationRows.length;
        return { vanillaSummary, amortizationSummary, totalPrincipalContributions, actualAmortizedPeriods };
    }, [vanillaAmortizationRows, amortizationRows]);

    return { amortizationRows, recalculateAmortization, amortizationSummary };
}
