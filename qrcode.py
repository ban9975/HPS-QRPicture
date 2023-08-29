import tornado.web
import tornado.ioloop
import pyqrcode
import png
import json
import sys
import shutil
import os

img_path = "./modules/HPS-QRPicture/img/photo" #Directory path for storing images
url = "http://192.168.216.38:8888/img/photo" #IP address needs to be changed to the IP address of the Raspberry Pi
qrcode_path = "./modules/HPS-QRPicture/qrcode/qrcode.png" #Directory path for saving QR codes


if len(sys.argv) < 2:
    exit()
elif sys.argv[1] == 'server':
    # start the server
    app = tornado.web.Application([
        (r"./modules/HPS-QRPicture/img/(.*)", tornado.web.StaticFileHandler, {"path": "./modules/HPS-QRPicture/img/"}),
        # (r"/favicon.ico", FaviconHandler),
    ])
    
    app.listen(8888) 
    print("Listening on port 8888")
    
    tornado.ioloop.IOLoop.instance().start()

elif sys.argv[1] == 'qrcode':
    # load count
    count = ''
    with open('./modules/HPS-QRPicture/count.json', 'r') as f:
        data = json.load(f)
        count = str(data['count'])
        data['count'] += 1
    with open('./modules/HPS-QRPicture/count.json', 'w') as f:
        json.dump(data, f, indent=2)

    # save picture
    shutil.copy('./modules/HPS-QRPicture/tmp.png', img_path + count)

    # generate qrcode
    qr_code = pyqrcode.create(url + count + ".png")
    qr_code.png(qrcode_path, scale=6)
    print('python generate qrcode')
