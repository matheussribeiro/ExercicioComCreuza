import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';


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

  async function loadCSV(filePath: string): any[] {
    const readCSVStream = fs.createReadStream(csvFilePath);
  
    const parseStream = csvParse({ 
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });
    
    const parseCSV = readCSVStream.pipe(parseStream);
  
    const lines = [];
  
    parseCSV.on('data', line => {
      lines.push(line);
    });
    
    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });
    
    return lines;
  }
  const csvFilePath = path.resolve(__dirname,'..','..','tmp','import_template.csv');
  const data = await loadCSV(csvFilePath);
  
console.log(data);

  response.json(data)

});

export default transactionsRouter;
