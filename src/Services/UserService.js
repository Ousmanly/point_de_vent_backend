import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwt.js';
import prisma from "../config/prisma.js";
class UserService{
    
    static async getUsers(){
        try {
            const users = await prisma.utilisateurs.findMany()
            return users;
        } catch (error) {
            throw error
        }
    }
    static async createUser(nom, mot_de_pass, role, email ) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(mot_de_pass, salt);
            const newUser = await prisma.utilisateurs.create({
                data: {
                    nom:nom,
                    mot_de_pass:hashedPassword,
                    role:role,
                    email:email,
                }
            });
            return newUser;
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, nom, mot_de_pass, role, email) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(mot_de_pass, salt);

            let user = null
            const check = await prisma.utilisateurs.findFirst({where: {id}})

            if(check){
                user = await prisma.utilisateurs.update({where: {
                id: id,
            }, 
            data:{
                nom: nom, 
                mot_de_pass: hashedPassword, 
                role: role, 
                email: email
            }})
            }
            return user
    
            } catch (error) {
                throw error
            }
        }

        static async deleteUser(id) {
            try {
                const user = await prisma.utilisateurs.delete({
                    where: { id: id },
                });
                return user;
            } catch (error) {
                throw error;
            }
        }

    static async authenticate(email, mot_de_pass){
        try {
            const user = await prisma.utilisateurs.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            const isMatch = await bcrypt.compare(mot_de_pass, user.mot_de_pass);

            if (!isMatch) {
                throw new Error('Mot de passe incorrect');
            }

            const token = jwt.sign(
                { id: user.id, nom: user.nom, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRATION }
            );

            return { token, user };
        } catch (error) {
            throw error;
        }
    }
   
}
export default UserService