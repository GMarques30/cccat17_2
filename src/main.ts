import express from "express";
import { Signup } from "./application/Signup";
import { GetAccount } from "./application/GetAccount";
import { AccountDAODatabase } from "./infra/dao/AccountDAODatabase";

const http = express();
http.use(express.json());

http.post("/signup", async (req, res) => {
  const accountDAO = new AccountDAODatabase();
  const signup = new Signup(accountDAO);
  try {
    const output = await signup.execute(req.body);
    res.status(200).json(output);
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
});

http.get("/accounts/:accountId", async (req, res) => {
  const accountDAO = new AccountDAODatabase();
  const getAccount = new GetAccount(accountDAO);
  try {
    const output = await getAccount.execute(req.params);
    res.status(200).json(output);
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
});

http.listen(3000, () => {
  console.log("Server running");
});
