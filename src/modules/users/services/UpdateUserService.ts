import AppError from '@src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

class UpdateProductService {
    public async execute({ id, name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('Produto não encontrado');
        }

        const usersExists = await usersRepository.findOne(name);

        if (usersExists) {
            throw new AppError('Já existe um usuario com este nome');
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProductService;
