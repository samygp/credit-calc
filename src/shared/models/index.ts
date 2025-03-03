export enum CreditType {
    Mortgage,
    Car,
    Personal,
}

export enum PrincipalContributionType {
    ReduceLength,
    ReduceAmount,
}

export const DefaultInsuranceRate: Record<CreditType, number> = {
    [CreditType.Mortgage]: 0.008,
    [CreditType.Car]: 0.06,
    [CreditType.Personal]: 0,
}

export const DefaultCreditPeriod: Record<CreditType, number> = {
    [CreditType.Mortgage]: 20,
    [CreditType.Car]: 4,
    [CreditType.Personal]: 2,
}

export type SupportedLocale = 'en' | 'es';
export type TranslationMap<T extends string | number> = Record<T, string>;
export type LocaleTranslation<T extends string | number> = Record<SupportedLocale, TranslationMap<T>>;

export interface ICreditDetails {
    creditType: CreditType;
    principal: number;
    interestRate: number;
    years: number;
    insurance: number;
    incomeRequired: number;
}

export interface IPrincipalContribution {
    amount: number;
    type: PrincipalContributionType;
    manual?: boolean;
}

export interface IPaymentDetails {
    principalContribution?: IPrincipalContribution;
    income: number;
    expenses: number;
}

export interface IMonthlyPaymentBreakdown {
    principal: number;
    interest: number;
    insurance?: number;
    total: number;
}

export interface IAmortizationRow extends IMonthlyPaymentBreakdown {
    id: number;
    balance: number;

    principalContribution?: IPrincipalContribution;

    accPrincipal: number;
    accInterest: number;
    accInsurance?: number;
    accNonPrincipal: number;
    accSavings?: number;
    accTotal: number;
}

export interface ICreditSummary {
    interest: number;
    insurance: number;
    total: number;
}

export interface IAmortizationSummary {
    vanillaSummary: ICreditSummary;
    amortizationSummary: ICreditSummary;
    totalPrincipalContributions: number;
    actualAmortizedPeriods: number;
}

export interface ISummaryRow {
    id: string;
    label: string;
    vanillaSummary: number;
    amortizationSummary: number;
    savings: number;
};

export interface IDropdownOption<T> {
    value: T;
    label: string;
};