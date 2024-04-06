
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

### API addresses
```sh
http://127.0.0.1:3002/api/message/sendMessage
```
``exmaple parameters
``
    "originationNumber":"xxxxxxxx",
    "destinationNumber":"xxxxxxxxx",
    "attributes":"[{'name':'code', value: 'ABSD123'}, {'name':'date_time', value: '2024-12-18'}]"  
``

### API addresses
```sh
http://127.0.0.1:3002/api/message/sendEmail
```
``exmaple parameters
``
   "fromAddress":"xxxxxxx@gmail.com",
    "toAddress":"xxxxx@gmail.com",
    "attributes":"[{'name':'name', value: 'xxxx'}, {'name':'email', value: 'xxxxx@gmail.com'}, {'name':'url_action', value: 'http://xxxx.xxx.com'},{'name':'body', value: 'micuerpo'}]"
``