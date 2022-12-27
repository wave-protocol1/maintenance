import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import { Address } from "@elrondnetwork/erdjs/out";
import { getContract } from "../abi";
import { CHAIN_ID, networkProvider } from "../config";
import fs from "fs";

const pem = fs.readFileSync("src/wallet/wallet.pem", "utf8");

const signer = UserSigner.fromPem(pem);

export const pushValidators = async () => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .push_validators([
      new Address(
        "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlllllsmehg53"
      ),
    ])
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const delegate = async (address: string, amount: BigInt) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .delegate_direct([new Address(address), amount])
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const setTotalStaked = async (amount: string) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .set_total_staked([amount])
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const getRewardsAdmin = async (amount: string) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .getRewardsAdmin()
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const getStakeAdmin = async (amount: string) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .getStakeAdmin()
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};
