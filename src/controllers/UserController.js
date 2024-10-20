// import bcrypt from "bcryptjs/dist/bcrypt.js";
import UserService from "../Services/UserService.js"

class UserController{
    static async getAllUsers(_req, res){
        const result = await UserService.getUsers()
        res.status(201).json(result)
    }

    static async createUser(req, res) {
        const { nom, mot_de_pass, role, email } = req.body;
        try {
            await UserService.createUser(nom, mot_de_pass, role, email);
            res.status(201).json({message:"user has been created"});
        } catch (error) {
            throw error
            
        }
    }

    static async updateUser(req, res) {
        const id = Number(req.params.id);
        if(id){
            const { nom, mot_de_pass, role, email } = req.body;
            try {
                await UserService.updateUser(id, nom, mot_de_pass, role, email)
                res.status(201).json({message:"user has been update"});
            } catch (error) {
                throw error
            }
        }
    }

    static async deleteUser(req, res) {
        const {id} = req.params; 
        try {
            const deletedUser = await UserService.deleteUser(parseInt(id));
            res.status(200).json({ message: 'Utilisateur supprimé avec succès', user: deletedUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
export default UserController