'use client';
import { useAppContext } from '@/hooks/useAppContext';
import useLocale from '@/hooks/useLocale';
import { AmortizationRowGroupLocale, AmortizationRowLocale, AmortizationSectionLocale } from '@/shared/locale/amortizationLabels';
import { IAmortizationRow, IPrincipalContribution } from '@/shared/models';
import { alpha, styled, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridColDef, GridColumnGroup, GridRenderCellParams, GridToolbar, GridValidRowModel } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { EditPrincipalContributionPopover } from './EditPrincipalContributionPopover';
import PrincipalContributionCell from './PrincipalContributionCell';
import { moneyColumnDefinition } from '@/shared/utils';
import AccordionSection from '@/components/dataDisplay/AccordionSection';

interface IAmortizationRowModel extends Omit<GridValidRowModel, 'id'>, IAmortizationRow { }

const monthlyColumns = ['principal', 'interest', 'insurance', 'total'].map((m) => moneyColumnDefinition<IAmortizationRow>(m as keyof IAmortizationRow));
const accColumns = ['accPrincipal', 'accInterest', 'accInsurance', 'accTotal', 'accSavings'].map((m) => moneyColumnDefinition<IAmortizationRow>(m as keyof IAmortizationRow));

function useAmortizationColumns(onEditContributionClick: (target: HTMLButtonElement, row: IAmortizationRow) => void): GridColDef<GridValidRowModel>[] {
  const headerNames = useLocale(AmortizationRowLocale);

  const withLocalizedHeaderName = useCallback((col: GridColDef<IAmortizationRow>): GridColDef<IAmortizationRowModel> => {
    col.headerName = headerNames[col.field as keyof IAmortizationRow];
    return col;
  }, [headerNames]);

  const renderPrincipalContributionCell = useCallback(({ row }: GridRenderCellParams<IAmortizationRow>) => {
    return <PrincipalContributionCell {...{ row, onEditContributionClick }} />;
  }, [onEditContributionClick]);

  const columns = useMemo<GridColDef<IAmortizationRowModel>[]>(() => [
    { field: 'id', width: 60 },
    ...monthlyColumns,
    { field: 'principalContribution', renderCell: renderPrincipalContributionCell, flex: 1, minWidth: 120 },
    moneyColumnDefinition('balance'),
    ...accColumns,
  ].map((col) => withLocalizedHeaderName(col as GridColDef<IAmortizationRowModel>)),
    [withLocalizedHeaderName, renderPrincipalContributionCell]);

  return columns as GridColDef<GridValidRowModel>[];
}

const StripedDataGrid = styled(DataGrid)(({ theme: { palette: { primary, action } } }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: primary.contrastText,
    '&:hover': {
      backgroundColor: alpha(primary.main, action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        primary.main,
        action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          primary.main,
          action.selectedOpacity +
          action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            primary.main,
            action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export default function AmortizationTable() {
  const { title, description, subtitle } = useLocale(AmortizationSectionLocale);
  const { amortizationHook, creditDetails, paymentDetails, isMobile } = useAppContext();
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
      <StripedDataGrid
        getRowClassName={({ indexRelativeToCurrentPage: index }) => index % 2 === 0 ? 'even' : 'odd'}
        slots={{
          toolbar: GridToolbar,
        }}
        rows={amortizationRows}
        columns={columns}
        columnGroupingModel={[
          toColumnGroup('monthly', monthlyColumns),
          toColumnGroup('accumulated', accColumns),
        ]}
        disableColumnSorting
        initialState={{
          density: isMobile ? 'compact' : 'standard',
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
