const axios = require('axios').default;
// This will be a Lambda at some point

// Get random bird call
// Convert to .wav
// return file

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

async function getBird() {
  const endpoint = `https://www.xeno-canto.org/api/2/recordings?query=q:A+len_lt:15`

  try {
    const response = await axios.get(endpoint);
    console.log("number of pages: ", response.data.numPages);
    const randomPage = getRandomNumber(response.data.numPage)
    console.log("number of recordings: ", response.data.numRecordings);
    console.log("length of recordings: ", response.data.recordings.length);
    // console.log(response.data.numPages);
  } catch (error) {
    console.error(error);
  }
}

getBird()
