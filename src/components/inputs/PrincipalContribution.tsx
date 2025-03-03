import Dropdown from '@/components/inputs/Dropdown';
import { GridLabeledControl } from '@/components/inputs/LabeledControl';
import NumberInput from '@/components/inputs/NumberInput';
import useLocale from '@/hooks/useLocale';
import { IPaymentDetailsHook } from '@/hooks/usePaymentDetails';
import { PaymentInfoLabelsLocale } from '@/shared/locale/creditInfoLabels';
import { PrincipalContributionTypeLocale } from '@/shared/locale/creditInfoLabels';
import { PrincipalContributionType } from '@/shared/models';
import { toOptions } from '@/shared/utils';
import { Grid2 as Grid } from '@mui/material';
import { useMemo } from 'react';

interface IPrincipalContributionInputProps extends Pick<
    IPaymentDetailsHook,
    'principalContributionType' | 'setPrincipalContributionType' |
    'principalContributionAmount' | 'setPrincipalContributionAmount'
> {
    size?: number;
 }

 const contributionTypeValues = Object.values(PrincipalContributionType).filter((cTtype) => typeof cTtype !== 'string') as PrincipalContributionType[];

export default function PrincipalContributionInput(props: IPrincipalContributionInputProps) {
    const labelsLocale = useLocale<string>(PaymentInfoLabelsLocale);
    const optionLabels = useLocale<PrincipalContributionType>(PrincipalContributionTypeLocale);
    const options = useMemo(() => toOptions<PrincipalContributionType>(contributionTypeValues, optionLabels), [optionLabels]);
    const { principalContributionType, setPrincipalContributionType, principalContributionAmount, setPrincipalContributionAmount } = props;
    return (
        <Grid container spacing={3} size={props.size}>
            <GridLabeledControl size='small' label={labelsLocale.contributionType} xs={5}>
                <Dropdown<PrincipalContributionType>
                    sx={{ marginTop: 1 }}
                    value={principalContributionType}
                    setValue={setPrincipalContributionType}
                    options={options}
                />
            </GridLabeledControl>

            <NumberInput money size='small'
                value={principalContributionAmount}
                setValue={setPrincipalContributionAmount}
                label={labelsLocale.contributionAmount}
                xs={7}
            />
        </Grid>
    );
}
