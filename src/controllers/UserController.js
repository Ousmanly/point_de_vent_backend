import UserService from "../Services/UserService"

class UserController{
    static async getAllUsers(_req, res){
        const result = await UserService.getUsers()
        res.status(200).json(result)
    }
}
export default UserController