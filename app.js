const express = require('express');
const mongoose = require('mongoose');
const Profile = require('./Profile');
const app = express();

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlPArser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('connected to Database Successfully');
});

// creating and saving one record
app.get('/add', (req, res) => {
  const profile = new Profile({
    name: 'Uche Omodu',
    age: 21,
    favoriteFoods: ['rice', 'beans', 'spag'],
  });
  profile
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//creating and saving multiple records
app.get('/multiple-users', (req, res) => {
  const multipleUsers = Profile.create([
    {
      name: 'Michael Koko',
      age: 27,
      favoriteFoods: ['eba', 'beans', 'rice'],
    },
    {
      name: 'Uche Omodu',
      age: 21,
      favoriteFoods: ['beans', 'Fried rice', 'Amala'],
    },
    {
      name: 'Uche Omodu',
      age: 29,
      favoriteFoods: ['Jollof Rice', 'beans', 'spag'],
    },
  ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//searching by id
app.get('/searchById', (req, res) => {
  Profile.findById('61cc2cec8c2ds8n6sjd8e4a77')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get('/search-one', (req, res) => {
  Profile.findOne({ name: 'Uche Omodu' })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//search by Food
app.get('/searchbyfood', (req, res) => {
  Profile.updateOne(
    { name: 'Uche Omodu' },
    { $addToSet: { favoriteFoods: 'Jollof rice' } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get('/updateAge', (req, res) => {
  Profile.updateOne({ name: 'Uche Omodu' }, { $set: { age: 25 } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//delete one item by id
app.get('/deleteOne', (req, res) => {
  Profile.findByIdAndRemove({ _id: '61cc6227ab4f637b57df513d' })

    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//delete more than one item by name
app.get('/deleteOne', (req, res) => {
  Profile.remove({ name: 'Uche Omodu' })

    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Query
app.get('qhelper', (req, res) => {
  Profile.find({
    name: 'Uche Omodu',
  })
    .where('age')
    .gt(15)
    .lt(10)
    .where('favoriteFoods')
    .in(['spag', 'rice'])
    .limit(3)
    .sort('-timestamps')
    .select('name occupation')
    .exec(callback);
});
