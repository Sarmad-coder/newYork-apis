var express = require('express');
var router = express.Router();
const https = require('https');

/* GET users listing. */
router.get('/topArticle', function (req, res, next) {
  https.get(`https://api.nytimes.com/svc/topstories/v2/automobiles.json?api-key=A9ASS18jrJbbuCQsW4WaN6GgytRs5RBX`, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data); // Parse the JSON string into an object
        res.json({ status: "success", data: jsonData });
      } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        res.status(500).json({ status: "error", message: "Error parsing JSON response" });
      }
    });
  }).on('error', (error) => {
    console.error(`Error: ${error}`);
    res.status(500).json({ status: "error", message: "Error making the API request" });
  });
});

module.exports = router;
