import styled from '@emotion/styled';
import { Mark } from '../../../../constants';
import { getMarkColor, ignoreProps } from '../../../../library';

export const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const Text = styled('span', {
  shouldForwardProp: ignoreProps('mark'),
})<{ mark?: Mark }>(({ mark, theme }) => ({
  margin: '0.5rem 0',
  color: getMarkColor({ mark, theme }),
}));
