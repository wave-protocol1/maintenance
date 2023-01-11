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

const pem = fs.readFileSync("src/wallet/wallet.pem", "utf8");
const signer = UserSigner.fromPem(pem);

// cron job to perform all tasks

// create a cron job that runs every 2 hours

// cron.schedule("0 */2 * * *", () => {
//   console.log("running a task every two hours");
//   // perform all tasks
//   performAllTasks();
// });

const performAllTasks = async () => {
  let validators = await getValidators();

  let epoch = await getEpoch();

  let validatorsNumber = validators?.firstValue?.valueOf().length;

  let isFinished = await checkIfFirstBatchFinished(epoch);
  !isFinished && performFirstBatch(validatorsNumber);

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

  // redelegate nx
  //   redelegateAdmin();
  //   //
  //   // get stake nx
  //   for (let i = 0; i < 4; i++) {
  //     getStakeAdmin();
  //   }
  //   //
  //   // update exchange rate 1x
  //   updateExchangeRate();
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
    console.log("amount", amount.valueOf());
    return amount.valueOf() == epoch.toString();
  });

  console.log("isFinished", isFinished);

  return isFinished;
};

const checkIfThirdBatchFinished = async (epoch: number) => {
  let rewardsAmountsData = await getStakeInfoFinished();
  let rewardsAmounts = rewardsAmountsData.firstValue?.valueOf();

  let isFinished = rewardsAmounts?.some((amount: string) => {
    console.log("amount", amount.valueOf());
    return amount.valueOf() == epoch.toString();
  });

  console.log("isFinished", isFinished);

  return isFinished;
};

performAllTasks();
