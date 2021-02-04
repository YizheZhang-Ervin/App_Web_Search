<template>
  <section>
    <div class="h100" style="overflow: hidden">
      <!-- 列表 -->
      <div v-show="listShow" class="h100" style="overflow: scroll">
        <div>
          <el-card v-for="m in members" shadow="hover" :key="m.name">
            <div @click="changeListDetailShow(m)" class="flex-card">
              <el-image
                style="height: 100px; width: 200px"
                :src="m.img"
                fit="cover"
              >
              </el-image>
              <div>{{ m.name }}</div>
              <div>{{ m.location }}</div>
              <div>{{ m.pro }}</div>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 单人详细 -->
      <div v-if="detailShow" class="h100" style="overflow-y: scroll;overflow-x: hidden;">
        <el-button
          circle
          icon="el-icon-arrow-left"
          @click="changeListDetailShow('back')"
        ></el-button>
        <section class="outer">
          <!-- 左边 -->
          <section class="leftpart">
            <el-card :body-style="{ padding: '0px' }">
              <div>
                <el-image
                  :src="memberDetail.img"
                  fit="contain"
                  
                >
                </el-image>
              </div>
              <div>
                <div class="flex-info">
                  <el-button type="text" icon="el-icon-message" class="email"
                    >Email: {{ memberDetail.mail }}
                  </el-button>
                  <el-button type="text" icon="el-icon-user" class="contact"
                    >Contact: <span v-html="memberDetail.contact"></span>
                  </el-button>
                  <el-divider></el-divider>
                </div>
                <div class="flex-btn">
                  <a :href="memberDetail.linkedin">
                    <el-button circle>ln</el-button>
                  </a>
                  <el-divider direction="vertical"></el-divider>
                  <a href="javascript:window.print()">
                    <el-button icon="el-icon-printer" circle></el-button>
                  </a>
                </div>
              </div>
            </el-card>
          </section>
          <!-- 右边 -->
          <section class="rightpart">
            <!-- 名字 -->
            <div class="flex-name">
              <h1>
                {{ memberDetail.name }}
                <span style="font-size: medium">{{ memberDetail.title }}</span>
              </h1>
              <el-image :src="logo" fit="contain" style="text-indent:0px"> </el-image>
            </div>
            <!-- Role -->
            <div class="flex-exp">
              <el-divider content-position="left">Role</el-divider>
              <p>{{ memberDetail.exp1 }}</p>
            </div>
            <!-- Projects -->
            <div class="flex-exp">
              <el-divider content-position="left">Projects</el-divider>
              <div v-html="memberDetail.exp2"></div>
            </div>
            <!-- Skills -->
            <div class="flex-exp">
              <el-divider content-position="left">Skills</el-divider>
              <p>{{ memberDetail.exp3 }}</p>
            </div>
          </section>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EGGroup",
  data: function () {
    return {
      listShow: true,
      detailShow: false,
      logo: require("../assets/img/favicon.png"),
      memberDetail: {},
      members: [
        {
          index: "1",
          name: "Yizhe Zhang",
          location: "Boston",
          pro: "Developer",
          img: require("../assets/img/ervin.jpg"),
          mail: "zhang.yizhe@northeastern.edu",
          contact:
            "<a href='https://ervinzhang.pythonanywhere.com/' target='_new'>ervinzhang</a>",
          linkedin: "https://www.linkedin.com/in/yizhe-zhang/",
          title: "Developer",
          exp1: "FinTech",
          exp2: "<p>FISH Group\
                </p><p>YeStock</p>",
          exp3: "Python, JavaScript",
        },
      ],
    };
  },
  methods: {
    changeListDetailShow: function (member) {
      if (member == "back") {
        this.listShow = true;
        this.detailShow = false;
      } else {
        this.listShow = false;
        this.memberDetail = member;
        this.detailShow = true;
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 900px) and (min-height: 700px) {
  .leftpart {
    width: 30vw;
  }

  .rightpart {
    width: 60vw;
  }

  .outer{
    height: 80vh;
  }
}
@media (max-width: 900px) {
  .flex-card {
    flex-direction: column;
  }

  .leftpart {
    width: 100vw;
  }

  .rightpart {
    width: 100vw;
    text-indent: 15px;
  }

  .outer {
    flex-direction: column;
    min-height: 80vh;
  }

}

@media (max-height: 700px) {
  .flex-card {
    flex-direction: column;
  }

  .leftpart {
    width: 100vw;
  }

  .rightpart {
    width: 100vw;
    text-indent: 15px;
  }

  .outer {
    flex-direction: column;
    min-height: 80vh;
  }
}

.flex-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.leftpart {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  height: 66vh;
}

.rightpart {
  display: flex;
  align-self: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 80vh;
}

.outer {
  display: flex;
  align-self: center;
  justify-content: space-around;
  width: 100vw;
}

.h100 {
  height: 100vh;
}

h1 {
  font-size: xx-large;
}
.el-divider__text {
  background-color: white !important;
  color: black !important;
  font-weight: bold !important;
  font-size: larger;
}

.flex-btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.flex-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-exp {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 50vw;
}

.flex-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.email,
.contact {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-left: 0 !important;
}
</style>