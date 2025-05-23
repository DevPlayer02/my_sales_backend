import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProductService from '@modules/products/services/ListProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsControllers {
  public async index(req: Request, res: Response): Promise<void> {
    const listProductsServices = container.resolve(ListProductService)
    const products = await listProductsServices.execute();

    res.json(products);
  }

  public async show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const showProductService = container.resolve(ShowProductService)
    const product = await showProductService.execute({ id });

   res.json(product);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { name, price, quantity } = req.body;
    const createProductService = container.resolve(CreateProductService)
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

   res.json(product);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name, price, quantity } = req.body;
    const updateProductService = container.resolve(UpdateProductService)
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

   res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const deleteProductService = container.resolve(DeleteProductService)
    await deleteProductService.execute({ id });

   res.status(204).send([]);
  }
}
