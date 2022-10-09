import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useInjectContext } from 'virtual:context';
import SampleGallery from './SampleGallery';

const translations = {
  en: {
    title: 'Blocklet Samples',
  },
  zh: {
    title: 'Blocklet 示例',
  },
};

const t = (locale, key) => {
  return translations[locale]?.[key] || translations.en[key];
};

function GalleryPage(props) {
  const { useLocaleContext } = useInjectContext();
  const { locale = 'en' } = useLocaleContext();
  return (
    <Container {...props}>
      <Box my={8}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3">{t(locale, 'title')}</Typography>
        </Box>
        <SampleGallery />
      </Box>
    </Container>
  );
}

GalleryPage.propTypes = {};

GalleryPage.defaultProps = {};

export default GalleryPage;
