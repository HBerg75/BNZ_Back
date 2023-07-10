const fs = require("fs");
const readableStreamForFile = fs.createReadStream("./image.png");
const pinataSDK = require("@pinata/sdk");
require("dotenv").config();
const { PINATA_API_KEY, PINATA_SECRET } = process.env;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET);

exports.uploadPinata = async (req, res,next) => {
  try {
    const options = {
      pinataMetadata: {
        name: "leJ",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    pinata
      .pinFileToIPFS(readableStreamForFile, options)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'upload de l'image" });
  }
  
};
