import { IAmortizationRow, LocaleTranslation } from '@/models';

export const AmortizationSectionLocale: LocaleTranslation<string> = {
    en: {
        title: 'Amortization',
        description: 'Amortization Schedule',
        subtitle: 'Breakdown of monthly payments',
    },
    es: {
        title: 'Amortización',
        description: 'Tabla de amortización',
        subtitle: 'Detalles de los pagos mensuales',
    },
}

export const AmortizationRowLocale: LocaleTranslation<keyof IAmortizationRow> = {
    en: {
        id: 'Period',
        principal: 'Principal',
        interest: 'Interest',
        balance: 'Balance',
        insurance: 'Insurance',
        total: 'Total',
        principalContribution: 'Principal Contribution',
        accPrincipal: 'Acc. Principal',
        accInterest: 'Acc. Interest',
        accInsurance: 'Acc. Insurance',
        accNonPrincipal: 'Acc. Costs (Non-Principal)',
        accTotal: 'Acc. Total',
        accSavings: 'Acc. Savings',
    },
    es: {
        id: 'Periodo',
        principal: 'Capital',
        interest: 'Interés',
        balance: 'Capital Pendiente',
        insurance: 'Seguro',
        total: 'Total',
        principalContribution: 'Abono a Capital',
        accPrincipal: 'Capital Acumulado',
        accInterest: 'Interés Acumulado',
        accInsurance: 'Seguro Acumulado',
        accNonPrincipal: 'Costos Acumulados (Sin Capital)',
        accTotal: 'Total Acumulado',
        accSavings: 'Ahorros Acumulados',
    },
};

export const AmortizationRowGroupLocale: LocaleTranslation<string> = {
    en: {
        monthly: 'Monthly Payments',
        accumulated: 'Accumulated Payments',
    },
    es: {
        monthly: 'Pagos Mensuales',
        accumulated: 'Pagos Acumulados',
    },
};

export const SummaryTableLocale: LocaleTranslation<string> = {
    en: {
        vanillaSummary: 'Total Amount - Calculated',
        amortizationSummary: 'Actual Amount - With Principal Contributions',
        paidOverTime: 'paid over',
        savings: 'Savings',
        interest: 'Total Interest',
        principal: 'Total Principal',
        insurance: 'Total Insurance',
        total: 'Total',
    },
    es: {
        vanillaSummary: 'Monto Total - Calculado',
        amortizationSummary: 'Monto Pagado - Con Abonos A Capital',
        paidOverTime: 'pagado en',
        savings: 'Ahorro',
        interest: 'Interés Total',
        principal: 'Capital Total',
        insurance: 'Seguro Total',
        total: 'Total',
    },
};
