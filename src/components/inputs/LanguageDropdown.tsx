import { useAppContext } from '@/hooks/useAppContext';
import Dropdown from './Dropdown';

export default function LanguageDropdown() {
    const { locale, setLocale } = useAppContext();
    return (
        <Dropdown value={locale} setValue={setLocale} options={[
            { value: 'en', label: 'En' },
            { value: 'es', label: 'Es' },
        ]} />
    );
}
