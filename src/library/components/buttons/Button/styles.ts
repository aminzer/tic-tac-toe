import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router';

const getContainerStyles = ({ theme }: { theme: Theme }) => ({
  padding: '0.25rem 1rem',
  backgroundColor: 'initial',
  color: theme.palette.primary.default,
  border: `2px solid ${theme.palette.primary.default}`,
  borderRadius: theme.shape.borderRadius.default,
  fontSize: '1rem',
  fontFamily: theme.fonts.fontFamily.default,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.1s linear',

  '&:hover': {
    backgroundColor: theme.palette.background.light,
  },

  '&:focus': {
    backgroundColor: theme.palette.background.light,
    outline: `2px solid ${theme.palette.primary.default}`,
    outlineOffset: '2px',
  },
});

export const ButtonContainer = styled('button')(getContainerStyles);

export const LinkContainer = styled(Link)(getContainerStyles);
