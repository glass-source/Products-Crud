import express from 'express';
import * as expressValidator from 'express-validator';
const { body, validationResult, query } = expressValidator;
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

interface RequestWithParamsAndBody extends express.Request {
    body: {
        nombre: string;
        descripcion: string;
        precio: number;
        stock: number;
    };
}

// Validaciones comunes
const validateProduct = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 1 }).withMessage('El nombre no puede estar vacío'),
    body('descripcion')
        .trim()
        .isLength({ min: 10 }).withMessage('Mínimo 10 caracteres'),
    body('precio')
        .isFloat({ gt: 0 }).isNumeric().withMessage('Debe ser un número mayor a 0'),
    body('stock')
        .isInt({ min: 0 }).withMessage('No puede ser negativo')
];

// Middleware de manejo de errores
const handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rutas actualizadas con validaciones
router.get("/", [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 })
], ProductController.getAllProducts);

router.post("/", authMiddleware, validateProduct, (req: RequestWithParamsAndBody, res: express.Response, next: express.NextFunction) => {
    handleValidationErrors(req, res, next);
    ProductController.createProduct(req, res);
});

router.put("/:id", authMiddleware, validateProduct, (req: RequestWithParamsAndBody, res: express.Response, next: express.NextFunction) => {
    handleValidationErrors(req, res, next);
    ProductController.updateProduct(req, res);
});

router.delete("/:id", authMiddleware, validateProduct, (req: RequestWithParamsAndBody, res: express.Response, next: express.NextFunction) => {
    handleValidationErrors(req, res, next);
    ProductController.deleteProduct(req, res);
});

export { router as productRouter };