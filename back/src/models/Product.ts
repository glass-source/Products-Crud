import { Schema, model } from "mongoose";

export interface IProduct {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}

const productSchema = new Schema<IProduct>({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [1, 'El nombre no puede estar vacío'] 
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'] 
    },
    precio: {
        type: Number,
        required: true,
        min: [0.01, 'El precio debe ser mayor a 0'] 
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    }
});

export const Product = model<IProduct>("Product", productSchema);