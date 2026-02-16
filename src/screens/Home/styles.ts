import styled from '@emotion/styled';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  paddingTop: '20vh',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
});

export const Title = styled('h1')({
  margin: 0,
});

export const Description = styled('h5')({
  margin: 0,
});

export const Menu = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
});
