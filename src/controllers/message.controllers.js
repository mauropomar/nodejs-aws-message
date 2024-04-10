import { SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { getSMSTemplateResponse, getEmailTemplateResponse } from "../services/message.services.js";
import { extractCustomAttributes, getTemplateWithSubtitutionsLamba } from "../classes/util.js";
import { pinClient } from "../libs/pinClient.js";

export const sendMessage = async (req, res) => {
    const template = await getSMSTemplateResponse();
    const atributesTemplate = extractCustomAttributes(template.Body);
    const attributesBody = eval(req.body.attributes);
    const message = getTemplateWithSubtitutionsLamba(attributesBody, atributesTemplate, template.Body);
    const originationNumber = req.body.originationNumber;
    const destinationNumber = req.body.destinationNumber;
    const projectId = process.env.PINPOINT_PROJECT_ID;
    const messageType = "TRANSACTIONAL";
    const registeredKeyword = "myKeyword";
    const senderId = "MySenderID";
    const params = {
        ApplicationId: projectId,
        MessageRequest: {
            Addresses: {
                [destinationNumber]: {
                    ChannelType: "SMS",
                },
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: message,
                    Keyword: registeredKeyword,
                    MessageType: messageType,
                    OriginationNumber: originationNumber,
                    SenderId: senderId,
                },
            },
        },
    };

    try {
        const data = await pinClient.send(new SendMessagesCommand(params));
        res.json({ message: 'Mensaje enviado satisfactoriamente', success: true, data });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
}

export const sendEmail = async (req, res) => {
    const template = await getEmailTemplateResponse();
    const atributesTemplate = extractCustomAttributes(template.HtmlPart);
    const attributesBody = eval(req.body.attributes);
    const bodyHtml = getTemplateWithSubtitutionsLamba(attributesBody, atributesTemplate, template.HtmlPart);
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
    try {
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