var util = require("util")
const { spawn } = require('child_process')
// import { promises as fs } from 'fs'

/// node_helper.js
var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
    start: function() {
        spawn('python3', ['./modules/HPS-QRPicture/qrcode.py', 'server'])
    },

    socketNotificationReceived: function (notification, payload) {
        var helper = this
        switch (notification) {
            case 'debug':
                console.log('[debug]')
                console.log(payload)
                break 
            case "TAKE_PICTURE":
                console.log("take_picture")
                var take = spawn('python3', ['./modules/HPS-QRPicture/pic.py'])
                take.stdout.on('data', function (data) {
                    console.log(data.toString())
                    helper.sendSocketNotification('show')
                    console.log("helper send show")
                })
                break
            case 'GENERATE_QRCODE':
                console.log('generate qrcode')
                var take = spawn('python3', ['./modules/HPS-QRPicture/qrcode.py', 'qrcode'])
                take.stdout.on('data', function (data) {
                    console.log(data.toString())
                    helper.sendSocketNotification('qrcode')
                    console.log("helper send qrcode")
                })
                break
            case 'CLOSE':
                console.log('close')
                helper.sendSocketNotification('init')
                break
        }
    },
})
