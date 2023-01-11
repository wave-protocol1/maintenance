import {
  getRewardsPerValidator,
  getStakedPerValidator,
  getValidators,
} from "./query";
import axios from "axios";
import { API_URL } from "../config";
import fs from "fs";

export const getTotalStake = async () => {
  let totalStaked = 0;
  const res = await getValidators();
  const rawAddresses = res.firstValue?.valueOf().valueOf();

  const addresses = rawAddresses.map((address: any) => {
    return address.bech32();
  });

  for (let i = 0; i < addresses.length; i++) {
    const staked = await getStakedPerValidator(addresses[i]);
    totalStaked += Number(staked);
  }
  console.log("totalStaked", totalStaked / 10 ** 18);

  return totalStaked;
};

export const getTotalRewards = async () => {
  let totalRewards = 0;
  const res = await getValidators();
  const rawAddresses = res.firstValue?.valueOf().valueOf();

  const addresses = rawAddresses.map((address: any) => {
    return address.bech32();
  });

  for (let i = 0; i < addresses.length; i++) {
    const rewards = await getRewardsPerValidator(addresses[i]);
    totalRewards += Number(rewards);
  }
  console.log("totalRewards", totalRewards / 10 ** 18);

  return totalRewards;
};

export const getStakePerValidator = async ({
  addresses,
}: {
  addresses: Array<string>;
}) => {
  let validatorsWithStake = <any>[];
  for (let i = 0; i < addresses.length; i++) {
    const staked = await getStakedPerValidator(addresses[i]);
    validatorsWithStake.push({
      address: addresses[i],
      stake: Number(staked) / 10 ** 18,
    });
  }

  return validatorsWithStake;
};

export const getAllValidators = async () => {
  let data = await axios.get(`${API_URL}/providers`);

  const ranked = data.data.sort((a: any, b: any) => {
    return b.apr - a.apr;
  });

  return ranked;
};

export const getEpoch = async () => {
  let data = await axios.get(`${API_URL}/stats`);

  return data?.data.epoch;
};
