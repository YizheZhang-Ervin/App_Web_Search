Vue.component('tools', {
    data: function () {
      return {
        sentence:"",
        options: [{
          value: 'english',
          label: 'English'
        }, {
          value: 'chinese',
          label: '汉语'
        }, {
          value: 'french',
          label: 'Français'
        }, {
          value: 'spanish',
          label: 'Español'
        }, {
          value: 'russian',
          label: 'Русский язык'
        }],
        fromlang: 'english',
        tolang:'chinese',
        translatedSentence:''
      }
    },
    methods:{
      getTranslate: function () {
        axios.get(`http://127.0.0.1:8000/api/translate/?sentence=${this.sentence}&fromlang=${this.fromlang}&tolang=${this.tolang}`)
          .then((response) => {
            if (response.data.error == "error") {
              console.log("bakend error");
            } else {
              this.translatedSentence = response.data.result;
            }
          }, (err) => {
            console.log("frontend error", err);
          })
      },
    },
    template: 
`
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">

      <!-- 输入语言类型 -->
      <el-select v-model="fromlang" placeholder="输入语言类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <!-- 输出语言类型 -->
      <el-select v-model="tolang" placeholder="输出语言类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!-- 输入内容 -->
    <el-input type="textarea" :rows="5" maxlength="255" show-word-limit placeholder="请输入内容" v-model="sentence" @blur="getTranslate">
    </el-input>

    <!-- 输出内容 -->
    <el-input type="textarea" :rows="5" maxlength="255" show-word-limit v-model="translatedSentence" readonly>
    </el-input>

    <!-- 翻译按钮+翻译弹框 -->
    <el-popover placement="bottom-end" title="翻译内容" width="200" trigger="hover" :content="translatedSentence">
      <el-button @click=getTranslate slot="reference">Translate</el-button>
    </el-popover>
  </el-card>
</div>
`
})