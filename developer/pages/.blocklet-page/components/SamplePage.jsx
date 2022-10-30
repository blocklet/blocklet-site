import Page from '@xmark/client/src/layouts/Page';
import { InjectProvider, useInjectContext } from 'virtual:context';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import { styled } from '@arcblock/ux/lib/Theme';
import SampleInfo from './SampleInfo';
import { findByName } from '../samples';

const translations = {
  en: {
    backToGallery: 'Back To Sample Gallery',
  },
  zh: {
    backToGallery: '返回 Sample 列表',
  },
};

function BackToGallery({ locale, ...rest }) {
  return (
    <Box
      component={Link}
      to="/samples"
      display="flex"
      alignItems="center"
      gap={0.5}
      fontSize={14}
      color="grey.600"
      {...rest}>
      <ArrowBackIcon sx={{ fontSize: 14 }} />
      <span>{translations[locale]?.backToGallery || translations.en.backToGallery}</span>
    </Box>
  );
}

export default function SamplePage({ children, ...rest }) {
  const injectContextValue = useInjectContext();
  const { page, useLocaleContext } = injectContextValue;
  const { locale = 'en' } = useLocaleContext() || {};
  const sampleName = page.frontmatter.sample;
  const sample = findByName(sampleName);
  return (
    <Page {...rest}>
      <Root>
        <Container>
          <div className="sample-layout">
            <div className="sample-layout-aside">
              <BackToGallery locale={locale} />
              <SampleInfo sampleName="auth-demo" style={{ marginTop: 32 }} />
            </div>
            <div className="sample-layout-main">
              <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                <BackToGallery locale={locale} />
              </Box>
              <div className="sample-info-img">
                <img src={sample.coverImage} alt={sample.displayName} className="max-w-full max-h-full" />
              </div>
              <div className="sample-info">
                <SampleInfo sampleName="auth-demo" />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </Container>
      </Root>
    </Page>
  );
}

const Root = styled('div')`
  .sample-layout {
    display: flex;
    margin: 28px 0;
  }
  .sample-layout-aside,
  .sample-layout-main {
    flex: 1;
    padding: 32px 0;
  }
  .sample-layout-aside {
    min-width: 300px;
    max-width: 400px;
    padding-right: 40px;
    border-right: 1px solid #eee;
  }
  .sample-layout-main {
    min-width: 500px;
    padding-left: 40px;
    .sample-info {
      display: none;
    }
  }
  .sample-info-img {
    flex: 1 0 auto;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    img {
      display: block;
    }
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    .sample-layout-aside {
      display: none;
    }
    .sample-layout-main {
      min-width: 0;
      padding-left: 0;
      .sample-info {
        display: block;
      }
    }
  }
`;
