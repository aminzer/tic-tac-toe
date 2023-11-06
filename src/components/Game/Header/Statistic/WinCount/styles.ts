import styled from '@emotion/styled';
import { Mark } from '../../../../../constants';
import { getMarkColor, ignoreProps } from '../../../../../library';

export const Container = styled('div', {
  shouldForwardProp: ignoreProps('mark'),
})<{ mark?: Mark }>(({ mark, theme }) => ({
  margin: '0 0.5rem',
  padding: '0.25rem 1rem',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: theme.shape.borderRadius.default,
  color: getMarkColor({ mark, theme }),
  borderColor: getMarkColor({ mark, theme }),
}));
