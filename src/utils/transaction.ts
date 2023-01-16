import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import { Address } from "@elrondnetwork/erdjs/out";
import { getContract } from "../abi";
import { CHAIN_ID, networkProvider } from "../config";
import fs from "fs";

require("dotenv").config();

const pem = process.env.PRIVATE_KEY;

// @ts-ignore
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

export const getRewardsAdmin = async (nonce: number) => {
  const contract = await getContract();
  let tx = contract.methods
    .getRewardsAdmin()
    .withNonce(nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const updateExchangeRate = async () => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .updateExchangeRate()
    .withNonce(walletOnNetwork.nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const dailyDelegation = async (nonce: number) => {
  const contract = await getContract();

  let tx = contract.methods
    .dailyDelegation()
    .withNonce(nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const redelegateAdmin = async (nonce: number) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .redelegateAdmin()
    .withNonce(nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const withdrawAdmin = async (nonce: number) => {
  const contract = await getContract();
  let tx = contract.methods
    .withdrawAdmin()
    .withNonce(nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};

export const getStakeAdmin = async (nonce: number) => {
  const contract = await getContract();
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let tx = contract.methods
    .getStakeAdmin()
    .withNonce(nonce)
    .withGasLimit(20000000)
    .withChainID(CHAIN_ID)
    .buildTransaction();

  console.log("walletOnNetwork", walletOnNetwork);

  signer.sign(tx);

  let txHash = await networkProvider.sendTransaction(tx);
};
