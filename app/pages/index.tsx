import { Box, HStack, Text, VStack } from '@chakra-ui/react';
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
    <VStack minH="100vh" justify="space-between" w="full" bg="#7B839E" color="white">
      <HStack w="full" p={20} justify="space-between">
        <Text fontSize="30px">Web3 Tic-Tac-Toe</Text>
        <WalletMultiButton />
      </HStack>
      {programData && publicKey && <GameStatus />}
      <Box w="full" h="200px" />
    </VStack>
  );
};

export default Home;
