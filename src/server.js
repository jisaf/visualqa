var express = require('express');
var app = express();
var BlinkDiff = require('blink-diff');
// var urlToImage = require('url-to-image');
var webshot = require('webshot');



const axios = require('axios');
const cheerio = require('cheerio');

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// var diff = new BlinkDiff({
//   imageAPath: '../images/good.png', // Use file-path
//   imageBPath: '../images/bad.png',

//   thresholdType: BlinkDiff.THRESHOLD_PERCENT,
//   threshold: 0.01, // 1% threshold

//   imageOutputPath: '../images/out.png'
// });

var urlDiff = function(invision, production, callback) {
  return webshot(invision, '../images/good.png', {renderDelay: 1000}, function(err) {
    webshot(production, '../images/bad.png', function(err) {
      var diff = new BlinkDiff({
        imageAPath: '../images/good.png', // Use file-path
        imageBPath: '../images/bad.png',

        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.01, // 1% threshold

        imageOutputPath: '../images/out.png'
      });
      callback(diff);
      // now google.png exists and contains screenshot of google.com
    });
  });
};

// app.get('/compare', (req, res, next) => {
//   diff.run(function(error, result) {
//     if (error) {
//       res.send('fail');
//       throw error;
//     } else {
//       console.log(result);
//       console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
//       console.log('Found ' + result.differences + ' differences.');
//       res.sendFile('/Users/jusisaf/dev/personal/VisualQA/images/out.png');
//     }
//   });
// });

app.post('/url', (req, res, next) => {
  // const url = 'https://publicis.invisionapp.com/share/5XT1S7SZS8V#/screens/374597737_Side_Drawer';
  const url = req.query.input;
  
  // axios(url)
    // .then(response => {
      // const html = response.data;
      // console.log(html)
      // const $ = cheerio.load(html);
      // const imageUrl = $('#screen_viewer img').attr('src')
      // var regex = /(https?:\/\/.+invisionapp-cdn.+)/ig;  
      // console.log(html.match(regex))
      // console.log(imageUrl);
      urlDiff(url, req.query.output, function(diff) {
        diff.run(function(error, result) {
          if (error) {
            res.send('fail');
            throw error;
          } else {
            console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
            console.log('Found ' + result.differences + ' differences.');
            res.sendFile('/Users/jusisaf/dev/personal/VisualQA/images/out.png');
          }
        });
    
      });
});

