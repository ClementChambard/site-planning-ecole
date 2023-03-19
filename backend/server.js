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

const elevesRouter = require('./routes/eleves');
const rdvsRouter = require('./routes/rdvs');
const rollerRouter = require('./routes/roller');

app.use('/eleves', elevesRouter);
app.use('/rdvs', rdvsRouter);
app.use('/roller', rollerRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
