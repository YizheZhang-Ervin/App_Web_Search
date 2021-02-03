<template>
<div>
  <div class="scroll-v" style="overflow-x:hidden">
    <p><b>摄像头</b></p>
    <section>
      <el-card shadow="hover">
      <el-button type="primary" plain round title="start camera" @click="showMedia" >
        <i class="el-icon-camera"></i> Start Camera
      </el-button>
      <el-button type="primary" plain round title="take photo" @click="showPhoto" >
        <i class="el-icon-video-camera"></i> Take Photo
      </el-button>
      <br />
      <video id="video" height="240px" autoplay="autoplay"></video>  
      <canvas id="canvas" height="240px" width="240px"></canvas>
      </el-card>
    </section>
    <p><b>浏览器/屏幕宽高属性</b></p>
    <div v-for="k in dataWidthHeight" :key=k>
      <el-card shadow="hover">
      {{k}}
      </el-card>
    </div>
    <p>地址属性</p>
    <div v-for="k in dataURL" :key=k>
      <el-card shadow="hover">
      {{k}}
      </el-card>
    </div>
    <p><b>硬件属性</b></p>
    <div v-for="k in dataHardware" :key=k>
      <el-card shadow="hover">
      {{k}}
      </el-card>
    </div>
    <p><b>连接属性</b></p>
    <div v-for="k in dataConnection" :key=k>
      <el-card shadow="hover">
      {{k}}
      </el-card>
    </div>
    <p><b>其他属性</b></p>
    <div v-for="k in dataOther" :key=k>
      <el-card shadow="hover">
      {{k}}
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
import {getMedia,takePhoto} from '../assets/js/webMedia.js';

export default {
  name: "Monitor",
    data: function () {
    return {
      dataWidthHeight: {
        iw: "InnerWidth: "+window.innerWidth,
        ow: "OuterWidth: "+window.outerWidth,
        dcw: "ClientWidth(doc): "+document.documentElement.clientWidth,
        rw: "ScrollWidth(doc): "+document.documentElement.scrollWidth,
        bcw: "ClientWidth(body): "+document.body.clientWidth,
        aw: "AvailWidth: "+window.screen.availWidth,
        sw: "ScreenWidth: "+window.screen.width,
        ih: "InnerHeight: "+window.innerHeight,
        oh: "OutHeight: "+window.outerHeight,
        dch: "ClientHeight(doc): "+document.documentElement.clientHeight,
        rh: "ScrollHeight(doc): "+document.documentElement.scrollHeight,
        bch: "ClientHeight(body): "+document.body.clientHeight,
        ah: "AvailHeight: "+window.screen.availHeight,
        sh: "ScreenHeight: "+window.screen.height,
      },
      dataURL:{
        protocol: "协议: "+window.location.protocol,
        hostname: "主机地址名: "+window.location.hostname,
        port: "端口号: "+window.location.port,
        pathname: "路径名: "+window.location.pathname,
      },
      dataHardware:{
        cpu: "CPU个数: "+window.navigator.hardwareConcurrency,
        storage: "设备存储: "+window.navigator.deviceMemory,
        touch: "最大触点数: "+window.navigator.maxTouchPoints,
      },
      dataConnection:{
        na: "用户代理: "+window.navigator.userAgent,
        vendor: "开发商: "+window.navigator.vendor,
        platform: "操作系统: "+window.navigator.platform,
        ol: "联网状态: "+ (window.navigator.onLine?"在线":"离线"),
        condl: "网络下行速度: "+window.navigator.connection.downlink,
        conet: "网络类型: "+window.navigator.connection.effectiveType,
        conrtt: "估算往返时间: "+window.navigator.connection.rtt,
      },
      dataOther:{
        sc: "色深: "+window.screen.colorDepth,
        sd: "位深: "+window.screen.pixelDepth,
        lang:"语言: "+window.navigator.language
      }
    }
  },
  methods:{
    showMedia(){
      getMedia();
    },
    showPhoto(){
      takePhoto();
    }
  }
};
</script>

<style scoped>
</style>
