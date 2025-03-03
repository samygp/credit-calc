import { GridLabeledControl } from '@/components/inputs/LabeledControl';
import NumberInput from '@/components/inputs/NumberInput';
import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { MonetizationOnRounded } from '@mui/icons-material';
import { useCallback, useMemo, useState } from 'react';
import AccordionSection from '@/components/dataDisplay/AccordionSection';
import BooleanRadio from '@/components/inputs/BooleanRadio';
import PrincipalContributionInput from '@/components/inputs/PrincipalContribution';
import { PrincipalContributionType } from '@/shared/models';
import { PaymentInfoLabelsLocale, PrincipalContributionTypeLocale } from '@/shared/locale/creditInfoLabels';
import { toCurrency } from '@/shared/utils';

export default function PaymentDetails() {
    const labelsLocale = useLocale<string>(PaymentInfoLabelsLocale);
    const principalContributionTypeLabels = useLocale<PrincipalContributionType>(PrincipalContributionTypeLocale);

    const { locale, paymentDetailsHook } = useAppContext();
    const { income, setIncome, expenses, setExpenses, principalContributionType, principalContributionAmount, setPrincipalContributionAmount } = paymentDetailsHook;

    const [hasMonthlyContribution, setHasMonthlyContribution] = useState<boolean>(false);

    const onMonthlyContributionToggle = useCallback((value: boolean) => {
        setHasMonthlyContribution(value);
        setPrincipalContributionAmount(prev => value ? prev : 0);
    }, [setHasMonthlyContribution, setPrincipalContributionAmount]);

    const principalContributionSummary = useMemo<string>(() => {
        if (!hasMonthlyContribution || !principalContributionAmount) return '';
        const typeLabel = principalContributionTypeLabels[principalContributionType];
        switch (locale) {
            case 'es':
                return `- Abonos a capital: ${toCurrency(principalContributionAmount)} (${typeLabel})`;
            case 'en':
            default:
                return `- principal contributions: ${toCurrency(principalContributionAmount)} (${typeLabel})`;
        }
    }, [locale, hasMonthlyContribution, principalContributionAmount, principalContributionType, principalContributionTypeLabels]);

    const summary = useMemo<string>(() => {
        const netIncome = income - expenses;
        switch (locale) {
            case 'es':
                return `Ingresos mensuales netos: ${toCurrency(netIncome)} ${principalContributionSummary}`;
            case 'en':
            default:
                return `Net monthly income: ${toCurrency(netIncome)} ${principalContributionSummary}`;
        }
    }, [income, expenses, principalContributionSummary, locale]);

    return (
        <AccordionSection title={labelsLocale.title} description={labelsLocale.description} icon={<MonetizationOnRounded />} summary={summary}>

            <NumberInput money value={income} setValue={setIncome} label={labelsLocale.monthlyIncome} xs={6} />

            <NumberInput money value={expenses} setValue={setExpenses} label={labelsLocale.monthlyExpenses} xs={6} />

            <GridLabeledControl label={labelsLocale.principalContribution} xs={4}>
                <BooleanRadio value={hasMonthlyContribution} onChange={onMonthlyContributionToggle} />
            </GridLabeledControl>

            {hasMonthlyContribution && <PrincipalContributionInput {...paymentDetailsHook} size={8} />}
        </AccordionSection>
    );
}
