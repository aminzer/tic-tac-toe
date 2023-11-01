import styled from '@emotion/styled';

export const Container = styled('button')(({ theme }) => ({
  padding: '0.25rem 1rem',
  backgroundColor: 'initial',
  color: theme.palette.primary.default,
  border: `2px solid ${theme.palette.primary.default}`,
  borderRadius: theme.shape.borderRadius.default,
  fontSize: '1rem',
  fontFamily: theme.fonts.fontFamily.default,
  cursor: 'pointer',
  transition: 'all 0.1s linear',

  '&:hover': {
    backgroundColor: theme.palette.background.light,
  },

  '&:focus': {
    backgroundColor: theme.palette.background.light,
  },
}));
