<template>
<div class="h100 dark gold padding-lr" id="recipeComponent">
  <h2 class="center">搜索菜谱</h2><br/>

  <label>搜索菜品 </label>
  <el-autocomplete :fetch-suggestions="querySearch" placeholder="请输入食材"
  :trigger-on-focus="false" v-model="food" @select="searchDish">
  </el-autocomplete>
  <br/><br/>

  <el-dropdown type="primary">
    <el-button >
    手动选择菜品<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="d in dishes" :key=d.value>
        <div @click="chooseDish(d)">
          {{d.value}}
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <br/><br/>

  <el-card>
  <div slot="header">
    <span>菜名: {{dishNow.value}}</span>
  </div>
  <div style="white-space:pre">
    材料: {{dishNow.material}}
  </div>
  <div style="white-space:pre">
    步骤: {{dishNow.step}}
  </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Recipe",
  data: function () {
      return {
        dishes:[
          {value:"番茄蛋汤",material:"番茄，鸡蛋",step:"煮番茄十字剥皮，炒番茄加入沸水，加盐、胡椒、水淀粉并煮沸，捣鸡蛋十下把鸡蛋漏勺从外向内顺时针加入番茄汤，加香油"},
          {value:"番茄炒蛋",material:"番茄，鸡蛋",step:""},
          {value:"罗宋汤",material:"番茄，洋葱，包菜，土豆，牛肉",step:""},
          {value:"意大利面",material:"番茄，肉末，面",step:""},
          {value:"番茄龙利鱼",material:"番茄，龙利鱼",step:""},
          {value:"青椒土豆丝",material:"青椒，土豆",step:""},
          {value:"家常土豆片",material:"土豆",step:""},
          {value:"红烧土豆块",material:"土豆",step:""},
          {value:"虾仁炒蛋",material:"虾仁，鸡蛋",step:""},
          {value:"蒸蛋",material:"鸡蛋",step:"捣鸡蛋加水，放电饭锅蒸，出锅加酱油"},
        ],
        dishNow:{},
        food:""
      }
    },
    methods:{
      chooseDish(dish){
        this.dishNow = dish;
      },
      searchDish(item){
        this.dishNow = item;
      },
      querySearch(queryString, cb) {
        var dishes = this.dishes;
        var results = queryString ? dishes.filter(this.createFilter(queryString)) : dishes;
        cb(results);
      },
      createFilter(queryString) {
        return (dish) => {
          let flag = (dish.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          return flag;
        };
      }
    },
};
</script>

<style scoped>
</style>
