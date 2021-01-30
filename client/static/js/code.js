Vue.component('codes', {
    props:{
        codeNo:String
    },
    data: function () {
      return {
          codeNo2:"",
          algorithm:""
      }
    },
    mounted(){
        
    },
    methods:{
        get: function (val) {
            axios.get(`http://127.0.0.1:8000/api/codes/?pkg=${this.codeNo2}`)
              .then((response) => {
                if (response.data.error == "error") {
                  console.log("bakend error");
                } else {
                    this.algorithm = response.data.result;
                }
              }, (err) => {
                console.log("frontend error", err);
              })
          }
    },
    // 动态props
    watch: {
        codeNo: function(newVal,oldVal){
          this.codeNo2 = newVal; //newVal即是codeNo
        }
    },
    template: 
`
<div>
<el-button type="primary" round @click="get">get</el-button>
<pre v-text="algorithm">
</pre>
</div>
`
})