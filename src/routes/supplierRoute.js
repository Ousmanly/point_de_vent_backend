import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import SupplierController from "../controllers/SupplierController.js";
import { addRequestSupplierValidator, deleteSupplierValidatore, updateSupplierValidatore } from "../validators/supplierValidator.js";

const supplierRoute = express.Router()

supplierRoute.get('/suppliers',authMiddleware, SupplierController.getSuppliers)
supplierRoute.post('/suppliers', addRequestSupplierValidator, SupplierController.createSupplier)
supplierRoute.put('/suppliers/:id',updateSupplierValidatore, authMiddleware, SupplierController.updateSupplier)
supplierRoute.delete('/suppliers/:id',deleteSupplierValidatore, authMiddleware, SupplierController.deleteSupplier)

export default supplierRoute