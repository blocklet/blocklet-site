import React from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@arcblock/ux/lib/Button';
import { styled } from '@arcblock/ux/lib/Theme';
import { useInjectContext } from 'virtual:context';
import { findByName } from '../samples';

const translations = {
  en: {
    viewSource: 'View Source',
  },
  zh: {
    viewSource: '查看源码',
  },
};

function SampleInfo({ sampleName, ...rest }) {
  const { useLocaleContext } = useInjectContext();
  const { locale = 'en' } = useLocaleContext();
  const sample = findByName(sampleName);
  const items = [
    { key: 'name', label: { en: 'Template Name', zh: '模板名称' } },
    { key: 'blockletType', label: { en: 'Blocklet Type', zh: 'Blocklet 类型' } },
    {
      key: 'composable',
      label: { en: 'Composable', zh: '是否可组合' },
      renderer(value) {
        const texts = {
          true: { en: 'Yes', zh: '是' },
          false: { en: 'No', zh: '否' },
        };
        return texts[value][locale];
      },
    },
    {
      key: 'framework',
      label: { en: 'Framework', zh: '使用框架' },
      renderer(value) {
        return value || 'N/A';
      },
    },
    { key: 'languages', label: { en: 'Languages', zh: '开发语言' } },
    { key: 'useCase', label: { en: 'Use Case', zh: '使用案例' } },
    { key: 'author', label: { en: 'Author', zh: '作者' } },
  ];

  return (
    <Root {...rest}>
      <div className="sample-info-img">
        <img src={sample.coverImage} alt={sample.displayName} className="max-w-full max-h-full" />
      </div>
      <div className="sample-info-content">
        <ul>
          {items.map((item) => {
            const { key, label, ignoreEmptyValue, renderer } = item;
            const value = renderer ? renderer(sample[key]) : sample[key];
            const localizedLabel = label[locale];
            if (ignoreEmptyValue && !value) {
              return null;
            }
            return (
              <li key={key}>
                <span>{localizedLabel}</span>
                <span>{value}</span>
              </li>
            );
          })}
          <li style={{ display: 'flex', justifyContent: 'end', gap: 8 }}>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              endIcon={<GitHubIcon />}
              component="a"
              href={sample.repo}
              target="_blank"
              style={{ color: 'inherit', textDecoration: 'none', textTransform: 'none' }}>
              {translations[locale].viewSource}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              endIcon={<OpenInNewIcon />}
              component="a"
              href={sample.store}
              target="_blank"
              style={{ color: 'inherit', textDecoration: 'none', textTransform: 'none' }}>
              Blocklet Store
            </Button>
          </li>
        </ul>
      </div>
    </Root>
  );
}

SampleInfo.propTypes = {
  sampleName: PropTypes.string.isRequired,
};

SampleInfo.defaultProps = {};

const Root = styled('div')`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 44px;
  margin: 32px 0;
  font-size: 14px;
  .sample-info-img {
    flex: 1 0 440px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    img {
      display: block;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
      flex-shrink: 1;
    }
  }
  .sample-info-content {
    flex: 1 0 280px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.palette.grey[600]};
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  li {
    border-top: 1px solid ${(props) => props.theme.palette.grey[300]};
  }
  li span:first-of-type {
    font-weight: bold;
  }
`;

export default SampleInfo;
