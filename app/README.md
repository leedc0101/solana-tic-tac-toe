## Before you run this app

First you have to deploy and init the tic-tac-toe program with anchor framework. <br>
You can see more details on `programs` folder.

Then, edit `constant.ts` by replacing it to your own Program Account and Program Data Account address

```js
export const PROGRAM_ACCOUNT = new PublicKey('<Your program account>');
export const PROGRAM_DATA_ACCOUNT = new PublicKey('<Your Program data account>');
```

<br>

## How to run

```bash
yarn && yarn dev
```
