import prisma from "../config/prisma";
class UserService{

    static async getUsers(){
        const [users] = await prisma.utilisateurs.findMany()
        return users;
    }
}
export default UserService