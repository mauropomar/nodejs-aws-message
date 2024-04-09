import AWS from 'aws-sdk';
import { formatSubstitutions } from "../classes/util.js";

export const sendEmail = async (req, res) => {
    const pinpoint = new AWS.Pinpoint();
    const { fromAddress, toAddress, emailTemplateId, attributes } = req.body;

    // Construir los parámetros para enviar el correo electrónico
    const params = {
        ApplicationId: process.env.PINPOINT_PROJECT_ID,
        MessageRequest: {
            'Addresses': {
                [toAddress]: {
                    'ChannelType': 'EMAIL'
                }
            },
            'MessageConfiguration': {
                'EmailMessage': {
                    'FromAddress': fromAddress,
                    'Substitutions': attributes ? formatSubstitutions(attributes) : undefined
                }
            },
            'TemplateConfiguration': {
                'EmailTemplate': {
                    'Name': emailTemplateId,
                    'Version': 'latest'
                }
            }
        }
    };

    try {
        const result = await pinpoint.sendMessages(params).promise();
        const responseBody = { message: "Correo electrónico enviado con éxito", status: result };
        res.json({ message: 'Correo enviado satisfactoriamente', success: true, data: JSON.stringify(responseBody) });

    } catch (error) {
        const responseBody = { message: error.message || "Error desconocido al enviar el correo electrónico.", statusCode: error.statusCode || 400 };
        res.json({ message: error.message, success: false, data: JSON.stringify(responseBody) });
    }
}