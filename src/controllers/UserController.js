// import bcrypt from "bcryptjs/dist/bcrypt.js";
import UserService from "../Services/UserService.js"

class UserController{
    static async getAllUsers(_req, res){
        try {
            const result = await UserService.getUsers()
            res.status(200).json(result)
        } catch (error) {
            throw error
        }
    }

    static async createUser(req, res, next) {
        const { nom, mot_de_pass, role, email } = req.body;
        try {
            await UserService.createUser(nom, mot_de_pass, role, email);
            res.status(201).json({message:"user has been created"});
        } catch (error) {
            throw error
        }
        next();
    }

    static async updateUser(req, res, next) {
        const id = Number(req.params.id);
        if(id){
            const { nom, mot_de_pass, role, email } = req.body;
            try {
                await UserService.updateUser(id, nom, mot_de_pass, role, email)
                res.status(201).json({message:"user has been updated"});
            } catch (error) {
                res.status(400).json({message: error.message})
            }
        }
        next()
    }

    static async deleteUser(req, res, next) {
        const {id} = req.params; 
        try {
            const deletedUser = await UserService.deleteUser(parseInt(id));
            res.status(200).json({ message: 'user has been deleted', user: deletedUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default UserController