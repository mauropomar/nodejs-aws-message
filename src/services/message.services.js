import AWS from 'aws-sdk';

export const getEmailTemplateResponse = () => {
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  const pinpoint = new AWS.Pinpoint();
  const params = {
    TemplateName: 'weppa_email_template',
  };

  return new Promise((resolve, reject) => {
    pinpoint.getEmailTemplate(params, (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(data.EmailTemplateResponse)
      }
    })
  });
}

export const getSMSTemplateResponse = () => {
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  const pinpoint = new AWS.Pinpoint();
  const params = {
    TemplateName: 'weppa_sms_template',
  };

  return new Promise((resolve, reject) => {
    pinpoint.getSmsTemplate(params, (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(data.SMSTemplateResponse)
      }
    })
  });
}

export const extractCustomAttributes = (templateBody) => {
  const regex = /{{([^{}]*)}}/g; // Expresión regular para encontrar contenido entre {{ y }}
  const matches = templateBody.match(regex);
  if (matches) {
    return matches.map(match => match.substring(2, match.length - 2)); // Elimina los corchetes
  } else {
    return [];
  }
}

export const getTemplateWithSubtitutions = (atributesBody, atributesTemplate, body) => {
  atributesBody.map((item) => {
    const nameAttr = `Attributes.${item.name}`;
    const attr = atributesTemplate.find(a => a === nameAttr);
    if (attr) {
      body = body.replace(`{{${attr}}}`, item.value);
    }
  })
  return body;
}

