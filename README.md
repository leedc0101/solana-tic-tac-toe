## How to build

```bash
anchor build
solana program deploy ~/<project_folder>/solana-tic-tac-toe/target/deploy/solana_tic_tac_toe.so
```

Make sure you have enough SOL to deploy the program. <br>

Then Program Id will appear on command line.

```bash
...
Program Id: <programId>
...
```

You have to paste it on `programs/solana-tic-tac-toe/srs/lib.rs` and `app/constant.ts`

```rust
// programs/solana-tic-tac-toe/src/lib.rs
...
declare_id!(<programId>);
...
```

```js
// app/constant.ts
export const PROGRAM_ACCOUNT = new PublicKey(<programId>);
```

Now you have to build and deploy and init the program account by `anchor test`

When test is passed successfully, replace the under line to `app/constant.ts`

```js
// app/constant.ts
export const PROGRAM_DATA_ACCOUNT = new PublicKey(<programId>);
```

<br>

---

<br>

## How to run app

```bash
cd app
yarn && yarn dev
```
