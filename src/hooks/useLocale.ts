import { useAppContext } from '@/hooks/useAppContext';
import { LocaleTranslation, TranslationMap } from '@/shared/models';
import { useMemo } from 'react';

export default function useLocale<T extends number | string>(localeMap: LocaleTranslation<T>): TranslationMap<T> {
    const { locale } = useAppContext();
    const values = useMemo(() => localeMap[locale] as Record<T, string>, [locale, localeMap]);
    return values;
}
