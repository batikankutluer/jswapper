import chalk from "chalk";
import fs from "fs";

const account_data_path = "./database/account_data.json";

async function createAccount() {
  console.log(chalk.green("Creating a new account"));

  let jsonData = await fs.readFileSync(account_data_path, "utf-8");
  let { accounts } = JSON.parse(jsonData);

  if (!accounts) accounts = [];

  let lastId =
    accounts.sort((a, b) => a.id - b.id)[accounts.length - 1]?.id || 0;

  const newAccount = {
    id: lastId + 1,
    tokenA: 1000,
    tokenB: 1000,
  };

  accounts.push(newAccount);

  // Write to the file
  await fs.writeFileSync(
    account_data_path,
    JSON.stringify({ accounts }, null, 2),
    "utf-8"
  );

  return newAccount.id;
}

export { createAccount };
