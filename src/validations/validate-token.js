import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
    jwksUri: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wxQg0L0CP/.well-known/jwks.json' // URL de JWKS de Amazon Cognito
  });

export function verifyToken(token, callback) {
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
  export function validateToken(req, res, next) {
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