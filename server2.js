// var express = require('express');
// var app = express();
// var BlinkDiff = require('blink-diff');
// // var urlToImage = require('url-to-image');
// var webshot = require('webshot');
// var sizeOf = require('image-size');

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// app.use('/images', express.static(__dirname + '/images'));
// // var diff = new BlinkDiff({
// //   imageAPath: '../images/good.png', // Use file-path
// //   imageBPath: '../images/bad.png',

// //   thresholdType: BlinkDiff.THRESHOLD_PERCENT,
// //   threshold: 0.01, // 1% threshold

// //   imageOutputPath: '../images/out.png'
// // });

// var urlDiff = function(invision, production, callback) {
//   var options = {
//     // screenSize: {
//     //   width: 'all',
//     //   height: 'all'
//     // },
//     // shotSize: {
//     //   width: 'all',
//     //   height: 'all'
//     // },
//     renderDelay: 3000,
//   };
//   return webshot(invision, './images/good.png', options, function(err) {
//     // var imgSize = sizeOf('./images/good.png');
//     var options = {
//       // screenSize: {
//       //   // width: imgSize.width,
//       //   // height: imgSize.height
//       // },
//       // shotSize: {
//       //   height: 'all'
//       // },
//       renderDelay: 3000,
//     };
//     webshot(production, './images/bad.png', options, function(err) {
//       setTimeout(function() {
//         var diff = new BlinkDiff({
//         imageAPath: './images/good.png', // Use file-path
//         imageBPath: './images/bad.png',
//         // composition: false,
//         outputMaskRed: 0,
//         outputMaskBlue: 255, // Use blue for highlighting differences
//         thresholdType: BlinkDiff.THRESHOLD_PERCENT,
//         threshold: 0.01, // 1% threshold
//         imageOutputPath: './images/out.png'
//       });
//       callback(diff);
//     }, 100)
//       // now google.png exists and contains screenshot of google.com
//     });
//   });
// };

// // app.get('/compare', (req, res, next) => {
// //   diff.run(function(error, result) {
// //     if (error) {
// //       res.send('fail');
// //       throw error;
// //     } else {
// //       console.log(result);
// //       console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
// //       console.log('Found ' + result.differences + ' differences.');
// //       res.sendFile('/Users/jusisaf/dev/personal/VisualQA/images/out.png');
// //     }
// //   });
// // });

// app.post('/url', (req, res, next) => {
//   console.log(req.query);
//   // const url = 'https://publicis.invisionapp.com/share/5XT1S7SZS8V#/screens/374597737_Side_Drawer';
//   // const url = req.query.input;

//   // axios(url)
//   // .then(response => {
//   // const html = response.data;
//   // console.log(html)
//   // const $ = cheerio.load(html);
//   // const imageUrl = $('#screen_viewer img').attr('src')
//   // var regex = /(https?:\/\/.+invisionapp-cdn.+)/ig;
//   // console.log(html.match(regex))
//   // console.log(imageUrl);
//   urlDiff(req.query.input, req.query.output, function(diff) {
//     diff.run(function(error, result) {
//       if (error) {
//         res.send('fail');
//         throw error;
//       } else {
//         console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
//         console.log('Found ' + result.differences + ' differences.');
//         res.sendFile(
//           '/Users/jusisaf/dev/personal/VisualQA/images/out.png'
//         );
//       }
//     });
//   });
// });

var express = require('express');
var app = express();
var BlinkDiff = require('blink-diff');
var cors = require('cors');
// const Pageres = require('pageres');
const captureWebsite = require('capture-website');
const uuid = require('uuid/v1');

app.use(cors());
app.use('/images', express.static(__dirname + '/images'));

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

const appendHttp = str => {
  const prefix = 'http://';
  const securePrefix = 'https://';
  
  if (str.substr(0, prefix.length) !== prefix && str.substr(0, securePrefix.length) !== securePrefix) {
    str = prefix + str;
  }

  return str;
};

app.post('/compare', cors(), (req, res, next) => {
  console.log('got request', req.query, __dirname);

  const input = appendHttp(req.query.input);
  const output = appendHttp(req.query.output);
  const inputFile = uuid();
  const outputFile = uuid();
  const comparisonFile = uuid();

  const getScreenShot = async (url, filename, resolution = '1440x1080') => {
    console.log("checking", url)
    // await new Pageres({delay: 2})
    //   .src(decodeURIComponent(url), [resolution], {
    //     filename: './images/' + filename
    //   })
    //   .dest(__dirname)
    //   .run();
    await captureWebsite.file(decodeURIComponent(url), __dirname + '/images/' + filename + '.png', {
      width: 1440,
      height: 1080,
      delay: 1,
      launchOptions: {args: ['--no-sandbox', '--disable-setuid-sandbox']}
    });
  }

  // let foo = async () => {
  //   await new Pageres({delay: 2})
  //     .src(decodeURIComponent(input), ['1440x1080'], {
  //       filename: './images/' + inputFile
  //     })
  //     .src(decodeURIComponent(output), ['1440x1080'], {
  //       filename: './images/' + outputFile
  //     })
  //     .dest(__dirname)
  //     .run();
  // };
  (async () => {

  await getScreenShot(input, inputFile);
  await getScreenShot(output, outputFile);

    // .then(() => {
      var diff = new BlinkDiff({
        imageAPath: __dirname + `/images/${inputFile}.png`, // Use file-path
        imageBPath: __dirname + `/images/${outputFile}.png`,
        composition: false,
        // outputMaskRed: 0,
        // outputMaskBlue: 255, // Use blue for highlighting differences
        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.01, // 1% threshold
        imageOutputPath: __dirname + `/images/${comparisonFile}.png`
      });

      diff.run(function(error, result) {
        if (error) {
          res.send('fail', error);
          throw error;
        } else {
          console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
          console.log('Found ' + result.differences + ' differences.');
          res.json({
            comparison: `/images/${comparisonFile}.png`,
            input: `/images/${inputFile}.png`,
            output: `/images/${outputFile}.png`
          });
        }
      });
    })();
    // })
    // .catch(err => {
    //   console.log('---------', err);
    // });
});



/// to fix missing chromium on digital ocean run the following:
// sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget