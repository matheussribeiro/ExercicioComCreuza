import Transaction from '../models/Transaction';
import {getRepository} from 'typeorm'
import Category from '../models/Category';
import AppError from '../errors/AppError';
import {uuid} from 'uuidv4'

interface Request {
  title : string,
  value : number,
  type : 'income' | 'outcome',
  category : string,
}

class CreateTransactionService {
  public async execute({title,value,type,category}:Request): Promise<Transaction> {
    console.log('CreateTransactionService',{title,value,type,category})

    const categoryRepository = getRepository(Category)

    let categoryObj = await categoryRepository.findOne({where:{title : category}})

    if(!categoryObj)
    {
      categoryObj = categoryRepository.create({
        title:category
      });
      categoryObj = await categoryRepository.save(categoryObj)
    }

    const transactionRepository = getRepository(Transaction)

    let transaction = transactionRepository.create({
      title,
      type,
      value,
      category:categoryObj,
    })

    transaction = await transactionRepository.save(transaction);
    console.log(transaction)

    return transaction
  }
}

export default CreateTransactionService;
