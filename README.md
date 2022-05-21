# How to build

```bash
anchor build
solana program deploy <project_root_folder_path>/solana-tic-tac-toe/target/deploy/solana_tic_tac_toe.so
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
export const PROGRAM_ACCOUNT = new PublicKey('<programId>');
```

Before you init the program data, you have to prepare two player account and replace it on `test/solana-tic-tac-toe.ts`

```js
// test/solana-tic-tac-toe.ts
...
const playerOne = new PublicKey("<player one publicKey>");
const playerTwo = new PublicKey("<player two publicKey>");
...
```

Now you have to re-build, deploy and init the program data account by

```bash
anchor test
```

When test is passed successfully, replace the under line to `app/constant.ts`

```js
// app/constant.ts
export const PROGRAM_DATA_ACCOUNT = new PublicKey('<programId>');
```

Finally you have to deploy idl for the program by

```bash
anchor idl init --filepath ./target/idl/tic_tac_toe.json <programId>
```

Done! Let's run app.

<br>

---

<br>

# How to run app

```bash
cd app
yarn && yarn dev
```

<br>

---

<br>

# How to re-start the game

Init the new program data account by

```bash
anchor test --skip-build --skip-deploy
```

When test is passed successfully, replace the under line to `app/constant.ts`

```js
// app/constant.ts
export const PROGRAM_DATA_ACCOUNT = new PublicKey('<programId>');
```
