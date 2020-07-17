# React Passport Authentication Secrete Box

This app is an Authentication system built by React, Redux-Saga, PassportJS and MongoDB.
User can register an account and use the email and password to log in or use Google or Facebook Oauth to log in and reveal the secret page. All user credentials will be stored at MongoDB Atlas, including the google id and facebook id that come with the oauth response. Authorized users can have persist login using express session. The structure of this app is set up using Redux-Saga. It can easily be set as the starting point for a large React project that needs to have a system to manage users.

## Installation

Since this app has both client side and server side code, to install, run

```bash
npm run install-all
```

## Usage

Instead of npm start, use npm run dev to run the app locally

```bash
npm run dev
```

## Configuration

To run the app locally with full funtionality, you need to configure the following environment variable. The Best way is to use Dotenv module and create a .env file to configure these variables.

```bash
#the uri to connect to a mongodb database
MONGO_URI

#the google id and secret for google OAuth 2.0 from your own google cloud platform
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

#the facbook id and secret for facebook OAuth from your own facebook cloud platform
FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET

#set the session secret for the authentication as you like
SESSION_SECRET
```

You should also set the callback url in both google and facebook cloud platform, for example

```bash
your_domain/google/callback
your_domain/facebook/callback
```

In route/api/oauth.js file, change the redirect url to

```bash
your_domain/secrets
```

In case you run client code (for example localhost 3000) and server code in different port, in server.js add

```javascript
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
```

In client/src/component/pages/sign-in-page/sign-in.component.js, change the widows.open url to

```bash
your_domain/oauth/google
your_domain/oauth/facebook
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
