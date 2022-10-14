import AppError from '@src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const costumersRepository = getCustomRepository(CustomersRepository);

        const customer = await costumersRepository.findById(id);

        if (!customer) {
            throw new AppError('costumer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
