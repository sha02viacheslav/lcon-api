import * as process from "process";
import { ISecrets } from "../interfaces/secrets.interface";

const vault = require("node-vault")({
  apiVersion: "v1",
  endpoint: process.env.VAULT_ADDR,
})

export const getSecrets = async (): Promise<ISecrets> => {
  vault.token = process.argv[2];
  const { data } = await vault.read(process.argv[3]);
  return data;
}
