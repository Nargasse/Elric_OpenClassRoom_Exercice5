const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

const sauceRoutes = require('./routes/sauce');
const authRoutes = require('./routes/auth');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

mongoose.connect('mongodb+srv://PiliPili:wF2UFS88v4@cluster0.cicb5.mongodb.net/Piquante?retryWrites=true&w=majority', //On se connecte à mangoDB via le plugin mangoose
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());

app.use((request, response, next) => { //On contrôle les autorisations CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;