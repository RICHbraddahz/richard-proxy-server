require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

let getService = (route) => {
  return (req, res) => {
    axios.get(`http://127.0.0.1:${route}${req.originalUrl}`)
      .then(moduleRes => moduleRes.data)
      .then((data) => {
        // console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send();
      });
    }
}


app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/descriptions', getService(3001));

app.listen(port, () => console.log(`server running at: http://localhost:${port}`));