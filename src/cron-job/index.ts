import { API_URL } from "../config";

const axios = require("axios");

// run at the beginning of every epoch
// handle the maintenance tasks in order

const checkIfEpochChanged = async () => {
  const currentEpoch = await getCurrentEpoch();
  console.log("currentEpoch", currentEpoch);
  //   if (currentEpoch !== lastEpoch) {
  //     lastEpoch = currentEpoch;
  //     return true;
  //   }
  //   return false;
};

const getCurrentEpoch = async () => {
  const res = await axios.get(`${API_URL}/stats`);
  return res.data.epoch;
};



checkIfEpochChanged();
