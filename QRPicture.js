Module.register("HPS-QRPicture", {
    // Default module config
    defaults: {},

    getStyles: function () {
        return ["QRPicture.css"];
        this.state = 'init'
    },


    // Override dom generator.
    getDom: function () {
        this.state = 'init'
        var element = document.createElement("div");
        element.className = "imageshow";

        var image = document.createElement("img")
        image.id = "Photo";
        image.className = "image";
        image.src = '/modules/HPS-QRPicture/init.png';
        image.style.maxWidth = this.config.maxWidth;

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.id = 'Wrapper'

        var TPicon = document.createElement("i");
        TPicon.className = "fa-solid fa-camera";

        var TPbtn = document.createElement("button");
        TPbtn.id = "TakePicture";
        TPbtn.className = "btn";
        TPbtn.innerHTML = "Take Picture";
        TPbtn.appendChild(TPicon);
        TPbtn.addEventListener("click", () => {
            if(this.state === 'qrcode') {
                this.sendSocketNotification("CLOSE")
            }
            else {
                this.sendSocketNotification("TAKE_PICTURE")
            }
    });

        element.appendChild(image);
        element.appendChild(wrapper);
        wrapper.appendChild(TPbtn);

        return element;
    },
    socketNotificationReceived: function(notification, payload) {
        var Photo = document.getElementById('Photo')
        var wrapper = document.getElementById('Wrapper')
        var takePicture = document.getElementById('TakePicture')
        this.state = notification
        switch(notification) {
          case 'init':
            Photo.src = './modules/HPS-QRPicture/init.png'
            takePicture.innerHTML = 'Take Picture'
            break
          case 'show':
            Photo.src = './modules/HPS-QRPicture/tmp.png'
            var QRicon = document.createElement("i");
            QRicon.className = "fa-solid fa-barcode";
            var QRbtn = document.createElement("button");
            QRbtn.id = "GenerateQRcode";
            QRbtn.className = "btn";
            QRbtn.innerHTML = "Generate QR Code";
            QRbtn.appendChild(QRicon);
            QRbtn.addEventListener("click", () => {
              // Do something when the button is clicked
              this.sendSocketNotification("GENERATE_QRCODE")
            });
            wrapper.appendChild(QRbtn)
            break
          case 'qrcode': 
            var QRbtn = document.getElementById('GenerateQRcode')
            if QRbtn:
                wrapper.removeChild(QRbtn)
            Photo.src = './modules/HPS-QRPiture/qrcode/qrcode.png'
            takePicture.innerHTML = 'Close QR Code'
            break
        }
    }
});





