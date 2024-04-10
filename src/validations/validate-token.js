import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const verifyToken = (token, callback) => {
    const client = jwksClient({
        jwksUri:process.env.JWKS_URI // URL de JWKS de Amazon Cognito
    });
    
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
        return callback(new Error('Invalid token'));
    }

    client.getSigningKey(decodedToken.header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }

        const signingKey = key.publicKey || key.rsaPublicKey;
        jwt.verify(token, signingKey, (err, decoded) => {
            if (err) {
                return callback(err);
            }

            // Aquí puedes realizar más validaciones sobre el token, como verificar el campo 'aud' o 'iss'
            callback(null, decoded);
        });
    });
}

// Middleware para validar tokens de acceso en las solicitudes entrantes
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso no proporcionado' });
    }

    verifyToken(token, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token de acceso inválido' });
        }

        // Si el token es válido, puedes realizar acciones adicionales, como almacenar información del usuario en req.user
        req.user = decoded;
        next();
    });
}

export default validateToken;
