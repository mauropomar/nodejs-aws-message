
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
    "projectId": "xxxxxxx", 
	"phoneNumber": "+xxxxxx", 
	"smsTemplateId": "xxxx_xxx_xxxx", 
	"attributes": {
		"Attributes.code": "xxxxxx",
		"Attributes.date_time":"xxxx-xx-xx"
	}
``

### API addresses SMS Rest(POST)
```sh
http://127.0.0.1:3002/api/v1/sms
```
``exmaple parameters
``
   "projectId": "xxxxxxx", 
	"phoneNumber": "+xxxxxx", 
	"smsTemplateId": "xxxx_xxx_xxxx", 
	"attributes": {
		"Attributes.code": "xxxxxx",
		"Attributes.date_time":"xxxx-xx-xx"
	}
``

### API addresses Email Lamba(POST)
```sh
http://127.0.0.1:3002/api/v1/message/sendEmail
```
``exmaple parameters
``
   "projectId": "xxxxxxxxxxxxxxxxxx", 
	"fromAddress": "xxxx@gmail.com", 
	"toAddress": ["xxxxx@gmail.com"], 
	"emailTemplateId": "xxxx_xxxx_xxxxx", 
	"attributes": {
		"Attributes.name": "xxxxxxx",
		"Attributes.email": "xxxxx@gmail",
		"Attributes.body": "Esta es una prueba de email",
		"Attributes.url_action": "https://www.google.com"
	}
``


### API addresses Email Rest(POST)
```sh
http://127.0.0.1:3002/api/v1/email
```
``exmaple parameters
``
   "projectId": "xxxxxxxxxxxxxxxxxx", 
	"fromAddress": "xxxx@gmail.com", 
	"toAddress": ["xxxxx@gmail.com"], 
	"emailTemplateId": "xxxx_xxxx_xxxxx", 
	"attributes": {
		"Attributes.name": "xxxxxxx",
		"Attributes.email": "xxxxx@gmail",
		"Attributes.body": "Esta es una prueba de email",
		"Attributes.url_action": "https://www.google.com"
	}
``


### Enviroment Variables

PORT=XXXX
REGION=xxxx
PINPOINT_PROJECT_ID=xxxxx
AWS_ACCESS_KEY_ID=xxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxx
USERNAME_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
PASSWORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
CSRF_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWKS_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
URL_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx




