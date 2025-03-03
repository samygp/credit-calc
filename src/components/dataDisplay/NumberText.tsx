import { toCurrency } from '@/shared/utils';
import { Typography, TypographyProps } from '@mui/material';
import { useMemo } from 'react';

interface INumberTextProps extends Omit<TypographyProps, 'children'> {
    value: number;
    decimalPlaces?: number;
    money?: boolean;
    percentage?: boolean;
}

export default function NumberText({ value, decimalPlaces = 2, money, percentage, ...props }: INumberTextProps) {
    const text = useMemo(() => {
        if (money) { return toCurrency(value); }
        if (percentage) { return `${value.toFixed(2)}%`; }
        return value.toFixed(decimalPlaces);
    }, [value, decimalPlaces, money, percentage]);
    return <Typography variant='overline' fontSize={16} {...props}>{text}</Typography>;
}
