import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';
import { expect } from 'chai';
import { PublicKey } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TicTacToe as Program<TicTacToe>;

  it('setup game!', async () => {
    const gameKeypair = anchor.web3.Keypair.generate();
    console.log(`export const PROGRAM_DATA_ACCOUNT = new PublicKey('${gameKeypair.publicKey.toBase58()}');`);
    const playerOne = new PublicKey('BbeB9wJkKAK98Bf887a2uMZtEfAjTNkSrvQgC9qDuTNG');
    const playerTwo = new PublicKey('EnXN6aAUvkignLyn5evcKTYCDfXmq2KY3npiUVJhrFC4');
    await program.methods
      .setupGame(playerOne, playerTwo)
      .accounts({
        game: gameKeypair.publicKey,
      })
      .signers([gameKeypair])
      .rpc();

    let gameState = await program.account.game.fetch(gameKeypair.publicKey);
    expect(gameState.turn).to.equal(1);
    expect(gameState.players).to.eql([playerOne, playerTwo]);
    expect(gameState.state).to.eql({ active: {} });
    expect(gameState.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });
});
