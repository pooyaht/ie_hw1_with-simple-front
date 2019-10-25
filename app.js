const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const rootDir = require('./util/path');

app.set('view engine','pug');

app.set('views','views')

const addPolygonRoutes = require(path.join(rootDir,'routes','add-polygon'));
const testPointRoutes = require(path.join(rootDir,'routes','testpoint'));
const homeRoutes = require(path.join(rootDir,'routes','home'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(addPolygonRoutes.router);
app.use(testPointRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
