import LanguageDropdown from '@/components/inputs/LanguageDropdown';
import useLocale from '@/hooks/useLocale';
import { AppBar, Stack, Typography } from '@mui/material';
import { HeaderLabelsLocale } from '@/shared/locale/headerLabels';

export default function AppHeader() {
    const locale = useLocale(HeaderLabelsLocale);
    return (
        <AppBar position='static' sx={{ paddingY: 2, paddingX: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Stack textAlign={'center'}>
                <Typography variant='h4' >{locale.title} </Typography>
                <Typography variant='subtitle2'>
                    {locale.subtitle}
                </Typography>
            </Stack>
            <LanguageDropdown />
        </AppBar>
    );
}
