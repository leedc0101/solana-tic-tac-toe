import { Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '../contexts/ProgramContext';

export default function PlayerStatus() {
  const { programData } = useProgram();
  const { publicKey } = useWallet();
  const gameStatus = Object.entries(programData.state)[0][0];
  const playerIndex = publicKey && programData.players.findIndex((str) => str.toBase58() === publicKey.toBase58());
  const isPlayerTurn =
    playerIndex !== null && playerIndex >= 0 && gameStatus === 'active' && playerIndex === (programData.turn + 1) % 2;

  if (gameStatus === 'active') {
    return isPlayerTurn ? <Text>It's your turn</Text> : <Text>It's opponent turn</Text>;
  } else if (gameStatus === 'tie') {
    return <Text>It's tie</Text>;
  } else {
    return programData.state.won.winner.toBase58() === publicKey?.toBase58() ? (
      <Text color="green">You won !!!</Text>
    ) : (
      <Text color="red">You lose !!!</Text>
    );
  }
}
