Module.register("TakePicture_QRcode", {
  // Default module config
  defaults: {},

  getStyles: function () {
    return ["TakePicture_QRcode.css"];
  },


  // Override dom generator.
  getDom: function () {
    var element = document.createElement("div");
    element.className = "imageshow";

    var image = document.createElement("img")
    image.id = "Photo";
    image.className = "image";
    image.src = '/modules/TakePicture_QRcode/test.jpg';
    image.style.maxWidth = this.config.maxWidth;

    element.appendChild(image);

    var wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    var TPicon = document.createElement("i");
    TPicon.className = "fa-solid fa-camera";

    var TPbtn = document.createElement("button");
    TPbtn.id = "TakePicture";
    TPbtn.className = "btn";
    TPbtn.innerHTML = "Smile";
    TPbtn.appendChild(TPicon);
    TPbtn.addEventListener("click", () => {
      this.sendSocketNotification("TAKEPICTURE");
      console.log("TakePicture button clicked!");
    });

    var QRicon = document.createElement("i");
    QRicon.className = "fa-solid fa-barcode";

    var QRbtn = document.createElement("button");
    QRbtn.id = "GenerateQRcode";
    QRbtn.className = "btn";
    QRbtn.innerHTML = "Click Me";
    QRbtn.appendChild(QRicon);
    QRbtn.addEventListener("click", () => {
      // Do something when the button is clicked
      this.sendSocketNotification("GenerateQRcode");
      console.log("Button clicked!");
    });

    element.appendChild(wrapper);
    wrapper.appendChild(TPbtn);
    wrapper.appendChild(QRbtn);

    return element;
  }
});





