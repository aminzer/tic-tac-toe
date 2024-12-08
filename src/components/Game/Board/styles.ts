import styled from '@emotion/styled';

export const boardCellSizePx = 36;
export const boardCellClickableAreaSizePx = 32;

export const Container = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
});

export const Spacer = styled('div')({
  margin: 'auto',
  padding: '1rem',
});

export const Table = styled('table')({
  borderSpacing: 0,
});
