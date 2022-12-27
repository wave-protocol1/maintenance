import { getContract } from "../abi";
import {
  Address,
  SmartContract,
  ContractFunction,
  AddressValue,
  Interaction,
  decodeBigNumber,
} from "@elrondnetwork/erdjs/out";
import { BigNumber } from "bignumber.js";
import { CONTRACT_ADDRESS, networkProvider, resultsParser } from "../config";

export const getTotalStaked = async () => {
  const contract = await getContract();
  let interaction = <Interaction>contract.methods.getTotalStaked();
  let query = interaction.check().buildQuery();

  let queryResponse = await networkProvider.queryContract(query);
  let endpointDefinition = interaction.getEndpoint();
  let { firstValue, secondValue, returnCode } =
    resultsParser.parseQueryResponse(queryResponse, endpointDefinition);

  console.log("firstValue", firstValue?.valueOf().valueOf());
};

export const getValidators = async () => {
  const contract = await getContract();
  let interaction = <Interaction>contract.methods.getValidators();
  let query = interaction.check().buildQuery();

  let queryResponse = await networkProvider.queryContract(query);
  let endpointDefinition = interaction.getEndpoint();
  let { firstValue, secondValue, returnCode } =
    resultsParser.parseQueryResponse(queryResponse, endpointDefinition);

  return { firstValue, secondValue, returnCode };
};

export const getDeltaStake = async () => {
  const contract = await getContract();
  let interaction = <Interaction>contract.methods.getDeltaStake();
  let query = interaction.check().buildQuery();

  let queryResponse = await networkProvider.queryContract(query);
  let endpointDefinition = interaction.getEndpoint();
  let { firstValue, secondValue, returnCode } =
    resultsParser.parseQueryResponse(queryResponse, endpointDefinition);

  return { firstValue, secondValue, returnCode };
};

export const getStakeAmounts = async () => {
  const contract = await getContract();
  let interaction = <Interaction>contract.methods.getStakeAmounts();
  let query = interaction.check().buildQuery();

  let queryResponse = await networkProvider.queryContract(query);
  let endpointDefinition = interaction.getEndpoint();
  let { firstValue, secondValue, returnCode } =
    resultsParser.parseQueryResponse(queryResponse, endpointDefinition);

  return { firstValue, secondValue, returnCode };
};

export const getStakedPerValidator = async (address: string) => {
  try {
    let contractAddress = new Address(address);
    let contract = new SmartContract({ address: contractAddress });

    let func = new ContractFunction("getUserActiveStake");
    let args = [new AddressValue(new Address(CONTRACT_ADDRESS))];
    let query = new Interaction(contract, func, args).buildQuery();

    let queryResponse = await networkProvider.queryContract(query);
    const buff = Buffer.from(queryResponse?.returnData[0], "base64");
    let result = decodeBigNumber(buff).valueOf();

    return result;
  } catch (error) {
    return 0;
  }
};

export const getRewardsPerValidator = async (address: string) => {
  try {
    let contractAddress = new Address(address);
    let contract = new SmartContract({ address: contractAddress });

    let func = new ContractFunction("getClaimableRewards");
    let args = [new AddressValue(new Address(CONTRACT_ADDRESS))];
    let query = new Interaction(contract, func, args).buildQuery();

    let queryResponse = await networkProvider.queryContract(query);
    const buff = Buffer.from(queryResponse?.returnData[0], "base64");
    let result = decodeBigNumber(buff).valueOf();

    return result;
  } catch (error) {
    return 0;
  }
};
