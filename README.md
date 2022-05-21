# Preview

![](https://user-images.githubusercontent.com/39988655/169661775-1b360385-29f6-406d-a332-9a8c4e8978d1.gif)

<br>

# Prerequisites

https://book.anchor-lang.com/getting_started/installation.html

<br>

# How to build

Before you start, you have to change the provider of `Anchor.toml` file <br>
If you want to use other network than devnet, you have to change cluster. <br>

```toml
[provider]
# "local" or "testnet"
cluster = "devnet"
# Change this if your wallet is in other path
wallet = "~/.config/solana/id.json"
```

Then, you can build binary by

```bash
anchor build
solana program deploy <project_root_folder_path>/solana-tic-tac-toe/target/deploy/solana_tic_tac_toe.so
```

Make sure you have enough SOL to deploy the program. (More than 6sol) <br>

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

When test is passed successfully, you will see this line on command line.

```bash
...
tic-tac-toe
export const PROGRAM_DATA_ACCOUNT = new PublicKey('<program data account>');
✔ setup game!
...
```

Replace that line to `app/constant.ts`

```js
// app/constant.ts
export const PROGRAM_DATA_ACCOUNT = new PublicKey('<program data account>');
```

Finally you have to deploy idl for the program by

```bash
anchor idl init --filepath ./target/idl/tic_tac_toe.json <programId>
```

Done! Let's run app.

<br>

# How to run app

```bash
cd app
yarn && yarn dev
```

If you run the app and connect the browser wallet extension, than board will appear.

> Note that you have to connect to the address that you set on `test/solana-tic-tac-toe.ts`. <br>
> If's not, the board will not appear because that address is not a player.

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
