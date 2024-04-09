import { SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { getEmailTemplateResponse } from "../services/email.services.js";
import { extractCustomAttributes, getTemplateWithSubtitutions, formatSubstitutions } from "../classes/util.js";
import { pinClient } from "../libs/pinClient.js";

export const sendEmail = async (req, res) => {
    try {
        const template = await getEmailTemplateResponse();
        const atributesTemplate = extractCustomAttributes(template.HtmlPart);
        const attributesBody = eval(req.body.attributes);
        const bodyHtml = getTemplateWithSubtitutions(attributesBody, atributesTemplate, template.HtmlPart);
        const fromAddress = req.body.fromAddress;
        const toAddress = req.body.toAddress;
        const subject = template.Subject;
        const bodyText = template.Subject;
        const projectId = process.env.PINPOINT_PROJECT_ID;
        const charset = "UTF-8";
        const params = {
            ApplicationId: projectId,
            MessageRequest: {
                Addresses: {
                    [toAddress]: {
                        ChannelType: "EMAIL",
                    },
                },
                MessageConfiguration: {
                    EmailMessage: {
                        FromAddress: fromAddress,
                        SimpleEmail: {
                            Subject: {
                                Charset: charset,
                                Data: subject,
                            },
                            HtmlPart: {
                                Charset: charset,
                                Data: bodyHtml,
                            },
                            TextPart: {
                                Charset: charset,
                                Data: bodyText,
                            },
                        },
                    },
                },
            }
        }
        const data = await pinClient.send(new SendMessagesCommand(params));
        const {
            MessageResponse: { Result },
        } = data;
        const recipientResult = Result[toAddress];
        if (recipientResult.StatusCode !== 200) {
            throw new Error(recipientResult.StatusMessage);
        } else {
            res.json({ message: 'Correo enviado satisfactoriamente', success: true, data });
        }
    } catch (err) {
        res.json({ message: err.message, success: false });
        console.log(err.message);
    }
}

export const sendEmailRest = async (req, res) => {
    const pinpoint = new AWS.Pinpoint();

    // Parámetros de entrada
    const body = JSON.parse(req.body);
    const { projectId, fromAddress, toAddress, emailTemplateId, attributes } = body;

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
        console.log('Correo electrónico enviado con éxito: ', result);
        const responseBody = { message: "Correo electrónico enviado con éxito", status: result };
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        console.error('Error al enviar el correo electrónico: ', error);
        const responseBody = { message: error.message || "Error desconocido al enviar el correo electrónico.", statusCode: error.statusCode || 400 };
        return {
            statusCode: error.statusCode || 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
        };
    }
}