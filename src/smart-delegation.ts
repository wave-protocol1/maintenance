import { getStakedPerValidator } from "./utils/query";
import { BigNumber } from "bignumber.js";
import { getAllValidators, getStakePerValidator } from "./utils/apiCalls";
import { getDeltaStake } from "./utils/query";

export const calculateDelegation = async () => {
  const validators = await getAllValidators();
  const deltaStake = await getDeltaStake();
  //   const delta_stake = 27.322;
  //   const amountPerValidator = deltaStake / 20;

  //   get top 20 validators
  const top20 = validators.sort((a: any, b: any) => b.apr - a.apr).slice(0, 20);

  const addresses = top20.map((validator: any) => validator.provider);

  //   const validatorsWithStake = await getStakePerValidator({ addresses });
  //   console.log("validatorsWithStake", validatorsWithStake);

  console.log("deltaStake", Number(deltaStake.firstValue?.valueOf()));
};

// rank them by apr, top 20

// check how much you've already delegated to them (we need to not have all our eggs in one basket)

// delegate to the top 20, but not more than 5% of your total stake to any one validator
