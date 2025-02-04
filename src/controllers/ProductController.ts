import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Logger } from "../decorators/Logger";

export class ProductController {

    @Logger
    static async getAllProducts(req: Request, res: Response) {
        try {
            const productos = await Product.find();
            res.json(productos);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    @Logger
    static async createProduct(req: Request, res: Response) {
        try {
            if (req.statusCode === 400) return res.status(400);
            const nuevoProducto = new Product(req.body);
            await nuevoProducto.save();
            return res.status(201).json(nuevoProducto);

        } catch (error) {
        }
    }

    @Logger
    static async updateProduct(req: Request, res: Response) {
        try {
            if (req.statusCode === 400) return res.status(400);
            const producto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
            return res.json(producto);
        } catch (error) {
        }
    }

    @Logger
    static async deleteProduct(req: Request, res: Response) {
        try {
            if (req.statusCode === 400) return res.status(400);
            const producto = await Product.findByIdAndDelete(req.params.id);
            if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
            return res.json({ message: "Producto eliminado" });
        } catch (error) {
        }
    }
}
