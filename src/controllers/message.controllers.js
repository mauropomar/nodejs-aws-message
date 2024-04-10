import AWS from 'aws-sdk';
import { getFormatSubstitutionsApiRest } from "../classes/util.js";

export const sendMessage = async (req, res) => {
    const pinpoint = new AWS.Pinpoint();
    // Parámetros de entrada
    const { projectId, phoneNumber, smsTemplateId, attributes } = req.body;

    // Construir los parámetros para enviar el SMS
    const params = {
        ApplicationId: projectId,
        MessageRequest: {
            'Addresses': {
                [phoneNumber]: {
                    'ChannelType': 'SMS'
                }
            },
            'MessageConfiguration': {
                'SMSMessage': {
                    'MessageType': 'TRANSACTIONAL',
                    'Substitutions': attributes ? getFormatSubstitutionsApiRest(attributes) : undefined
                }
            },
            'TemplateConfiguration': {
                'SMSTemplate': {
                    'Name': smsTemplateId,
                    'Version': 'latest'
                }
            }
        }
    };

    try {
        const result = await pinpoint.sendMessages(params).promise();
        const responseBody = { message: "SMS enviado con éxito.", status: result };
        res.json({ message: 'SMS enviado con éxito', success: true, data: JSON.stringify(responseBody) });
    } catch (error) {
        const responseBody = { message: error.message || "Error desconocido al enviar el SMS.", statusCode: error.statusCode || 400 };
        res.json({ message: error.message, success: false, data: JSON.stringify(responseBody) });
    }
}

export const sendEmail = async (req, res) => {
    const pinpoint = new AWS.Pinpoint();
    const { projectId, fromAddress, toAddress, emailTemplateId, attributes } = req.body;

    // Construir los parámetros para enviar el correo electrónico
    const params = {
        ApplicationId: projectId,
        MessageRequest: {
            'Addresses': {
                [toAddress]: {
                    'ChannelType': 'EMAIL'
                }
            },
            'MessageConfiguration': {
                'EmailMessage': {
                    'FromAddress': fromAddress,
                    'Substitutions': attributes ? getFormatSubstitutionsApiRest(attributes) : undefined
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