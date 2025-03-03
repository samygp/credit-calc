'use client';
import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { AmortizationRowGroupLocale, AmortizationRowLocale, AmortizationSectionLocale } from '@/shared/locale/amortizationLabels';
import { IAmortizationRow, IPrincipalContribution } from '@/shared/models';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridColumnGroup, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { EditPrincipalContributionPopover } from './EditPrincipalContributionPopover';
import PrincipalContributionCell from './PrincipalContributionCell';
import { moneyColumnDefinition } from '@/shared/utils';
import AccordionSection from '@/components/dataDisplay/AccordionSection';

const monthlyColumns = ['principal', 'interest', 'insurance', 'total'].map((m) => moneyColumnDefinition<IAmortizationRow>(m as keyof IAmortizationRow));
const accColumns = ['accPrincipal', 'accInterest', 'accInsurance', 'accTotal', 'accSavings'].map((m) => moneyColumnDefinition<IAmortizationRow>(m as keyof IAmortizationRow));

function useAmortizationColumns(onEditContributionClick: (target: HTMLButtonElement, row: IAmortizationRow) => void) {
  const headerNames = useLocale(AmortizationRowLocale);

  const withLocalizedHeaderName = useCallback((col: GridColDef<IAmortizationRow>): GridColDef<IAmortizationRow> => {
    col.headerName = headerNames[col.field as keyof IAmortizationRow];
    return col;
  }, [headerNames]);

  const renderPrincipalContributionCell = useCallback(({ row }: GridRenderCellParams<IAmortizationRow>) => {
    return <PrincipalContributionCell {...{ row, onEditContributionClick }} />;
  }, [onEditContributionClick]);

  const columns = useMemo<Array<GridColDef<IAmortizationRow>>>(() => [
    { field: 'id', width: 100 },
    ...monthlyColumns,
    moneyColumnDefinition('balance'),
    { field: 'principalContribution', renderCell: renderPrincipalContributionCell, flex: 1 },
    ...accColumns,
  ].map((col) => withLocalizedHeaderName(col as GridColDef<IAmortizationRow>)),
    [withLocalizedHeaderName, renderPrincipalContributionCell]);

  return columns;
}

export default function AmortizationTable() {
  const {title, description, subtitle} = useLocale(AmortizationSectionLocale);
  const { amortizationHook, creditDetails, paymentDetails } = useAppContext();
  const { amortizationRows, recalculateAmortization } = amortizationHook;

  const [contributionModalOpen, setContributionModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editRow, setEditRow] = useState<IAmortizationRow>({ id: 1 } as IAmortizationRow);

  const columnGroupLocale = useLocale(AmortizationRowGroupLocale);

  const toColumnGroup = useCallback((groupId: string, colDefs: Array<GridColDef<IAmortizationRow>>): GridColumnGroup => {
    return {
      groupId,
      children: colDefs.map((c) => ({ field: c.field })),
      headerAlign: 'center',
      renderHeaderGroup: () => <Typography variant='h6'>{columnGroupLocale[groupId]}</Typography>,
    };
  }, [columnGroupLocale]);

  const onEditContributionClick = useCallback((target: HTMLButtonElement, row: IAmortizationRow) => {
    setEditRow(row);
    setContributionModalOpen(true);
    setAnchorEl(target);
  }, [setContributionModalOpen, setEditRow]);

  const columns = useAmortizationColumns(onEditContributionClick);

  const onEditContributionSubmit = useCallback((id: number, contribution: IPrincipalContribution) => {
    const updateRowPrincipal = { id, contribution, forceUpdateAll: false };
    recalculateAmortization({ creditDetails, paymentDetails, updateRowPrincipal });
    setContributionModalOpen(false);
  }, [recalculateAmortization, creditDetails, paymentDetails]);

  const onPopoverClose = useCallback(() => {
    setContributionModalOpen(false);
    setAnchorEl(null);
  }, []);

  return (
    <AccordionSection title={title} description={description} summary={subtitle}>
      <EditPrincipalContributionPopover open={contributionModalOpen} handleClose={onPopoverClose} editRow={editRow} anchorEl={anchorEl} onSubmit={onEditContributionSubmit} />
      <DataGrid
        rows={amortizationRows}
        columns={columns}
        columnGroupingModel={[
          toColumnGroup('monthly', monthlyColumns),
          toColumnGroup('accumulated', accColumns),
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        pageSizeOptions={[3, 5, 6, 12, 24, 120]}
      />
    </AccordionSection>
  );
}
