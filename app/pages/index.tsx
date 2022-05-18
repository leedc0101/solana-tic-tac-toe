import { Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { PROGRAM_DATA_ACCOUNT } from '../componnets/constant';
import { useProgram } from '../componnets/contexts/ProgramContext';

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { programData } = useProgram();

  const isPlayer = !!(
    programData &&
    publicKey &&
    programData.players.find((el) => el.toBase58() === publicKey.toBase58())
  );

  return (
    <VStack>
      <Text>Waiting for opponent</Text>
      <WalletMultiButton />
      {isPlayer ? <Text>Hello player!</Text> : <Text>You're not a player</Text>}
    </VStack>
  );
};

export default Home;
