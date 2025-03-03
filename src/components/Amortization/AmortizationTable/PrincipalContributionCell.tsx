import useLocale from '@/hooks/useLocale';
import { PrincipalContributionTypeLocale } from '@/shared/locale/creditInfoLabels';
import { IAmortizationRow, PrincipalContributionType } from '@/shared/models';
import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface IPrincipalContributionCellProps {
  row: IAmortizationRow;
  onEditContributionClick: (target: HTMLButtonElement, row: IAmortizationRow) => void;
}

export default function PrincipalContributionCell({ row, onEditContributionClick }: IPrincipalContributionCellProps) {
  const contributionTypeLabels = useLocale(PrincipalContributionTypeLocale) as Record<PrincipalContributionType, string>;
  return (
    <>
      <IconButton edge='end' size='small' color='primary' onClick={(e) => onEditContributionClick(e.currentTarget, row)}>
        <Edit />
      </IconButton>
      {!!row.principalContribution?.amount
        ? `$${row.principalContribution.amount.toFixed(2)} - ${contributionTypeLabels[row.principalContribution.type]}`
        : '$0.00'
      }
    </>
  );
}
