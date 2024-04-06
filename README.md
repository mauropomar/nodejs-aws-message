
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
    "attributes":"[{'name':'xxxx', value: 'xxxxx'}, {'name':'xxx', value: 'xxxx-xx-xx'}]"  
``

### API addresses
```sh
http://127.0.0.1:3002/api/message/sendEmail
```
``exmaple parameters
``
   "fromAddress":"xxxxxxx@gmail.com",
    "toAddress":"xxxxx@gmail.com",
    "attributes":"[{'name':'xxxx', value: 'xxxx'}, {'name':'xxxx', value: 'xxxxx@gmail.com'}, {'name':'xxxx', value: 'http://xxxx.xxx.com'}]"
``