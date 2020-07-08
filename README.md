# React Passport Authentication Secrete Box

This app is an Authentication system built by React, Redux, Redux-Saga, Passport js and MongoDB.
User can sign up an account or use Google and Facebook Oauth to log in and reveal the secret page.

## Installation

Since this app has both client side and server side code, to install, run

```bash
npm run install-all
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

## License

[MIT](https://choosealicense.com/licenses/mit/)
