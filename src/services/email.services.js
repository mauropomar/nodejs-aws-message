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