import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Pas de token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas autorisé.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

export default authMiddleware;