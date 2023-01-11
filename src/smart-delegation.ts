import { getStakedPerValidator } from "./utils/query";
import { BigNumber } from "bignumber.js";
import { getAllValidators, getStakePerValidator } from "./utils/apiCalls";
import { getDeltaStake } from "./utils/query";

export const calculateDelegation = async () => {
  const validators = await getAllValidators();

  const addresses = validators.map((validator: any) => validator.provider);

  let validatorsWithStake = await getStakePerValidator({ addresses });
  // remove validators with 0 stake
  validatorsWithStake = validatorsWithStake.filter(
    (validator: any) => validator.stake > 0
  );

  // push validator info to validatorsWithStake
  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];
    const validatorWithStake = validatorsWithStake.find(
      (validatorWithStake: any) =>
        validatorWithStake.address === validator.provider
    );

    // console.log("validatorWithStake", validatorWithStake);

    if (validatorWithStake) {
      validatorWithStake.apr = validator.apr;
      validatorWithStake.serviceFee = validator.serviceFee;
      validatorWithStake.delegationCap = validator.delegationCap;
    }
  }

  return validatorsWithStake;
};

calculateDelegation().then((res) => console.log(res));

const computeApr = (validatorsWithStake: any) => {
  const getStakePercentage = (stake: number) => {
    const totalStake = validatorsWithStake.reduce(
      (total: number, validator: any) => total + validator.stake,
      0
    );

    return stake / totalStake;
  };

  validatorsWithStake.push({
    address: "0x0000000000000000000000000000000000000000",
    stake: 20,
    apr: 50,
  });
  console.log("validatorsWithStake", validatorsWithStake);

  const weightedApr = validatorsWithStake.reduce(
    (total: number, validator: any) => {
      const stakePercentage = getStakePercentage(validator.stake);
      console.log("stakePercentage", stakePercentage);
      return total + stakePercentage * validator.apr;
    },
    0
  );

  console.log("weightedApr", weightedApr);
};

export const getRating = async () => {
  let validators = await getAllValidators();

  validators = validators.sort((a: any, b: any) => b.apr - a.apr);

  // filter out full validators
  validators = validators.filter(
    (validator: any) =>
      validator.delegationCap > Number(validator.locked) + 1 * 10 ** 18
  );

  validators = validators.map((validator: any) => {
    return {
      ...validator,
      leftToStake: Number(
        (BigInt(validator.delegationCap) - BigInt(validator.locked)) /
          BigInt(10 ** 18)
      ),
    };
  });

  console.log("validators.length", validators.length);
  console.log("validators", validators);

  // console.log("validators", validators);
};

getRating().then((res) => console.log("res", res));
