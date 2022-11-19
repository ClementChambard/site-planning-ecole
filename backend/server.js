const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.DB_URL;
;(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${url}`)
  } catch (err) {
    console.error(err)
  }
})();

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const rdvsRouter = require('./routes/rdvs');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/rdvs', rdvsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
