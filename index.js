const express = require('express');
const connectDB = require('./services/db');
const app = express();

app.use(express.json());
app.use('/api/users', require('./routes/userRoute'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('internal server error');
});

connectDB().then(() => {
  console.log('Connected to DB');
}).catch(err => {
  console.error('Unable to connect to DB', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
