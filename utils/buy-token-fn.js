import fs from "fs";
import chalk from "chalk";

import { getPool } from "./get-pool-fn.js";
import { current_account } from "../start.js";

const account_data_path = "./database/account_data.json";
const pool_data_path = "./database/pool_data.json";

async function buyToken(token, type) {
  const pool = await getPool();
  const account = await current_account();

  const { tokenA, tokenB, K } = pool;
  const { tokenA: balanceA, tokenB: balanceB } = account;

  if (!account?.tokenA || !account?.tokenB)
    return console.log(chalk.red("Error: Account not found!"));

  if (!tokenA || !tokenB || !K)
    return console.log(chalk.red("Error: Pool not found!"));

  if (type === "A") {
    if (token > tokenA)
      return console.log(chalk.red("Error: Not enough token A in the pool!"));

    const costB = K / (tokenA - token) - tokenB;
    if (costB > balanceB)
      return console.log(
        chalk.red(`Error: Insufficient funds! it costs ${costB} $B`)
      );
    account.tokenA += token;
    pool.tokenA -= token;

    account.tokenB -= costB;
    pool.tokenB += costB;

    await finalize();

    return console.log(chalk.green(`Bought ${token} $A for ${costB} $B`));
  }

  if (type === "B") {
    if (token > tokenB)
      return console.log(chalk.red("Error: Not enough token B in the pool!"));

    const costA = K / (tokenB - token) - tokenA;
    if (costA > balanceA)
      return console.log(
        chalk.red(`Error: Insufficient funds! it costs ${costA} $A`)
      );
    account.tokenB += token;
    pool.tokenB -= token;

    account.tokenA -= costA;
    pool.tokenA += costA;

    await finalize();

    return console.log(chalk.green(`Bought ${token} $B for ${costA} $A`));
  }

  async function finalize() {
    const raw_account_data = await fs.readFileSync(account_data_path, "utf-8");
    const { accounts } = JSON.parse(raw_account_data);

    let temp = accounts.filter((_account) => _account.id !== account.id);

    temp.push({
      id: account.id,
      tokenA: account.tokenA,
      tokenB: account.tokenB,
    });

    const accounts_data = {
      accounts: temp,
    };

    console.log(tokenA, tokenB, account.tokenA, account.tokenB);

    const pool_data = {
      tokenA: pool.tokenA,
      tokenB: pool.tokenB,
      K,
    };

    await fs.writeFileSync(
      account_data_path,
      JSON.stringify(accounts_data, null, 2)
    );

    await fs.writeFileSync(pool_data_path, JSON.stringify(pool_data, null, 2));
  }
}

export { buyToken };
