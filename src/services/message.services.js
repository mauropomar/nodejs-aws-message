export const getBodyMessage = () => {
    const bodyHtml = `<html>
    <head></head>
    <body>
      <h1>Amazon Pinpoint Test (SDK for JavaScript in Node.js)</h1>
      <p>This email was sent with
        <a href='https://aws.amazon.com/pinpoint/'>the Amazon Pinpoint Email API</a> using the
        <a href='https://aws.amazon.com/sdk-for-node-js/'>
          AWS SDK for JavaScript in Node.js</a>.</p>
    </body>
    </html>`;
    return bodyHtml;
}

