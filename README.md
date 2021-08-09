# S A D E C R U D

If you want live view this project, click in url: <br>
>https://sadecrud.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>
```
npx create-react-app sadecrud
cd sadecrud
npm start
```

I defined navbar using bootstrap and I added the navbar to the pages I defined. <br>
![navbar](https://user-images.githubusercontent.com/39413875/128742454-4912d466-bbd4-4234-b7cb-c3cc4dfb0dad.PNG) <br>

A form component was created where users can enter their information, again with [Bootstrap](https://getbootstrap.com/). <br>
![form](https://user-images.githubusercontent.com/39413875/128739807-84ace4ba-192e-4d4e-9c32-ae44f4940946.PNG) <br>

User table created on home page with [React Table](https://react-table.tanstack.com/). <br>
![table](https://user-images.githubusercontent.com/39413875/128740027-e730f9ce-1ea9-49b0-8364-0dbbb9d84e9d.PNG) <br>

## Scripts
I used json-server in the project so in the project directory, you can run:

```
npm run start:dev
```  

>"start": "react-scripts start" <br>

Runs the app in the development mode.\
>"json-server": "json-server --watch db.json --port 3003" <br>
> *"**start:dev**": "concurrently \"npm start\" \"npm run json-server\""*

## Json-Server
- Get all users:<br>
**GET** http://localhost:3003/users
- Create new user:<br>
**POST** http://localhost:3003/users<br> ``` body: { phone:string, email:string, name:string, surname:string } ```
- Update user:
<br>**PUT** http://localhost:3003/users/$USER_ID<br> ``` body: { id:number, phone:string, email:string, name:string, surname:string } ```
- Delete user:<br>
**DELETE** http://localhost:3003/users/$USER_ID



