/*******************************************************************************
* Author:      Zeeshan Ahmed Nizamani
* Created:     2016, June 02
* Desciption:
*              Nodejs script to modify the feature vectors of IMDb database
*              training and testing vectors for C++ implementation of
*              SVM based classifier .
*
********************************************************************************/
var fs = require('fs');
//Original IMDb training and testing feature vectors files
//Paths should be changed appropriately when executing the scipt on another system
var originalTrainingFilePath = "/home/shan/projects/webIntell/aclImdb_v1/classifier/svm_perf/data/aclImdb/train/labeledBow.feat";
var originalTestingFilePath = "/home/shan/projects/webIntell/aclImdb_v1/classifier/svm_perf/data/aclImdb/test/labeledBow.feat";
//Modified IMDb training and testing feature vectors files
var trainingVectorsFilePath = "/home/shan/projects/webIntell/aclImdb_v1/classifier/svm_perf/data/trainfeaturevectors.dat";
var testingVectorsFilePath = "/home/shan/projects/webIntell/aclImdb_v1/classifier/svm_perf/data/testfeaturevectors.dat";


//CHANGE TO FALSE TO GENERATE TEST FEATURE VECTORS
var generateTraining = false;

var originalFilePath, featuresFilePath;
if(generateTraining == true){
  console.log("generating training file");
  originalFilePath = originalTrainingFilePath;
  featuresFilePath = trainingVectorsFilePath;
}else{
  console.log("generating testing file");
  originalFilePath = originalTestingFilePath;
  featuresFilePath = testingVectorsFilePath;
}

var labelStream = fs.createWriteStream(featuresFilePath, {'flags': 'w'});

function modifyFeatureVectors(){
  fs.readFile(originalFilePath, {encoding: 'utf-8'}, function(err, rows){
      if (err){
          console.log(err);
      }
      var featureVector = "";
      var rating, firstTime=true;
      var comments = rows.split('\n');

      for (var i = 0; i < (comments.length-1); i++) {
        featureVector = comments[i].split(' ');
        rating = (+featureVector[0]>5)? "+1 ":"-1 ";
        featureVector = featureVector.splice(2).join(' ')
        if(firstTime == true){
          firstTime=false;
          appendFile(rating + featureVector);
          continue;
        }
        appendFile("\n"+rating + featureVector);
      }
  });
}

function appendFile(txt){
  labelStream.write(txt);
}

//start modification
modifyFeatureVectors();
