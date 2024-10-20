import SupplierService from "../Services/SupplierService.js"

class SupplierController{

    static async getSuppliers(_req, res){
        try {
            const resutl = await SupplierService.getSuppliers()
            res.status(200).json(resutl)
            
        } catch (error) {
            console.log(error.message);
        }
    }

    static async createSupplier(req, res, next){
        try {
            const {nom} = req.body
            await SupplierService.createSupplier(nom)
            res.status(201).json({message:"supplier has been created"})
            
        } catch (error) {
            console.log(error.message);
        }
        next()
    }

    static async updateSupplier(req, res, next) {
        const id = Number(req.params.id);
        if(id){
            const { nom } = req.body;
            try {
                await SupplierService.updateSupplier(id, nom)
                res.status(201).json({message:"supplier has been updated"});
            } catch (error) {
                res.status(400).json({message: error.message})
            }
        }else{
            res.status(400).json({message:"Invalid id"})
        }
        next()
    }

    static async deleteSupplier(req, res, next) {
        const {id} = req.params; 
        try {
            const deletedSupplier = await SupplierService.deleteSupplier(parseInt(id));
            res.status(200).json({ message: 'supplier has been deleted', supplier: deletedSupplier });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }

    
}
export default SupplierController