import { SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { getSMSTemplateResponse} from "../services/sms.services.js";
import {extractCustomAttributes,  getTemplateWithSubtitutions, formatSubstitutions} from "../classes/util.js";
import { pinClient } from "../libs/pinClient.js";

export const sendMessage = async (req, res) => {
    const template = await getSMSTemplateResponse();
    const atributesTemplate = extractCustomAttributes(template.Body);
    const attributesBody = eval(req.body.attributes);
    const message =  getTemplateWithSubtitutions(attributesBody, atributesTemplate, template.Body);
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
        res.json({ message: 'Mensaje enviado satisfactoriamente', success: true, data});
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
}

export const sendSmsRest = async (req, res) => {
    const pinpoint = new AWS.Pinpoint();

    // Parámetros de entrada
    const body = JSON.parse(req.body);
    const { projectId, phoneNumber, smsTemplateId, attributes } = body;

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
            'Substitutions': attributes ? formatSubstitutions(attributes) : undefined
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
        console.log('SMS enviado con éxito: ', result);
        const responseBody = { message: "SMS enviado con éxito.", status: result };
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        console.error('Error al enviar el SMS: ', error);
        const responseBody = { message: error.message || "Error desconocido al enviar el SMS.", statusCode: error.statusCode || 400 };
        return {
            statusCode: error.statusCode || 400,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(responseBody)
        };
    }
}
