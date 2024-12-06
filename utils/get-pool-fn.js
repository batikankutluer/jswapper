import chalk from "chalk";
import fs from "fs";
import { createPool } from "./create-pool-fn.js";

const pool_data_path = "./database/pool_data.json";

async function getPool() {
  let jsonData = await fs.readFileSync(pool_data_path, "utf-8");
  let pool = JSON.parse(jsonData);
  const { K } = pool;

  if (!K) {
    console.log(chalk.red("Error: Pool not found!, Creating a new pool..."));
    pool = await createPool();
  }

  return pool;
}

export { getPool };
