import chalk from "chalk";
import fs from "fs";
import path from "path";

const pool_data_path = path.resolve("./database/pool_data.json");

async function createPool() {
  let jsonData = await fs.readFileSync(pool_data_path, "utf-8");
  let data = JSON.parse(jsonData);

  if (!!data.k) return;

  const pool = { tokenA: 1000, tokenB: 1000, K: 1000000 };
  // Write to the file
  await fs.writeFileSync(
    pool_data_path,
    JSON.stringify(pool, null, 2),
    "utf-8"
  );

  return pool;
}

export { createPool };
