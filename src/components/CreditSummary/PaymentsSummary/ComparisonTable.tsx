import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { SummaryTableLocale } from '@/shared/locale/summaryLabels';
import { IAmortizationSummary, ICreditSummary, ISummaryRow } from '@/shared/models';
import { moneyColumnDefinition } from '@/shared/utils';
import { Box, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';

const getRowValues = (key: keyof ICreditSummary, {vanillaSummary: v, amortizationSummary: a}: IAmortizationSummary) => {
  return {
    vanillaSummary: v[key],
    amortizationSummary: a[key],
    savings: v[key] - a[key],
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .total-row': {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export default function ComparisonTable() {
  const { amortizationHook: { amortizationSummary: summary }, creditDetails: {principal} } = useAppContext();
  const tableLocale = useLocale<string>(SummaryTableLocale);

  const columns = useMemo<GridColDef[]>(() => {
    return [
      { field: 'label', renderHeader: () => '', flex: 1},
      moneyColumnDefinition<ISummaryRow>('vanillaSummary', tableLocale.vanillaSummary),
      moneyColumnDefinition<ISummaryRow>('amortizationSummary', tableLocale.amortizationSummary),
      moneyColumnDefinition<ISummaryRow>('savings', tableLocale.savings),
    ];
  }, [tableLocale]);

  const rows = useMemo<ISummaryRow[]>(() => !summary ? [] : [
    { id: 'principal', label: tableLocale.principal, vanillaSummary: principal, amortizationSummary: principal, savings: 0 },
    { id: 'insurance', label: tableLocale.insurance, ...getRowValues('insurance', summary) },
    { id: 'interest', label: tableLocale.interest, ...getRowValues('interest', summary) },
    { id: 'total', label: tableLocale.total, ...getRowValues('total', summary),  },
  ], [tableLocale, summary, principal]);

  if (!summary) return <></>;
  return (
    <Box sx={{ width: '100%' }}>
      <StyledDataGrid rows={rows} columns={columns} hideFooter getRowClassName={(row) => row.id === 'total' ? 'total-row' : ''}/>
    </Box>
  );
};