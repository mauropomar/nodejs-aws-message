
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### API addresses SMS Lamba(POST)
```sh
http://127.0.0.1:3002/api/v1/message/sendMessage
```
``exmaple parameters
``
    "originationNumber":"xxxxxxxx",
    "destinationNumber":"xxxxxxxxx",
    "attributes":"[{'name':'xxxx', value: 'xxxxx'}, {'name':'xxx', value: 'xxxx-xx-xx'}]"  
``

### API addresses SMS Rest(POST)
```sh
http://127.0.0.1:3002/api/v1/sms
```
``exmaple parameters
``
   "projectId": "xxxxx", 
	"phoneNumber": "+xxxxxx", 
	"smsTemplateId": "xxx_xx_xxxxx", 
	"attributes": {
		"code": "xxxxx",
		"date_time": "xxxx-xx-xx"
	}
``

### API addresses Email Lamba(POST)
```sh
http://127.0.0.1:3002/api/v1/message/sendEmail
```
``exmaple parameters
``
   "fromAddress":"xxxxxxx@gmail.com",
    "toAddress":"xxxxx@gmail.com",
    "attributes":"[{'name':'xxxx', value: 'xxxx'}, {'name':'xxxx', value: 'xxxxx@gmail.com'}, {'name':'xxxx', value: 'http://xxxx.xxx.com'}]"
``

### API addresses Email Rest(POST)
```sh
http://127.0.0.1:3002/api/v1/email
```
``exmaple parameters
``
   	"projectId": "xxxxxxxxxxxxx", 
	"fromAddress": "xxxx@gmail.com", 
	"toAddress": ["xxxx@gmail.com"], 
	"emailTemplateId": "xxx_xxxx_xxxx", 
	"attributes": {
		"person_name": "xxxxxx",
		"person_email": "xxxxxx@gmail",
		"email_body": "Esta es una prueba de email",
		"url_action": "https://www.xxxx.com"
	}
``

### Enviroment Variables

PORT=XXXX
PINPOINT_PROJECT_ID=xxxxx
AWS_ACCESS_KEY_ID=xxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxx
USERNAME_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
PASSWORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
CSRF_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWKS_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
URL_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx




