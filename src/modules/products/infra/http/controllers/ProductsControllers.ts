import { Request, Response } from 'express';
import ListProductService from '@modules/products/services/ListProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProductsServices = new ListProductService();
    const products = await listProductsServices.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });

    return res.status(204).send([]);
  }
}
