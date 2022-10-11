import AppError from '@src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('Produto não encontrado');
        }

        await usersRepository.delete(user);
    }
}

export default DeleteUserService;
