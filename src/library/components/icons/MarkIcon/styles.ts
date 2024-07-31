import styled from '@emotion/styled';
import { Mark } from '@app/constants';
import { getMarkColor, ignoreProps } from '../../../helpers';

export const Container = styled('div', {
  shouldForwardProp: ignoreProps('mark'),
})<{ mark?: Mark }>(({ mark, theme }) => ({
  height: '1rem',
  width: '1rem',
  borderRadius: theme.shape.borderRadius.default,
  backgroundColor: getMarkColor({ mark, theme }),
}));
