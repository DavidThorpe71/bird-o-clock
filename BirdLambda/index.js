const axios = require('axios').default;
const AWS = require('aws-sdk');

// This will be a Lambda at some point

// Get random bird call
// Convert to .wav
// return file

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

async function getBird() {
  const initalEndpoint = `https://www.xeno-canto.org/api/2/recordings?query=q:A+len_lt:15`

  try {
    const response = await axios.get(initalEndpoint);
    console.log("number of pages: ", response.data.numPages);
    const randomPage = getRandomNumber(response.data.numPages);
    const randomNumber = getRandomNumber(500);

    const secondaryEndpoint = `https://www.xeno-canto.org/api/2/recordings?query=q:A+len_lt:15&page=${randomPage}`;
    const secondList = await axios.get(secondaryEndpoint);

    const item = secondList.data.recordings[randomNumber];

    const s3 = new AWS.S3();

    axios({
      method: 'get',
      url: `http:${item.file}`,
      responseType: 'stream'
    })
    .then(function (response) {
      var params = {Bucket: `bird-o-clock`, Key: item["file-name"], Body: response.data};
      s3.upload(params, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully uploaded data to " + `bird-o-clock` + "/" + item["file-name"]);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

getBird()
