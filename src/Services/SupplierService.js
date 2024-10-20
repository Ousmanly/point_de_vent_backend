import prisma from "../config/prisma.js"

class SupplierService{

    static async checkSupplierById(id) {
        try {
          const result = await prisma.Fournisseurs.findFirst({where: {id}})
          return result ? true : false;
        } catch (error) {
          throw error;
        }
    }

    static async getSuppliers(){
        try {
            const suppliers = await prisma.Fournisseurs.findMany()
            return suppliers
        } catch (error) {
            throw error
        }
    }

    static async createSupplier(nom){
        try {
            const newSupplier = await prisma.Fournisseurs.create({
                data: {
                    nom:nom
                }
            })
            return newSupplier
        } catch (error) {
            throw error
        }
    }

    static async updateSupplier(id, nom){
        try {
            let supplier = null
            const check = await prisma.Fournisseurs.findFirst({where: {id}})

            if(!check){
                throw new Error('Le fournisseur avec cet ID n\'existe pas.');
            }
            supplier = await prisma.Fournisseurs.update({where: {
                id: id,
            }, 
            data:{
                nom: nom
            }})
            return supplier
        } catch (error) {
            throw error
        }
    }
    

    static async deleteSupplier(id) {
        try {
            const supplier = await prisma.Fournisseurs.delete({
                where: { id: id },
            });
            return supplier;
        } catch (error) {
            throw error;
        }
    }

}
export default SupplierService