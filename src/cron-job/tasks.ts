import { getRewardsAdmin, getStakeAdmin } from "../utils/transaction";

const sendGetRewardsTask = async () => {
  for (let i = 0; i < 3; i++) {
    getRewardsAdmin();
  }
};

const sendGetStakeTask = async () => {
  for (let i = 0; i < 3; i++) {
    getStakeAdmin();
  }
};

const redelegateTask = async () => {
  for (let i = 0; i < 3; i++) {
    // redelegate();
  }
};
