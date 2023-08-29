import picamera
from PIL import Image
import numpy as np

camera = picamera.PiCamera()
camera.resolution = (512, 640)
output = np.empty((640, 512, 3), dtype=np.uint8)
camera.capture(output, format="rgb")
img = Image.fromarray(output, mode="RGB")
img.save('./modules/HPS-QRPicture/img/tmp.png')
