Module.register("HPS-QRPicture", {
    // Default module config
    defaults: {},

    getStyles: function () {
        return [this.file('QRPicture.css')];
    },
    start: function () {
        this.state = 'init'
    },

    // Override dom generator.
    getDom: function () {
        var element = document.createElement("div");
        element.className = "imageshow";

        var image = document.createElement("img")
        image.id = "Photo";
        image.className = "image";
        image.src = './modules/HPS-QRPicture/init.png';
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
        })
        
        var QRicon = document.createElement("i");
        QRicon.className = "fa-solid fa-barcode";
        var QRbtn = document.createElement("button");
        QRbtn.id = "GenerateQRcode";
        QRbtn.className = "btn";
        QRbtn.innerHTML = "Save";
        QRbtn.appendChild(QRicon);
        QRbtn.addEventListener("click", () => {
          // Do something when the button is clicked
          this.sendSocketNotification("GENERATE_QRCODE")
        });
        QRbtn.style.display = 'none'

        element.appendChild(image);
        wrapper.appendChild(TPbtn);
        wrapper.appendChild(QRbtn)
        element.appendChild(wrapper);

        return element;
    },
    
    socketNotificationReceived: function(notification, payload) {
        var helper = this
        var Photo = document.getElementById('Photo')
        var wrapper = document.getElementById('Wrapper')
        var takePicture = document.getElementById('TakePicture')
        var QRbtn = document.getElementById('GenerateQRcode')
        this.state = notification
        this.sendSocketNotification("debug", this.state)
        switch(notification) {
          case 'init':
            Photo.src = './modules/HPS-QRPicture/init.png'
            takePicture.innerHTML = 'Take Picture'
            QRbtn.style.display = 'none'
            break
          case 'show':
            Photo.src = './modules/HPS-QRPicture/tmp.png?' + Date.now()
            takePicture.innerHTML = 'Retake'
            QRbtn.style.display = 'block'
            break
          case 'qrcode': 
            Photo.src = './modules/HPS-QRPicture/qrcode/qrcode.png?' + Date.now()
            takePicture.innerHTML = 'Close'
            QRbtn.style.display = 'none'
            break
        }
    }
});





