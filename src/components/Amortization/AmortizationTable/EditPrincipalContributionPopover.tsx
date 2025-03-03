import PrincipalContributionInput from '@/components/inputs/PrincipalContribution';
import { IAmortizationRow, IPrincipalContribution, PrincipalContributionType } from '@/shared/models';
import { Button, ButtonGroup, Card, Popover, PopoverProps } from '@mui/material';
import { useCallback, useState } from 'react';

interface IEditPrincipalContributionPopoverProps extends Omit<PopoverProps, 'onSubmit' | 'children'> {
    editRow: IAmortizationRow;
    onSubmit: (id: number, contribution: IPrincipalContribution) => void;
    handleClose: () => void;
}

export function EditPrincipalContributionPopover({ editRow, onSubmit, handleClose, ...props }: IEditPrincipalContributionPopoverProps) {
    const [principalContributionAmount, setPrincipalContributionAmount] = useState<number>(editRow.principalContribution?.amount ?? 0);
    const [principalContributionType, setPrincipalContributionType] = useState<PrincipalContributionType>(
        editRow.principalContribution?.type ?? PrincipalContributionType.ReduceLength,
    );
    const onSave = useCallback(() => {
        const contribution: IPrincipalContribution = { amount: principalContributionAmount, type: principalContributionType, manual: true };
        onSubmit(editRow.id, contribution);
    }, [editRow, onSubmit, principalContributionAmount, principalContributionType]);

    return (
        <Popover onClose={handleClose} disableScrollLock keepMounted  {...props}>
            <Card raised sx={{ padding: 2, width: 'max-content' }}>
                <PrincipalContributionInput {...{ principalContributionAmount, setPrincipalContributionAmount, principalContributionType, setPrincipalContributionType }} />
                <ButtonGroup fullWidth orientation='horizontal' variant='contained' sx={
                    { boxShadow: 8, marginTop: 2 }
                }>
                    <Button color='primary' onClick={onSave}> Save </Button>
                    <Button color='inherit' variant='text' onClick={handleClose}> Cancel </Button>
                </ButtonGroup>
            </Card>
        </Popover>
    );
}
