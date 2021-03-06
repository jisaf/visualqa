var BlinkDiff = require('blink-diff');
// var urlToImage = require('url-to-image');
var webshot = require('webshot');
var sizeOf = require('image-size');

var urlDiff = function(invision, production, callback) {
  var options = {
    screenSize: {
      width: 'all',
      height: 'all'
    },
    shotSize: {
      width: 'all',
      height: 'all'
    },
    renderDelay: 1000
  };
  return webshot(invision, '../images/good.png', options, function(err) {
    var imgSize = sizeOf('../images/good.png');
    var options = {
      screenSize: {
        width: imgSize.width,
        height: imgSize.height
      },
      shotSize: {
        height: 'all'
      }
    };
    webshot(production, '../images/bad.png', options, function(err) {
      var diff = new BlinkDiff({
        imageAPath: '../images/good.png', // Use file-path
        imageBPath: '../images/bad.png',
        // composition: false,
        outputMaskRed: 0,
        outputMaskBlue: 255, // Use blue for highlighting differences
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

export const getResutl = (input, output) => {


// const url = 'https://publicis.invisionapp.com/share/5XT1S7SZS8V#/screens/374597737_Side_Drawer';
  // const url = req.query.input;

  // axios(url)
  // .then(response => {
  // const html = response.data;
  // console.log(html)
  // const $ = cheerio.load(html);
  // const imageUrl = $('#screen_viewer img').attr('src')
  // var regex = /(https?:\/\/.+invisionapp-cdn.+)/ig;
  // console.log(html.match(regex))
  // console.log(imageUrl);
  urlDiff(input, output, function(diff) {
    return diff.run(function(error, result) {
      if (error) {
        console.log('fail');
        throw error;
      } else {
        console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
        console.log('Found ' + result.differences + ' differences.');
        return '%PUBLIC_URL%/out.png';
      }
    });
  });
};
