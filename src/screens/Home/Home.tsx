import { useEffect } from 'react';
import { Button } from '@app/library';
import { setTitle } from '@app/utils/document';
import { Container, Description, Menu, Title, TitleContainer } from './styles';

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

      <Menu>
        <Button url="/game/local/single-player">Single player</Button>
        <Button url="/game/local/multi-player">Multiplayer</Button>
      </Menu>
    </Container>
  );
};

export default Home;
