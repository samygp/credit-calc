import { IDropdownOption } from '@/shared/models';
import { MenuItem, Select, SelectProps } from '@mui/material';

interface IDropdownProps<T extends string | number> extends Omit<SelectProps<T>, 'value'> {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    options: IDropdownOption<T>[];
}
export default function Dropdown<T extends string | number>({ value, setValue, options, ...props }: IDropdownProps<T>) {
    return (
        <Select<T> value={value} MenuProps={{  disableScrollLock: true }} onChange={(e) => setValue(e.target.value as T)} {...props}>
            {options.map(({value: optValue, label}) => <MenuItem key={optValue} value={optValue}>{label}</MenuItem>)}
        </Select>
    );
}
