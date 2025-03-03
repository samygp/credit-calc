import AccordionSection from '@/components/dataDisplay/AccordionSection';
import NumberText from '@/components/dataDisplay/NumberText';
import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import ComparisonTable from './ComparisonTable';
import { SummarySectionLocale } from '@/shared/locale/summaryLabels';
import { toCurrency } from '@/shared/utils';

export default function PaymentsSummary() {
    const {creditDetails, paymentDetails, locale, amortizationHook: { amortizationSummary: summary } } = useAppContext();
    const {title, description, tip, incomeRequired: minIncome} = useLocale(SummarySectionLocale);
    const { income, expenses } = paymentDetails;
    const { years, incomeRequired } = creditDetails;

    const summaryText = useMemo<string>(() => {
        if (!summary) return '';
        const {vanillaSummary, amortizationSummary, actualAmortizedPeriods} = summary;
        const hasSavings = (vanillaSummary.total - amortizationSummary.total) > 0;
        switch (locale) {
            case 'es':
                return `${toCurrency(vanillaSummary.total)} en ${years} año(s).${
                    hasSavings ? 
                    ` O ${toCurrency(amortizationSummary.total)} en ${(actualAmortizedPeriods/12).toFixed(1)} año(s) después de abonos a capital.`
                    : tip}`;
            case 'en':
            default:
                return `${toCurrency(vanillaSummary.total)} in ${years} year(s). ${
                    hasSavings ? 
                    `Or ${toCurrency(amortizationSummary.total)} in ${(actualAmortizedPeriods/12).toFixed(1)} year(s) after principal contributions.` 
                    : tip}`;
        }
    }, [summary, years, locale, tip]);

    const netIncome = useMemo(() => income - expenses, [income, expenses]);
    return (
        <AccordionSection {...{title, description, summary: summaryText}}>
            <Typography variant='body1' >
                <NumberText value={incomeRequired} money /> {minIncome}
                <NumberText money value={netIncome}  color={netIncome < incomeRequired ? 'error' : 'success'} />
            </Typography>
            <ComparisonTable />
        </AccordionSection>
    );
}
