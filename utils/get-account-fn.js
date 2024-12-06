import fs from "fs";

const account_data_path = "./database/account_data.json";

async function getAccount(accountId) {
  let jsonData = await fs.readFileSync(account_data_path, "utf-8");
  let { accounts } = JSON.parse(jsonData);

  return accounts.find((account) => account.id === accountId);
}

export { getAccount };
