import { BigIntValue, decodeBigNumber } from "@elrondnetwork/erdjs";
import { calculateDelegation } from "./smart-delegation";
import {
  getAllValidators,
  getStakePerValidator,
  getTotalRewards,
  getTotalStake,
} from "./utils/apiCalls";
import { getStakeAmounts } from "./utils/query";
import { delegate, pushValidators, setTotalStaked } from "./utils/transaction";

const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

// getAllValidators().then((res) => console.log("data", res));

getTotalStake().then((res) => {
  // setTotalStaked(res.toString());
  console.log("res.toString(", res.toString());
});

// pushValidators();

// getTotalRewards().then((res) => {
//   console.log("res", res);
// });

// delegate(
//   "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlllllsmehg53",
//   BigInt("6900000000000000000")
// );

// getStakePerValidator();
// calculateDelegation();
// getStakeAmounts().then((res) =>
//   // @ts-ignore
//   console.log("res", res?.firstValue.valueOf().valueOf())
// );

// delegateToValidator();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
