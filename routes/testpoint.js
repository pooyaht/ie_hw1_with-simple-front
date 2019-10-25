const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
 
const inside = require('point-in-polygon');

const file = path.join(rootDir,'polygons.json');

const fs = require('fs');

router.get('/testpoint', (req, res, next) => {
  res.render('testpoint');
});
router.post('/testpoint', (req, res, next) => {
  let coordinates=req.body.coordinates.split(' ')
  const myPromise = new Promise((resolve,reject)=>{
  fs.readFile(file,(err,content)=>{
      if(!err){
       let polygonsname=[];
       let polygons = JSON.parse(content);
       //console.log(polygons);
       polygons.forEach(element => {
         if(inside(coordinates,element.features[0].geometry.coordinates[0])){
            polygonsname.push(element.features[0].properties.name);
          }
       });
       resolve(polygonsname)
      }
      else{
       resolve('add a polygon first!')
      }
    })
  })
  myPromise.then(value=>{
    getArray(value);
  })
  function getArray(array){
    res.render('testpoint',{list : array });
  }
});
module.exports = router;
