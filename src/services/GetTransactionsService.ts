// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository}  from "typeorm";
import Transaction from "../models/Transaction";
import TransactionRepository, { Balance } from '../repositories/TransactionsRepository'

interface Return{
  transactions : Transaction[],
  balance : Balance
}

class GetTransactionsService {
  public async execute(): Promise<Return> {
    const transactionRepository = getCustomRepository(TransactionRepository)
    const transactions = await transactionRepository.find()
    const balance = await transactionRepository.getBalance()
    return {
      transactions,
      balance
    }
  }
}

export default GetTransactionsService;
