const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const file = path.join(rootDir,'polygons.json');

const fs = require('fs');

const _ = require('underscore')

let polygons = [];

router.get('/add-polygon', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-polygon.html'));
});

router.post('/add-polygon', (req, res, next) => {
  fs.readFile(file,(err, content)=>{
   const data = JSON.parse(req.body.title);
    if(!err){
      polygons = JSON.parse(content);
    }
    polygons.push(data);
    polygons = _.uniq(polygons,(object)=>{
        let temp = object.features[0].geometry.coordinates[0];
        return JSON.stringify(temp)   
    } )
    //console.log(polygons);
    fs.writeFile(file,JSON.stringify(polygons),()=>{})
  })
  res.redirect('/');
});
module.exports.router = router;
