import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { ResultsParser } from "@elrondnetwork/erdjs";

export const GATEWAY_URL = "https://devnet-gateway.elrond.com";
export const API_URL = "https://devnet-api.elrond.com";
export const EXPLORER_URL = "https://devnet-explorer.elrond.com/transactions/";
export const CHAIN_ID = "D";

// export const GATEWAY_URL = "https://testnet-gateway.elrond.com";
// export const API_URL = "https://testnet-api.elrond.com";
// export const EXPLORER_URL = "https://testnet-explorer.elrond.com/transactions/";
// export const CHAIN_ID = "T";

// export const GATEWAY_URL =
//   "https://gateway.elrond.com";
// export const API_URL = "https://api.elrond.com";
// export const EXPLORER_URL = "https://explorer.elrond.com/transactions/";
// export const CHAIN_ID = "1";

export const CONTRACT_ADDRESS =
  "erd1qqqqqqqqqqqqqpgqhl960jlj858xtlrz8uzeg7q2ps2uvq7a623s9vjdnd";

export const networkProvider = new ApiNetworkProvider(API_URL);
export const resultsParser = new ResultsParser();
