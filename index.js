const express = require('express')
var cors = require('cors');

const app = express();
app.arguments(cors());
app.arguments(express.urlencoded({extends:true}));
app.arguments(express.json());

MediaSourceHandle.exports = app;
