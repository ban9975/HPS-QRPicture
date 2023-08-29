# coding=gbk
import tornado.web
import tornado.ioloop
import cv2
import pyqrcode
import png
import threading
import json

# import pyzbar.pyzbar as pyzbar
# import numpy as np
# import aspose.words as aw

# class FaviconHandler(tornado.web.RequestHandler):
#     def get(self):
#         self.set_status(204)

img_path = "./modules/QRPicture/img/photo" #Directory path for storing images
url = "http://172.20.10.2:8888/img/photo" #IP address needs to be changed to the IP address of the Raspberry Pi
qrcode_path = "./modules/QRPicture/qrcode/qrcode.png" #Directory path for saving QR codes


def TakePicture(): 

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Cannot open camera")
        exit()
    
    while (True):
        ret, frame = cap.read()
        if not ret:
            print("Cannot receive frame")
            break
    
        cv2.imshow('Camera', frame)
    
        if cv2.waitKey(1) == ord('q'): #Press 'q' to take a photo
            cv2.imwrite(img_path + str(count) + ".jpg", frame)
            break
    
    cap.release()
    cv2.destroyAllWindows()

    qr_code = pyqrcode.create(url + str(count) + ".jpg")
    qr_code.png(qrcode_path, scale=6)
    
    d = {  #Update the count.json file
        "count": count
    }
    with open('./count.json', 'w') as f:
        json.dump(d, f)
        
    img = cv2.imread(qrcode_path)
    cv2.imshow('QR Code', img)
    cv2.waitKey(0)
    

def Server(): #Start the server
    app = tornado.web.Application([
        (r"/img/(.*)", tornado.web.StaticFileHandler, {"path": "img/"}),
        # (r"/favicon.ico", FaviconHandler),
    ])
    
    app.listen(8888) 
    print("Listening on port 8888")
    
    tornado.ioloop.IOLoop.instance().start()


a = threading.Thread(target=TakePicture) 
b = threading.Thread(target=Server)

with open('./count.json') as f: #Read the count.json file
    data = json.load(f)

count = data['count'] + 1

a.start()
b.start()





