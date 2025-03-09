import { LocaleTranslation } from '@/models';

export const SummarySectionLocale: LocaleTranslation<string> = {
    en: {
        title: 'Summary',
        description: 'Amount to pay & calculated interest',
        tip: 'Try playing around with principal contributions to see how much you could save!',
        incomeRequired: 'minimum income required - Your (net) income: ',
    },
    es: {
        title: 'Resumen',
        description: 'Monto a pagar e intereses calculados',
        tip: '¡Intenta jugar con abonos a capital para ver cuánto podrías ahorrar!',
        incomeRequired: 'ingresos mínimo requeridos - Tus ingresos netos: ',
    },
}

export const SummaryTableLocale: LocaleTranslation<string> = {
    en: {
        vanillaSummary: 'Total Amount - Calculated',
        amortizationSummary: 'Actual Amount - W. Principal Contributions',
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
