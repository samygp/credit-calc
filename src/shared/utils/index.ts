import { IDropdownOption, TranslationMap, } from "@/models";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export function toCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function toOptions<T extends string | number>(values: T[], locale: TranslationMap<T>): IDropdownOption<T>[] {
    return values.map((v) => ({ value: v, label: locale[v as keyof TranslationMap<T>] }));
}

export function moneyColumnDefinition <T extends GridValidRowModel>(key: keyof T, headerName?: string): GridColDef<T> {
  return {
    field: key as string,
    headerName,
    flex: 1,
    valueFormatter: (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    valueGetter: (v) => v || 0,
  };
};
