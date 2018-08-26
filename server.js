const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const server = http.createServer(app);
const cors = require('cors');
var theDictionary = {};
app.use(cors())

// Depending on your own needs, this can be extended
app.use(bodyParser.json({ limit: '50mb', extended: true })); // working mostly in our case
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

//read file start
fs.readFile('./dist/words_dictionary.json','utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    theDictionary = JSON.parse(data);
});


// read file stop
server.listen(3000, function(aa, bb){
  console.log('these after hours got me charged')
});

// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.get('*', (req, res) => {
  
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    
    res.sendFile(path.resolve(`dist/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/index.html'));
  }
});

app.post('/forhelp', (req, res) => {
  

  if(req.body.searchTerm){

    try{

      var thisSearchTerm = req.body.searchTerm;
      var finalWordsArr = [];
      var possibleWords = permutatorAndCombiner(thisSearchTerm.split('')).map(function(str){return str.join('')});      
      var possibleWordsArr = possibleWords;
      if(possibleWordsArr.length > 0) {

          possibleWordsArr = possibleWords.filter((word)=>{
          if(word.length > 2){
              return word;
            }
            else{
              return false;
            }    
        })
        if(possibleWordsArr.length > 0){
          possibleWordsArr.forEach(  (finalWordTest) => {
            if(theDictionary.hasOwnProperty(finalWordTest.toLowerCase())){
              finalWordsArr.push(finalWordTest);
            }
          } );
          if(finalWordsArr.length == 0){
            throw 'The Server Could Not Match Any Useful Words made from these letters to the Dictionary';
          }
        }
        else{
          throw 'The Server Could Not Match Any Useful Words made from these letters to the Dictionary';
        }        
      }
      else{
        throw 'The Server Could Not Make Any Valid Combinations!';
      }      
    }
    catch(err){

      return res.json({
        success: false,
        message: err
      });
    }
    return res.json({
      success: true,
      data: finalWordsArr,
      message: 'Got Something'
    });    
  }
  else{
    return res.json({
      success: false,
      message: 'Improper Search Term'
    });
  }  
});
    
function permutatorAndCombiner(leaves){
  
  var wordsArr = [];   
  var validWordsArr = [];
    if( leaves.length == 1 ) return leaves;       
    for( var k in leaves ) {

        var leaf = leaves[k];
        permutatorAndCombiner(leaves.join('').replace(leaf,'').split('')).concat("").map(function(subtree) {
            wordsArr.push([leaf].concat(subtree));
        });
    }    
    return wordsArr;
}
