import { ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Avatar, Divider, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import GridContainer from './GridContainer';

interface IAccordionSectionProps extends AccordionProps {
    description?: ReactNode;
    icon?: ReactNode;
    summary?: ReactNode;
    noExpand?: boolean;
}

export default function AccordionSection({ title, children, description, icon, summary, noExpand, ...props }: IAccordionSectionProps) {
    return (
        <Accordion defaultExpanded disableGutters {...props}>
            <AccordionSummary expandIcon={noExpand 
                ? undefined 
                : <ExpandMoreOutlined sx={{ ml: 'auto', borderRadius: '50%', border: '1px solid', borderColor: 'divider', marginX: 2.5, scale: 1.4 }}/>}
                >
                {icon && <Avatar sx={{ mr: 2, marginTop: 1 }}>
                    {icon}
                </Avatar>}
                <Stack divider={<Divider orientation='horizontal' />} spacing={1} width={'100%'} alignItems={'stretch'} justifyContent={'center'}>
                    <Stack direction={'row'} gap={2} divider={<Divider orientation='vertical' />} useFlexGap alignItems={'center'}>
                        <Typography variant='h6'>{title}</Typography>
                        <Typography variant='subtitle2'>{description}</Typography>
                    </Stack>
                    {summary && <Typography variant='overline'>{summary}</Typography>}
                </Stack>
            </AccordionSummary>

            <AccordionDetails >
                <Divider sx={{ mt: -2, mb: 2 }} />
                <GridContainer>
                {children}
                </GridContainer>
            </AccordionDetails>
        </Accordion>
    );
}
