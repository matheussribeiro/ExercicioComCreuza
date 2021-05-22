import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';


// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const getTransactions = new GetTransactionsService()
  const transactions =  await getTransactions.execute()
  return response.json(transactions)
});

transactionsRouter.post('/', async (request, response) => {
  const {title,value,type,category} = request.body
  if(type != 'income' && type != 'outcome')
  {
    return response.status(400).json({error :'Incorrect Type, send income or outcome'})
  }
  const createTransaction = new CreateTransactionService()
  const transaction = await createTransaction.execute({title,value,type,category})

  return response.json(transaction)
});

transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params
  const deleteTransaction = new DeleteTransactionService()
  await deleteTransaction.execute(id)

  return response.status(204).send()

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
