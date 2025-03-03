import { IAmortizationRow, ICreditDetails, IMonthlyPaymentBreakdown, IPrincipalContribution, PrincipalContributionType } from '@/models/index';

export class AmortizationCalculator {
    protected creditDetails: ICreditDetails;
    private monthlyPayment: number = 0;
    private monthlyInterestRate: number = 0;
    private monthlyInsurance?: number;

    constructor(creditDetails: ICreditDetails) {
        this.creditDetails = creditDetails;
        const { principal, interestRate } = creditDetails;
        const normalizedInterestRate = interestRate < 1 ? interestRate : interestRate / 100;
        this.monthlyInterestRate = normalizedInterestRate / 12;

        const monthlyInterestCompoundingRate = this.getMonthlyInterestCompoundingRate();
        this.monthlyPayment = principal * monthlyInterestCompoundingRate;

        if (creditDetails.insurance) {
            this.monthlyInsurance = this.getMonthlyInsurancePayment(principal, creditDetails.insurance);
        }
    }

    public getMonthlyPaymentBreakdown = (outstandingBalance: number): IMonthlyPaymentBreakdown => {
        if (outstandingBalance <= 0) {
            return { principal: 0, interest: 0, insurance: 0, total: 0 };
        }
        const interest = this.monthlyInterestRate * outstandingBalance;
        const principal = outstandingBalance < this.monthlyPayment ? outstandingBalance : this.monthlyPayment - interest;
        const total = interest + principal + (this.monthlyInsurance ?? 0);
        const insurance = this.monthlyInsurance;
        return { principal, interest, insurance, total };
    }

    public getMinimumIncomeRequired() {
        const { total } = this.getMonthlyPaymentBreakdown(this.creditDetails.principal);
        return total * 3;
    }

    public getPeriods = () => this.creditDetails.years * 12;

    public getMonthlyPayment = () => this.monthlyPayment;

    public reduceMonthlyPayment = (principalContribution: number, outstandingBalance: number) => {
        const reductionRate = (principalContribution >= outstandingBalance) ? 1 : principalContribution / outstandingBalance;
        this.monthlyPayment *= (1 - reductionRate);
    }

    public getNextPeriod = (outstandingBalance: number, principalContribution?: IPrincipalContribution, prevPeriod?: IAmortizationRow): IAmortizationRow => {
        const id = (prevPeriod?.id ?? 0) + 1;
        const { interest, principal, insurance, total } = this.getMonthlyPaymentBreakdown(outstandingBalance);
        const monthlyPrincipal = principal + (principalContribution?.amount ?? 0);
        const updatedBalance = Math.max(outstandingBalance - monthlyPrincipal, 0);

        if (principalContribution?.type === PrincipalContributionType.ReduceAmount) {
            this.reduceMonthlyPayment(principalContribution.amount, updatedBalance);
        }

        return {
            id,
            principal,
            interest,
            insurance,
            total,
            principalContribution,
            balance: updatedBalance,
            accPrincipal: (prevPeriod?.accPrincipal ?? 0) + monthlyPrincipal,
            accInterest: (prevPeriod?.accInterest ?? 0) + interest,
            accInsurance: (prevPeriod?.accInsurance ?? 0) + (insurance ?? 0),
            accNonPrincipal: (prevPeriod?.accNonPrincipal ?? 0) + interest + (insurance ?? 0),
            accTotal: (prevPeriod?.accTotal ?? 0) + total,
        };
    }

    public calculateFullAmortization = (outstandingBalance: number, principalContribution?: IPrincipalContribution): IAmortizationRow[] => {
        const rows: IAmortizationRow[] = [this.getNextPeriod(outstandingBalance, principalContribution)];
        for (let i = 1; i < this.getPeriods() && rows[i - 1].balance > 0; i++) {
            const prevPeriod = rows[i - 1];
            rows.push(this.getNextPeriod(prevPeriod.balance, principalContribution, prevPeriod));
        }
        return rows;
    }

    private getMonthlyInterestCompoundingRate = () => {
        const compoundingRate = Math.pow(1 + this.monthlyInterestRate, this.getPeriods());
        return (this.monthlyInterestRate * compoundingRate) / (compoundingRate - 1);
    }

    private getMonthlyInsurancePayment = (principal: number, insurance: number) => {
        return principal * insurance / 12;
    }
}
