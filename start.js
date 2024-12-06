#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

import { createAccount } from "./utils/create-account-fn.js";
import { getAccount } from "./utils/get-account-fn.js";

import MENU from "./menu.js";

import { getVersion } from "./utils/get-version-fn.js";

export const create_account_id = await createAccount();
export const current_account = async () => await getAccount(create_account_id);

export const app_name = "jswapper";
export const version = await getVersion();

//! Starts the app

const program = new Command();

program
  .name(app_name)
  .description(
    chalk.green("JSwapper: ") + chalk.blueBright("A simple token swapping app.")
  )
  .version(version);

program
  .command("start")
  .description(chalk.yellowBright("Initializes the application with menu."))
  .action(MENU);
program.parse(process.argv);
