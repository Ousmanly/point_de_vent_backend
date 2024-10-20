// import UserService from '../services/UserService.js';
import UserService from "../Services/UserService.js";


class AuthController {
    static async login(req, res) {
        const { email, mot_de_pass } = req.body;
        try {
            const { token, user } = await UserService.authenticate(email, mot_de_pass);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;
