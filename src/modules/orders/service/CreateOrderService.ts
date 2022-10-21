import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
    quantity: number;
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customerRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError('Não foi encontrado um usuario com o mesmo id');
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Naõ foi encontrado um product id ');
        }

        const existsProductsIds = existsProducts.map((product) => product.id);

        const checkInexistentProducts = products.filter(
            (product) => !existsProductsIds.includes(product.id),
        );

        if (!checkInexistentProducts.length) {
            throw new AppError(`Naõ foi encontrado um product id ${checkInexistentProducts[0].id}`);
        }
    }
}

export default CreateOrderService;
