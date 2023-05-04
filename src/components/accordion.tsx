import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface AccordionProps {
  title: string;
  content: string;
}

const ResponsiveAccordion = ({ title, content }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{
        mb: '10px',
        boxShadow: 'none',
        '&::before': {
          display: 'none'
        },
        '&.Mui-expanded': {
          margin: 'auto',
        },
        '&:not(:last-child)': {
          borderBottom: 'none'
        },
      }}
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, .1)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, .1)',
          '& .Mui-expanded': {
            minHeight: '48px',
          }
        }}
      >
        <Typography sx={{ fontWeight: 'bold', flexWrap: 'nowrap', flexShrink: 0 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'block',
          backgroundColor: 'rgba(255, 255, 255, .1)',
          color: 'white',
        }}
      >
        <Typography align='left' sx={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ResponsiveAccordion;
