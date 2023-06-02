<img src="https://github.com/JackDMoore/Brainiac-Brigade/assets/17050237/724f118b-6034-4f85-a1da-f7e389097848" width="100" height="100">

# Brainiac-Brigade Procrastination App

Crammar Education have tasked the Brainiac-Brigade with creating an app to add to their education portfolio to support students with revision.

[API](https://brainiac-api.onrender.com/) | [CLIENT](https://brainiac-brigade.onrender.com/)

## Installation

If you want to run the app in your local machine:

Clone the repo
```bash
git clone git@github.com:JackDMoore/Brainiac-Brigade.git

# cd inside the repo folder
cd Brainiac-Brigade
```

### Server
To install the server packages

```bash
# from the repo root 
# cd inside the api folder
cd api

# install packages
npm install
```

Create a .env file in the api root folder
```bash
touch .env

# You need to add the following enviroment variables to the .env file:

  # MongoDB URI (please create and add your own MongoDB URI)
  MONGODB_URI: mongodb+srv://username:password@host:port/database?options...

  # PORT
  PORT = 3000

  # SECRET for JasonWebToken
  SECRET = "your secret"
```
### Client
To install the server packages

```bash
# from the repo root 
# cd inside the client folder
cd client

# install packages
npm install
```

## How to start

### Start api server
```bash
# from the api folder
npm run dev
```
You should see something like this in your terminal:

![image](https://github.com/JackDMoore/Brainiac-Brigade/assets/17050237/89c53313-a3e0-4c8e-ac92-5a525687150f)


### Start client server
```bash
# from the client folder
npm run dev
```
You should see something like this in your terminal:

![image](https://github.com/JackDMoore/Brainiac-Brigade/assets/17050237/c63851fd-ee17-4e1d-8e04-695ce53aa203)

## Technologies used

- HTML
- CSS
- React
- [React calendar library](https://www.npmjs.com/package/react-calendar)
- JS
- Node
- Vite
- MongoDB

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

