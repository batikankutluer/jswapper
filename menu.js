import chalk from "chalk";
import { select } from "@inquirer/prompts";

import { current_account } from "./start.js";
import { buyToken } from "./commands/buy-token.js";

export default async function MENU() {
  const answer = await select({
    message: "Select an option to proceed...",
    choices: [
      {
        name: chalk.green("--> Swap tokens"),
        value: "buy-token",
        description: "You can buy token using this...",
      },
      {
        name: chalk.red("(X) Exit"),
        value: "exit",
        description: "Exits from the app.",
      },
    ],
  });

  switch (answer) {
    case "buy-token":
      const account = await current_account();
      console.log("");
      console.log(chalk.whiteBright(`Account No: ${account.id}`));
      console.log("");
      console.log(
        chalk.green("$A") + " - " + chalk.yellow(`Balance: ${account.tokenA}`)
      );
      console.log(
        chalk.green("$B") + " - " + chalk.yellow(`Balance: ${account.tokenB}`)
      );
      console.log("\n");

      await buyToken();
      console.log("\n");

      break;
    default:
      console.log(chalk.bgRedBright("EXIT: None is selected. "));
      return;
  }

  return await MENU();
}
