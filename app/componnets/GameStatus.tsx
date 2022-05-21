import { VStack, Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '../contexts/ProgramContext';
import Board from './Board';
import PlayerStatus from './PlayerStatus';

export default function GameStatus() {
  return (
    <VStack fontSize="18px">
      <PlayerStatus />
      <Board />
    </VStack>
  );
}
