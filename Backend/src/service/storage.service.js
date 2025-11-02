var imagekit = require("imagekit"); // For ES modules
const { default: mongoose } = require("mongoose");


var imagekit = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY, // Get this from your ImageKit dashboard
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY , // Get this from your ImageKit dashboard
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // Get this from your ImageKit dashboard
});


function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: (new mongoose.Types.ObjectId()).toString(),
        folder:"project-audio"
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}


module.exports=uploadFile
