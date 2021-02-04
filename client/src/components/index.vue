<template>
  <div id="container">
    <aside>
      <!-- left navigation bar -->
      <el-menu
        id="navbar001"
        default-active="1"
        background-color="#2b2b2b"
        text-color="#fff"
        active-text-color="gold"
        :collapse="menuCollapse"
      >
        <!-- home -->
        <el-menu-item index="1" @click="changeShow('bonds')">
          <i class="el-icon-s-home"></i>
          <span slot="title">Home</span>
        </el-menu-item>
        <!-- fintech -->
        <el-submenu index="3" collapse="false">
          <template slot="title">
            <i class="el-icon-s-marketing"></i>
            <span>FinTech</span>
          </template>
          <el-menu-item-group>
            <template slot="title">Algorithms</template>
            <el-menu-item index="3-1" @click="changeShow('code1')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">CTA</span>
            </el-menu-item>
            <el-menu-item index="3-2" @click="changeShow('code2')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Options</span>
            </el-menu-item>
            <el-menu-item index="3-3" @click="changeShow('code3')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Equity</span>
            </el-menu-item>
            <el-menu-item index="3-4" @click="changeShow('bonds')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Bonds</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- tools -->
        <el-submenu index="2" collapse="false">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Tools</span>
          </template>
          <el-menu-item-group>
            <template slot="title">Tools</template>
            <el-menu-item index="2-1" @click="changeShow('video')">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">Video</span>
            </el-menu-item>
            <el-menu-item index="2-2" @click="changeShow('recipe')">
              <i class="el-icon-food"></i>
              <span slot="title">Recipe</span>
            </el-menu-item>
            <el-menu-item index="2-3" @click="changeShow('monitor')">
              <i class="el-icon-monitor"></i>
              <span slot="title">Monitor</span>
            </el-menu-item>
            <el-menu-item index="2-4" @click="changeShow('geo')">
              <i class="el-icon-location-outline"></i>
              <span slot="title">Geolocation</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- group -->
        <el-menu-item index="1" @click="changeShow('group')">
          <i class="el-icon-user"></i>
          <span slot="title">Group</span>
        </el-menu-item>
        <!-- collapse -->
        <el-menu-item index="4" @click="changeMenuCollapse">
          <i class="el-icon-s-fold"></i>
          <span slot="title"
            >Hide (<span class="bgtrans" v-text="mouseX"></span> ,
            <span v-text="mouseY" class="bgtrans"></span>)</span
          >
        </el-menu-item>
      </el-menu>
    </aside>
    <main>
      <!-- components -->
      <Video v-show="videoShow"></Video>
      <Recipe v-show="recipeShow"></Recipe>
      <Monitor v-show="monitorShow"></Monitor>
      <Geo v-if="geoShow"></Geo>
      <Fintech v-show="fintechShow" :code-no="codeNo"></Fintech>
      <Bonds v-if="bondShow"></Bonds>
      <Group v-show="groupShow"></Group>
      <el-backtop></el-backtop>
    </main>
  </div>
</template>

<script>
import Video from "./video.vue";
import Recipe from "./recipe.vue";
import Monitor from "./monitor.vue";
import Geo from "./geo.vue";
import Fintech from "./fintech.vue";
import Bonds from "./bonds.vue";
import Group from "./group.vue";

export default {
  name: "Home",
  components: {
    Video,
    Recipe,
    Monitor,
    Geo,
    Fintech,
    Bonds,
    Group
  },
  data: function () {
    return {
      menuCollapse: true,
      videoShow: false,
      monitorShow: false,
      recipeShow: false,
      geoShow: false,
      fintechShow: false,
      bondShow: true,
      groupShow:false,
      mouseX: 0,
      mouseY: 0,
      codeNo: "",
    };
  },
  mounted() {
    setInterval(() => {
      this.changeTitle();
    }, 1000);
    document.onmousemove = this.mouseMove;
  },
  methods: {
    changeTitle() {
      let timer;
      if (document.visibilityState != "visible") {
        timer = setInterval(() => {
          let date = new Date(Date.now());
          document.title =
            "FinTech-Algs " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
          if (document.visibilityState == "visible") {
            clearInterval(timer);
            document.title = "FinTech-Algs";
          }
        }, 1000);
      }
    },
    changeMenuCollapse() {
      this.menuCollapse = !this.menuCollapse;
    },
    changeShow(index) {
      if (index == "video") {
        this.videoShow = true;
        this.monitorShow = false;
        this.recipeShow = false;
        this.fintechShow = false;
        this.geoShow = false;
        this.bondShow = false;
        this.groupShow = false;
      } else if (index == "monitor") {
        this.videoShow = false;
        this.monitorShow = true;
        this.recipeShow = false;
        this.fintechShow = false;
        this.geoShow = false;
        this.bondShow = false;
        this.groupShow = false;
      } else if (index == "recipe") {
        this.videoShow = false;
        this.monitorShow = false;
        this.recipeShow = true;
        this.fintechShow = false;
        this.geoShow = false;
        this.bondShow = false;
        this.groupShow = false;
      } else if (index.substr(0,4) == "code") {
        this.videoShow = false;
        this.monitorShow = false;
        this.recipeShow = false;
        this.fintechShow = true;
        this.geoShow = false;
        this.bondShow = false;
        this.codeNo = index;
        this.groupShow = false;
      } else if (index == "geo") {
        this.videoShow = false;
        this.monitorShow = false;
        this.recipeShow = false;
        this.fintechShow = false;
        this.geoShow = true;
        this.bondShow = false;
        this.groupShow = false;
      } else if (index == "bonds") {
        this.videoShow = false;
        this.monitorShow = false;
        this.recipeShow = false;
        this.fintechShow = false;
        this.geoShow = false;
        this.bondShow = true;
        this.groupShow = false;
      }else if( index=="group"){
        this.videoShow = false;
        this.monitorShow = false;
        this.recipeShow = false;
        this.fintechShow = false;
        this.geoShow = false;
        this.bondShow = false;
        this.groupShow = true;
      }
    },
    mouseMove(ev) {
      ev = ev || window.event;
      var mousePos = this.mouseCoords(ev);
      //获取当前的x,y坐标
      this.mouseX = mousePos.x;
      this.mouseY = mousePos.y;
    },
    mouseCoords(ev) {
      //鼠标移动的位置
      if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
      }
      return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop,
      };
    },
  },
};
</script>

<style scoped>
main {
  overflow: hidden;
}
.iframe {
  height: 100vh;
  max-width: 96vw;
  width: 95vw;
  border: none;
}
a {
  text-decoration: none;
  color: white;
}
</style>
