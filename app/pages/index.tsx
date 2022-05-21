import { Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import Board from '../componnets/Board';
import GameStatus from '../componnets/GameStatus';
import { useProgram } from '../contexts/ProgramContext';

const Home: NextPage = () => {
  const { programData } = useProgram();
  const { publicKey } = useWallet();

  return (
    <VStack minH="100vh" justify="center">
      <WalletMultiButton />
      {programData && publicKey && <GameStatus />}
    </VStack>
  );
};

export default Home;
