import BooleanRadio from '@/components/inputs/BooleanRadio';
import Dropdown from '@/components/inputs/Dropdown';
import { GridLabeledControl } from '@/components/inputs/LabeledControl';
import NumberInput from '@/components/inputs/NumberInput';
import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { CreditTypeLocale } from '@/shared/locale/creditInfoLabels';
import { CreditType, DefaultCreditPeriod, DefaultInsuranceRate, IDropdownOption } from '@/shared/models';
import { PercentRounded } from '@mui/icons-material';
import { Box, Slider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import AccordionSection from '../dataDisplay/AccordionSection';
import { CreditInfoLabelsLocale } from '@/shared/locale/creditInfoLabels';
import { toCurrency, toOptions } from '@/shared/utils';

const creditTypeEntries = Object.values(CreditType).filter((cTtype) => typeof cTtype !== 'string');

export default function CreditDetails() {
    const [hasInsurance, setHasInsurance] = useState<boolean>(true);
    const creditInfoLocale = useLocale<string>(CreditInfoLabelsLocale);
    const creditTypeLocale = useLocale<CreditType>(CreditTypeLocale);
    const creditTypeOptions = useMemo<IDropdownOption<CreditType>[]>(() => toOptions<CreditType>(creditTypeEntries, creditTypeLocale), [creditTypeLocale]);

    const { creditDetailsHook, locale } = useAppContext();
    const { years, setYears, creditType, setCreditType, principal, setPrincipal, interestRate, setInterestRate, insurance, setInsurance } = creditDetailsHook;

    useEffect(() => {
        setInsurance(hasInsurance ? DefaultInsuranceRate[creditType] : 0);
    }, [hasInsurance, creditType]);

    useEffect(() => {
        setYears(DefaultCreditPeriod[creditType]);
    }, [creditType]);

    const summary = useMemo(() => {
        const typeLabel = creditTypeLocale[creditType];
        switch (locale) {
            case 'es':
                return `${typeLabel} de ${toCurrency(principal)} a ${years} año(s). Tasa de interés ${interestRate}% - ${hasInsurance ? 'Con' : 'Sin'} seguro.`;
            case 'en':
            default:
                return `${years} year(s) ${typeLabel} of ${toCurrency(principal)}. Interest rate ${interestRate}% - ${hasInsurance ? 'With' : 'Without'} insurance.`;
        }
    }, [creditType, principal, interestRate, years, hasInsurance, creditTypeLocale, locale]);

    
    return (
        <AccordionSection title={creditInfoLocale.title} defaultExpanded description={creditInfoLocale.description} summary={summary} icon={<PercentRounded />}>
            <GridLabeledControl label={creditInfoLocale.creditType} size='small' xs={4}>
                <Dropdown<CreditType> sx={{ marginTop: 1 }} value={creditType} setValue={setCreditType} options={creditTypeOptions} />
            </GridLabeledControl>

            <NumberInput money value={principal} setValue={setPrincipal} label={creditInfoLocale.principal} xs={4} />

            <NumberInput percentage value={interestRate} setValue={setInterestRate} label={creditInfoLocale.interestRate} xs={4} />

            <GridLabeledControl label={creditInfoLocale.hasInsurance} xs={4}>
                <BooleanRadio value={hasInsurance} onChange={setHasInsurance} />
            </GridLabeledControl>

            {hasInsurance && <NumberInput percentage value={insurance} setValue={setInsurance} label={creditInfoLocale.insuranceRate} xs={4} />}

            <GridLabeledControl label={creditInfoLocale.years} helperText={creditInfoLocale.yearsHelp} xs={12}>
                <Box paddingX={1.25}>
                    <Slider marks min={1} max={30} valueLabelDisplay='auto' value={years} onChange={(_e, v) => setYears(Array.isArray(v) ? v[0] : v)} />
                </Box>
            </GridLabeledControl>
        </AccordionSection>
    );
}
