import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';
import { IdlAccountDef } from '@project-serum/anchor/dist/cjs/idl';
import { IdlTypes, TypeDef } from '@project-serum/anchor/dist/cjs/program/namespace/types';
import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { PROGRAM_ACCOUNT, PROGRAM_DATA_ACCOUNT } from '../constant';

export class ExtendedWallet implements Wallet {
  constructor(readonly payer: Keypair) {
    this.payer = payer;
  }
  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer);
    return tx;
  }
  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((t) => {
      t.partialSign(this.payer);
      return t;
    });
  }
  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }
}

const ProgramContext = createContext({} as any);

export interface ProgramData {
  board: Array<number>;
  players: Array<PublicKey>;
  state: { active: {} };
  turn: number;
}

export function ProgramProvider({ children }: any) {
  const [program, setProgram] = useState<Program<Idl>>();
  const [programData, setProgramData] = useState<TypeDef<IdlAccountDef, IdlTypes<Idl>>>();
  const { connection } = useConnection();

  useEffect(() => {
    const getProgram = async () => {
      const provider = new AnchorProvider(connection, new ExtendedWallet(Keypair.generate()), {});
      const idl = await Program.fetchIdl(PROGRAM_ACCOUNT, provider);
      if (!idl) return;

      const _program = new Program(idl, PROGRAM_ACCOUNT, provider);
      setProgram(_program);

      const _programData = await _program.account.game.fetch(PROGRAM_DATA_ACCOUNT);
      setProgramData(_programData);
    };

    getProgram();
  }, []);

  useEffect(() => {
    const id = connection.onAccountChange(PROGRAM_DATA_ACCOUNT, async () => {
      const _programData = await program?.account.game.fetch(PROGRAM_DATA_ACCOUNT);
      setProgramData(_programData);
    });

    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, []);

  const value = {
    program,
    programData,
  };

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
}

export function useProgram() {
  const { program, programData } = useContext(ProgramContext);
  return { program, programData: programData as ProgramData };
}
