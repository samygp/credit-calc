import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface IBooleanRadioProps {
    value: boolean;
    onChange: (value: boolean) => void;
    trueLabel?: string;
    falseLabel?: string;
}

export default function BooleanRadio({ value, onChange, trueLabel = 'Yes', falseLabel = 'No' }: IBooleanRadioProps) {
    return (
        <RadioGroup row value={value} onChange={(e) => onChange(e.target.value === 'true')}>
            <FormControlLabel value={true} control={<Radio />} label={trueLabel} />
            <FormControlLabel value={false} control={<Radio />} label={falseLabel} />
        </RadioGroup>
    );
}
