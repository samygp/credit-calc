import { CreditType, LocaleTranslation, PrincipalContributionType } from '@/shared/models';

export const CreditInfoLabelsLocale: LocaleTranslation<string> = {
    en: {
        title: 'Credit Details',
        description: 'Amount to pay & interest rate',
        creditType: 'Credit Type',
        principal: 'Amount (Principal)',
        interestRate: 'Interest Rate',
        years: 'Years',
        yearsHelp: 'Length of credit period in years',
        hasInsurance: 'Include Insurance?',
        insuranceRate: 'Insurance Rate',
    },
    es: {
        title: 'Detalles Del Crédito',
        description: 'Monto a pagar y tasa de interés',
        creditType: 'Tipo de Credito',
        principal: 'Monto (Capital)',
        interestRate: 'Tasa de Interés',
        years: 'Años',
        yearsHelp: 'Longitud del crédito en años',
        hasInsurance: '¿Incluir Seguro?',
        insuranceRate: 'Tasa de Seguro',
    },
}

export const PaymentInfoLabelsLocale: LocaleTranslation<string> = {
    en: {
        title: 'Payment Details',
        description: 'Income and principal contributions',
        monthlyIncome: 'Monthly Income',
        monthlyExpenses: 'Monthly Expenses',
        principalContribution: 'Monthly Principal Contributions?',
        contributionType: 'Contribution Type',
        contributionAmount: 'Amount Dedicated To Principal',
    },
    es: {
        title: 'Detalles De Pago',
        description: 'Ingresos y abonos a capital',
        monthlyIncome: 'Ingresos Mensuales',
        monthlyExpenses: 'Gastos Mensuales',
        principalContribution: '¿Abonos Mensuales A Capital?',
        contributionType: 'Tipo De Abono',
        contributionAmount: 'Monto Dedicado Para Abonos A Capital',
    }
}

export const CreditTypeLocale: LocaleTranslation<CreditType> = {
    en: {
        [CreditType.Mortgage]: 'Mortgage',
        [CreditType.Car]: 'Car Loan',
        [CreditType.Personal]: 'Personal Loan',
    },
    es: {
        [CreditType.Mortgage]: 'Hipoteca',
        [CreditType.Car]: 'Crédito Automotriz',
        [CreditType.Personal]: 'Préstamo personal',
    },
};

export const PrincipalContributionTypeLocale: LocaleTranslation<PrincipalContributionType> = {
    en: {
        [PrincipalContributionType.ReduceLength]: 'Reduce Length',
        [PrincipalContributionType.ReduceAmount]: 'Reduce Monthly Amount',
    },
    es: {
        [PrincipalContributionType.ReduceLength]: 'Reducir Plazo',
        [PrincipalContributionType.ReduceAmount]: 'Reducir Monto Mensual',
    },
};
