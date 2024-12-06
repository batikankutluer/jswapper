import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { buyToken as call_buyToken } from "../utils/buy-token-fn.js";
import { current_account } from "../start.js";

const isNum = (str) => Number(str) + "N" === str + "N";

async function buyToken() {
  const account = await current_account();

  const token_type_answer = await select({
    message: chalk.yellow("Select a token to buy"),
    choices: [
      {
        name: "---> A",
        value: "A",
        description: "Buy token...",
      },
      {
        name: "---> B",
        value: "B",
        description: "Buy token...",
      },
      {
        name: chalk.yellow("Return"),
        value: "return",
        description: "Returns to the app...",
      },
    ],
  });

  if (token_type_answer === "return") return;

  if (!["A", "B"].includes(token_type_answer))
    return console.log(chalk.red("Error: Invalid token type!"));

  const token_type = token_type_answer === "A" ? "A" : "B";
  let token_value_choices = [10, 50, 100, 200, 500];

  token_value_choices = token_value_choices.map((val) => {
    return {
      name: `${val}`,
      value: `${val}`,
    };
  });

  const max_amount = account["token" + token_type];

  token_value_choices.push({
    name: `Maximum Amount of $${token_type}: ${max_amount}`,
    value: `${max_amount}`,
  });

  const token_value_answer = await select({
    message: chalk.yellow("Enter the amount of token to buy"),
    choices: token_value_choices,
  });

  const token_value = Number(token_value_answer);

  if (!isNum(token_value_answer))
    return console.log(chalk.red("Error: Not a number!"));

  return call_buyToken(token_value, token_type);
}

export { buyToken };
