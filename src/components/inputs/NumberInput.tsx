import { GridLabeledControl, IGridLabeledControlProps } from '@/components/inputs/LabeledControl';
import { Input } from '@mui/material';
import React, { useMemo } from 'react';

interface INumberInputProps extends IGridLabeledControlProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    money?: boolean;
    percentage?: boolean;
}

export default function NumberInput({ value, setValue, money, percentage, ...props }: INumberInputProps) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value));
    const startAdornment = useMemo(() => money ? '$' : undefined, [money]);
    const endAdornment = useMemo(() => percentage ? '%' : undefined, [percentage]);
    return (
        <GridLabeledControl {...props}>
            <Input size='small' type='number' placeholder='1.00' {...{value, startAdornment, endAdornment, onChange}} />
        </GridLabeledControl>
    );
}
