const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')
var str = "hia"
var temp = 0
//index.js
Page({
  async onReady() {
    const camera = wx.createCameraContext(this)
    // Load Model
    const net = await this.loadModel()
    //
    this.setData({result: 'Loading' })
    
    let count = 0
    const listener = camera.onCameraFrame((frame) => {
      count++
      if (count === 10) {
        if (net) {
          this.predict(net, frame)
        }
        count = 0
      }
    })
    listener.start()
  },
  async loadModel(){
    const net = await tfl.loadLayersModel('http://localhost:8000/model.json') 
    net.summary()
    return net
  },
  async predict(net, frame){
    const imgData = {data: new Uint8Array(frame.data), width: frame.width, height: frame.height}
    const x = tf.tidy(() => {
      const imgTensor = tf.browser.fromPixels(imgData, 4)
      const d = Math.floor((frame.height - frame.width) / 2)
      const imgSlice = imgTensor.slice([d, 0, 0], [frame.width, -1, 3])
      const imgResize =  tf.image.resizeBilinear(imgSlice, [224, 224])
      return tf.div(imgResize, 127.0).sub(tf.scalar(1)).expandDims(0)
    })
    const prediction = await net.predict(x).argMax(1)
    const res = prediction.dataSync()[0]
    if ((res === 1) && (res != temp)){
      temp = res
      console.log(temp)
      var addStr = "hi"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })

    }
    else if((res === 2) && (res != temp)){
      temp = res
      var addStr = "hear"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })

    }
    else if ((res === 3) && (res != temp)) {
      temp = res
      var addStr = "speak"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })

    }
    else if ((res === 4) && (res != temp)) {
      temp = res
      var addStr = "my"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 5) && (res != temp)) {
      temp = res
      var addStr = "name"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 6) && (res != temp)) {
      temp = res
      var addStr = "is"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 7) && (res != temp)) {
      temp = res
      var addStr = "xue"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 8) && (res != temp)) {
      temp = res
      var addStr = "but"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 9) && (res != temp)) {
      temp = res
      var addStr = "if"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 10) && (res != temp)) {
      temp = res
      var addStr = "future"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 11) && (res != temp)) {
      temp = res
      var addStr = "computing"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 12) && (res != temp)) {
      temp = res
      var addStr = "what"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 13) && (res != temp)) {
      temp = res
      var addStr = "those"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
    else if ((res === 14) && (res != temp)) {
      temp = res
      var addStr = "cannot"
      //this.str = this.str.concat(" ", addStr)
      this.setData({ result: str })
    }
  }
})
