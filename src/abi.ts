import {
  Address,
  SmartContractAbi,
  SmartContract,
  AbiRegistry,
} from "@elrondnetwork/erdjs/out";

import { promises } from "fs";
import { CONTRACT_ADDRESS } from "./config";

export const getContract = async () => {
  let jsonContent: string = await promises.readFile(
    "./src/stakeContract.abi.json",
    {
      encoding: "utf8",
    }
  );
  let json = JSON.parse(jsonContent);
  let abiRegistry = AbiRegistry.create(json);
  let abi = new SmartContractAbi(abiRegistry, ["StakeContract"]);
  let contract = new SmartContract({
    address: new Address(CONTRACT_ADDRESS),
    abi: abi,
  });

  return contract;
};
