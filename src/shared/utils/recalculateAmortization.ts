import { IAmortizationRow, ICreditDetails, IPaymentDetails, IPrincipalContribution } from '@/shared/models';
import { AmortizationCalculator } from './amortizationCalculator';

interface IRowPrincipalUpdateParams {
    id: number;
    contribution: IPrincipalContribution;
}

export interface IRecalculateAmortizationOptions {
    creditDetails: ICreditDetails;
    paymentDetails: IPaymentDetails;
    updateRowPrincipal?: IRowPrincipalUpdateParams;
    forceUpdateAll?: boolean; // ignores previous manually overridden values
    previousAmortizationRows: IAmortizationRow[];
    vanillaAmortizationRows: IAmortizationRow[];
}

interface IRecalculateRowParams {
    currentRow: IAmortizationRow;
    previousRow?: IAmortizationRow;
    outstandingBalance: number;
}

export class AmortizationReCalculator extends AmortizationCalculator {
    private paymentDetails: IPaymentDetails;
    private updateRowPrincipal?: IRowPrincipalUpdateParams;
    private forceUpdateAll: boolean;
    private previousAmortizationRows: IAmortizationRow[] = [];
    private vanillaAmortizationRows: IAmortizationRow[] = [];

    constructor(options: IRecalculateAmortizationOptions) {
        super(options.creditDetails);
        this.paymentDetails = options.paymentDetails;
        this.updateRowPrincipal = options.updateRowPrincipal;
        this.forceUpdateAll = options.forceUpdateAll ?? false;
        this.previousAmortizationRows = options.previousAmortizationRows;
        this.vanillaAmortizationRows = options.vanillaAmortizationRows;
    }

    public recalculateAmortization = () => {
        const updatedRows: IAmortizationRow[] = [
            this.recalculateRow({
                outstandingBalance: this.creditDetails.principal,
                currentRow: this.previousAmortizationRows[0],
            }),
        ];
        let rowID = 1;
        while (updatedRows[rowID - 1].balance > 0) {
            const previousRow = updatedRows[rowID - 1];
            const currentRow = rowID < this.previousAmortizationRows.length
                ? this.previousAmortizationRows[rowID]
                : this.vanillaAmortizationRows[rowID];
            const outstandingBalance = previousRow.balance;
            updatedRows.push(this.recalculateRow({ outstandingBalance, currentRow, previousRow }));
            rowID++;
        }

        return updatedRows;
    }

    private keepContributionIfManual = (principalContribution?: IPrincipalContribution): IPrincipalContribution | undefined => {
        return principalContribution?.manual ? principalContribution : undefined;
    }

    private getRowPrincipalContribution = (row: IAmortizationRow): IPrincipalContribution | undefined => {
        if (this.forceUpdateAll) {
            return this.paymentDetails.principalContribution;
        } else if (this.updateRowPrincipal?.id === row.id) {
            return this.updateRowPrincipal.contribution;
        }
        return this.keepContributionIfManual(row.principalContribution) ?? this.paymentDetails.principalContribution;
    }

    private calculatePeriodSavings = (row: IAmortizationRow): number => {
        const vanillaPeriod = this.vanillaAmortizationRows[row.id - 1];
        return vanillaPeriod.accInterest - row.accInterest;
    }

    private recalculateRow = ({ currentRow, previousRow, outstandingBalance }: IRecalculateRowParams) => {
        const contribution = this.getRowPrincipalContribution(currentRow);
        const newRow = this.getNextPeriod(outstandingBalance, contribution, previousRow);
        newRow.accSavings = this.calculatePeriodSavings(newRow);
        return newRow;
    }
}
