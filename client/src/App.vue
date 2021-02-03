<template>
  <div id="app">
    <EGHome />
  </div>
</template>

<script>
import EGHome from './components/index.vue';
export default {
  name: 'App',
  components: {
    EGHome
  }
}
</script>

<style>
/* 改全局样式 */
*{
    margin:0;
    font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 1em;
}
a{
    text-decoration: none;
}
p{
    text-indent: 2em;
}
ul{
    list-style-type: none;
    padding:0;
}
li{
    line-height: 2em;
}
footer li:first-child{
    color:grey;
}
h1{
    font-size: 3em;
}
h2{
    font-size: 1.5em;
}
footer{
    background-color: #2b2b2b;
    font-size:0.8em;
}
main{
    width: 100%;    
}
/* 改id样式 */
#navbar001{
    height:100vh;
    max-width: 20vw;
}
#container{
    display: flex;
}
#videoComponent{
    color:gold
}
#groupComponent, #groupComponent span,#groupComponent i,#groupComponent a{
    color:black;
}
/* 改类样式 */
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
.text-center{
    text-align: center;
}
.text-right{
    text-align: right;
}
.between{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.around{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.space-v{
    padding-top: 32px;
    padding-bottom: 32px;
}
.font-small{
    font-size:0.3em;
}
.scroll-v{
    overflow: scroll;
    height: 100vh;
}
.v70{
    height:70vh;
}
.h100{
    height: 100%;
}
.vh100{
    height:100vh;
}
.border-left{
    border-left: 2px solid gold;
}
.padding-lr{
    padding-left:2%;
    padding-right:2%;
}
.gold{
    color:gold;
}
.dark{
    background-color: #2b2b2b;
}
/* Media Query */
@media(min-width:700px){
    #app{
      display: block;
    }
    #backup{
      display: none;
    }
  }
@media(max-width:700px){
    #app{
      display: none;
    }
    #backup{
      display: flex;
    }
}
/* 改elementUI */
.el-collapse,.el-collapse-item__content,.el-collapse-item__header,.el-collapse-item__wrap{
    background-color: #2b2b2b!important;
    color:gold!important;
    border: none!important;
}
.el-divider__text{
    background-color:  #2b2b2b!important;
    color:gold!important;
}
#recipeComponent .el-input__inner,#recipeComponent .el-button,#recipeComponent .el-card{
    background-color: #2b2b2b!important;
    color:gold!important;
}
</style>