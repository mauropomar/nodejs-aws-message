import base64 from "base-64";

export const generateToken = async (req, res) => {
    fetch(process.env.URL_REST_TOKEN, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': 'Basic ' + base64.encode(process.env.USERNAME_TOKEN + ":" + process.env.PASSWORD_TOKEN),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'X-CSRF-Token': process.env.CSRF_TOKEN
        },
    })
        .then(response => response.json())
        .then((data) => {
            res.json({ message: 'Token generado exitosamente', success: true, token: data.access_token });
        })
        .catch((error) => {
            res.json({ message: error.message, success: true });
        });
}