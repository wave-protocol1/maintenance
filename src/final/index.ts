import fs from "fs";
import {
  withdrawAdmin,
  dailyDelegation,
  getRewardsAdmin,
  redelegateAdmin,
  getStakeAdmin,
  updateExchangeRate,
} from "./../utils/transaction";
import cron from "cron";
import {
  getRedelegateFinished,
  getRewardsAmounts,
  getStakeInfoFinished,
  getValidators,
} from "../utils/query";
import { networkProvider } from "../config";
import { UserSigner } from "@elrondnetwork/erdjs-walletcore/out";
import { getEpoch } from "../utils/apiCalls";

require("dotenv").config();

const pem = process.env.PRIVATE_KEY;
// @ts-ignore
const signer = UserSigner.fromPem(pem);

const job = new cron.CronJob(
  "45 */2 * * *",
  () => {
    performAllTasks();
  },
  null,
  true,
  "Europe/Bucharest"
);

job.start();
const performAllTasks = async () => {
  let validators = await getValidators();

  let epoch = await getEpoch();
  console.log("running");

  let validatorsNumber = validators?.firstValue?.valueOf().length;

  let isFinished = await checkIfFirstBatchFinished(epoch);
  !isFinished && performFirstBatch(validatorsNumber);

  // TODO: unnest this
  let interval = setInterval(async () => {
    let isFinished = await checkIfFirstBatchFinished(epoch);

    if (isFinished) {
      clearInterval(interval);

      let isFinished = await checkIfSecondBatchFinished(epoch);
      !isFinished && performSecondBatch(validatorsNumber);

      let redelegateInterval = setInterval(async () => {
        let isFinished = await checkIfSecondBatchFinished(epoch);

        if (isFinished) {
          clearInterval(redelegateInterval);

          performGetStake(validatorsNumber);

          let stakeInterval = setInterval(async () => {
            let isFinished = await checkIfThirdBatchFinished(epoch);

            if (isFinished) {
              updateExchangeRate();
              clearInterval(stakeInterval);
            }
          }, 5000);
        }
      }, 5000);
    }
  }, 5000);

  checkIfSecondBatchFinished(epoch);
};

const performFirstBatch = async (validatorsNumber: number) => {
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let nonce = walletOnNetwork.nonce;

  for (let i = 0; i <= validatorsNumber; i++) {
    getRewardsAdmin(nonce);
    nonce++;
    withdrawAdmin(nonce);
    nonce++;
  }
  dailyDelegation(nonce);
};

const performSecondBatch = async (validatorsNumber: number) => {
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let nonce = walletOnNetwork.nonce;

  for (let i = 0; i < validatorsNumber; i++) {
    redelegateAdmin(nonce);
    nonce++;
  }
};

const performGetStake = async (validatorsNumber: number) => {
  let walletOnNetwork = await networkProvider.getAccount(signer.getAddress());

  let nonce = walletOnNetwork.nonce;

  for (let i = 0; i <= validatorsNumber; i++) {
    getStakeAdmin(nonce);
    nonce++;
  }
};

const checkIfFirstBatchFinished = async (epoch: number) => {
  let rewardsAmountsData = await getRewardsAmounts();
  let rewardsAmounts = rewardsAmountsData.firstValue?.valueOf();

  let isFinished = rewardsAmounts?.some((amount: string) => {
    return amount[0].valueOf() == epoch.toString();
  });

  return isFinished;
};

const checkIfSecondBatchFinished = async (epoch: number) => {
  let rewardsAmountsData = await getRedelegateFinished();
  let rewardsAmounts = rewardsAmountsData.firstValue?.valueOf();

  let isFinished = rewardsAmounts?.some((amount: string) => {
    return amount.valueOf() == epoch.toString();
  });

  console.log("isFinished", isFinished);

  return isFinished;
};

const checkIfThirdBatchFinished = async (epoch: number) => {
  let rewardsAmountsData = await getStakeInfoFinished();
  let rewardsAmounts = rewardsAmountsData.firstValue?.valueOf();

  let isFinished = rewardsAmounts?.some((amount: string) => {
    return amount.valueOf() == epoch.toString();
  });

  console.log("isFinished", isFinished);

  return isFinished;
};
