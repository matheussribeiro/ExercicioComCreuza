import Transaction from '../models/Transaction';
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import {getRepository} from 'typeorm'
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(): Promise<any[]> {

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
    const transactions= []
    for(var i=0 ; data.length>i ; i++){
      const currentTransaction = data[i]
        let transaction = {
          title:currentTransaction[0],
          type:currentTransaction[1],
          value:currentTransaction[2],
          category:currentTransaction[3]
        }
        const {title,type,value,category} = transaction
        const createTransaction = new CreateTransactionService()
        await createTransaction.execute({title,type,value,category})
        transactions.push(transaction);
    }
    console.log(transactions)
    return transactions;
  }
}

export default ImportTransactionsService;
