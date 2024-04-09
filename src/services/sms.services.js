import AWS from 'aws-sdk';

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