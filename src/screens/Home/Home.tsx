import { useEffect } from 'react';
import { Button } from '@app/library';
import { setTitle } from '@app/utils/document';
import { Container, Description, Title, TitleContainer } from './styles';

const Home: React.FC = () => {
  useEffect(() => {
    setTitle('');
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>TicTacToe</Title>

        <Description>5-in-row, infinite board</Description>
      </TitleContainer>

      <Button url="/game">Local multiplayer</Button>
    </Container>
  );
};

export default Home;
