import fs from "fs";

const getVersion = async () => {
  const raw_data = await fs.readFileSync("./package.json", "utf-8");
  const data = JSON.parse(raw_data);
  const { version } = data;
  return version;
};

export { getVersion };
