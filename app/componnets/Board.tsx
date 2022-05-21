import { Text, Grid, GridItem, Box, VStack, useToast } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { PROGRAM_DATA_ACCOUNT } from '../constant';
import { useProgram } from '../contexts/ProgramContext';

export default function Board() {
  const { program, programData } = useProgram();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const toast = useToast();

  const gameStatus = Object.entries(programData.state)[0][0];
  const playerIndex = publicKey && programData.players.findIndex((str) => str.toBase58() === publicKey.toBase58());
  const isPlayerTurn =
    playerIndex !== null && playerIndex >= 0 && gameStatus === 'active' && playerIndex === (programData.turn + 1) % 2;

  const fallbackFactory = (row: number, column: number) => {
    return async () => {
      try {
        const tx = new Transaction();

        tx.add(
          await program.methods
            .play({ row, column })
            .accounts({
              game: PROGRAM_DATA_ACCOUNT,
              player: publicKey,
            })
            .instruction()
        );

        const signature = await sendTransaction(tx, connection);
        await connection.confirmTransaction(signature);

        toast({
          status: 'success',
          title: 'Transaction success!',
          description: (
            <a href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>See more details on explorer</a>
          ),
        });
      } catch (e: any) {
        toast({
          status: 'error',
          title: "Something's wrong!",
          description: e.message,
        });
      }
    };
  };

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" bg="#404452" border="4px solid #2c3e50;" borderRadius="5px">
      {programData.board.map((col, i) => {
        return col.map((el, j) => {
          const isTileClickable = !el && isPlayerTurn;
          return (
            <GridItem key={(i + 1) * j} onClick={isTileClickable ? fallbackFactory(i, j) : () => {}}>
              <VStack
                bg={el ? (Object.entries(el)[0][0] == 'x' ? '#739E91' : '#737E9E') : 'none'}
                boxSize="100px"
                border="4px solid #2c3e50"
                justify="center"
                borderRadius="2px"
                _hover={{
                  cursor: isTileClickable ? 'pointer' : 'not-allowed',
                  backgroundColor: isTileClickable ? (playerIndex === 0 ? '#739E91' : '#737E9E') : '',
                }}
              >
                <Text fontSize="24px">{el ? Object.entries(el)[0][0] : ' '}</Text>
              </VStack>
            </GridItem>
          );
        });
      })}
    </Grid>
  );
}
