import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const transactionIncome = transactions
    .filter(transaction => transaction.type == 'income')
    .reduce((transactionAcumulator,currentTransaction)=>{

      return {
        ...transactionAcumulator,
        value: transactionAcumulator.value + Number.parseInt(currentTransaction.value.toString())
      }
    },this.create({
      value:0
    }))

    const transactionOutcome = transactions
    .filter(transaction => transaction.type == 'outcome')
    .reduce((transactionAcumulator,currentTransaction)=>{
      console.log('acumulator:',transactionAcumulator)
      console.log('current:',currentTransaction)
      return {
        ...transactionAcumulator,
        value: transactionAcumulator.value + Number.parseInt(currentTransaction.value.toString())
      }
    },this.create({
      value:0
    }))

    return {
      income:transactionIncome.value,
      outcome:transactionOutcome.value,
      total: transactionIncome.value - transactionOutcome.value
    }
  }
}

export default TransactionsRepository;
