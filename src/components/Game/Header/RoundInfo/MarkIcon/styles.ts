import styled from '@emotion/styled';
import { Mark } from '../../../../../constants';
import { getMarkColor, ignoreProps } from '../../../../../library';

export const Container = styled('div', {
  shouldForwardProp: ignoreProps('mark'),
})<{ mark?: Mark }>(({ mark, theme }) => ({
  height: '1rem',
  width: '1rem',
  marginLeft: '0.5rem',
  borderRadius: theme.shape.borderRadius.default,
  backgroundColor: getMarkColor({ mark, theme }),
}));
