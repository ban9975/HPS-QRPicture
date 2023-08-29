# HPS-QRPicture
A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project by taking picture and generating QR Code for user to download.

## How it works
This module allows you to take a picture and then generates QR Code for you to download the picture.
Users need to connect to the same wifi with Magic Mirror to access the picture.

## Preconditions
* MagicMirror<sup>2</sup> instance
* Node.js version >= 7
* npm
* Raspberry Pi 3 Model B
* Raspbery Pi Camera Module 2

## Step 1 – Download the module
In your MagicMirror directory:

```bash cd modules
   git clone https://github.com/ban9975/HPS-QRPicture.git
```

## Step 2 – Add files to the Config.js
```javascript
{
  module: "HPS-QRPicture",
  position: "top_left",
  config: {
    //prompt: "Put in your own text"
  }
}
```
