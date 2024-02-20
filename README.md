![5166961](https://github.com/Jvcgoncalves/stock-manager/assets/127047416/897f5f89-f37c-4400-bb07-a8e0054ea636)

# Stock Manager

Backend about my stock manager project, this codes is how i link the database and the frontend responses to users. 

### Extra info 

It was my first project working with backend and i learnig at the same time that i was doing, so i read a lot of docs, see a lot of videos about and search in stackoverflow, so i ask if you have any feedback/sugestions contact me. My email will be at the link section

## Techs

- ExpressJS
- NodeJS
- Npm
- Git
- Jest
- Jwt -> Authentication

## Services Used

- Github
- Vercel
- Firebase firestore -> database

## How to use

### 1 - Fisrt you need to create an acount, database and auth on firebase, after that you need to go to project config and set your service key.
#### 1.1 - you can follow the docs from firebase to get it, after you get your service key you key paste at your directory files or at environment variables on site that you used to deploy. In both of then you service key will be saved like this json
↓ ↓ ↓ ↓ ↓

{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}

##### 1.1.1 - If you save like environment variables you need to treat the same way that i
##### 1.1.2 - Else you can let this way ↓ ↓ ↓ ↓ ↓

...
import { service_key } from "./serviceAccoutKey.js";

admin.initializeApp({
  credential: admin.credential.cert(service_key),
});
...

##### 1.1.2 - ... You  need to save like the obeject that a show above IF you wanna to deploy this site, if you just wan't to use in your machine you just need to save the json that firebase gives to your and put like this ↓ ↓ ↓ ↓ ↓

admin.initializeApp({
  credential: admin.credential.cert("PATH TO YOUR JSON FILE WITH KEY"),
});

## Authors

- **João Vitor Gonçalves da Costa**

Please follow github and linkdin (link in my profile )!
Thanks to visiting me and good coding!
