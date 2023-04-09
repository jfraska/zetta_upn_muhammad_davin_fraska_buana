const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const bookPurchasing = require('./routes/book_purchasing') 

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name !== 'user' || user.pass !== 'user') {
    res.set('WWW-Authenticate', 'Basic realm="Bookstore"');
    res.status(401).send('Authentication required.');
    return;
  }
  next();
});

app.use(bookPurchasing)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});