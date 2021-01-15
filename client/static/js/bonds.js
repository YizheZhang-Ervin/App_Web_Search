Vue.component('bonds', {
    data: function () {
        return {
            x: [],
            y: [],
            y_real: [],
            history: "",
            engine: "Engine: NSModel",
            rowNo: 0,
            tau0: 0,
            tau1: 0,
            beta0: 0,
            beta1: 0,
            beta2: 0,
            beta3: 0,
            dataSet: 2019,
            rsquare: 0,
            width: { width: parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + 'px' },
            height: { height: parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 'px' },
            halfhw: { 
                height: parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) / 1.5 + 'px',
                width: parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)/2 + 'px' 
            }
        }
    },
    mounted() {
        this.getOne();
    },
    methods: {
        clear: function () {
            this.x = [];
            this.y = [];
            this.y_real = [];
            this.rowNo = 0;
            this.tau0 = 0;
            this.tau1 = 0;
            this.beta0 = 0;
            this.beta1 = 0;
            this.beta2 = 0;
            this.beta3 = 0;
            this.dataSet = 2019;
            this.rsquare = 0;
            this.plot();
        },
        changeEngine: function () {
            if (this.engine == "Engine: NSModel") {
                this.engine = "Engine: NSSModel"
                document.getElementById("tau1").hidden = false;
                document.getElementById("tau1label").style.display = "inline-block";
                document.getElementById("beta3").hidden = false;
                document.getElementById("beta3label").style.display = "inline-block";
                document.getElementById("manualNSS").hidden = false;
                document.getElementById("autoNSS").hidden = false;
                document.getElementById("manualNS").hidden = true;
                document.getElementById("autoNS").hidden = true;
            } else {
                this.engine = "Engine: NSModel"
                document.getElementById("tau1").hidden = true;
                document.getElementById("tau1label").style.display = "none";
                document.getElementById("beta3").hidden = true;
                document.getElementById("beta3label").style.display = "none";
                document.getElementById("manualNSS").hidden = true;
                document.getElementById("autoNSS").hidden = true;
                document.getElementById("manualNS").hidden = false;
                document.getElementById("autoNS").hidden = false;
            }
        },
        getName: function (dataSet) {
            if (dataSet == 2020) {
                return "Treasury_2020_1To11"
            } else if (dataSet == 2019) {
                return "Treasury_2019_Full"
            }
        },
        getOne: function () {
            axios.get(`http://127.0.0.1:8000/api/NS/?dataset=${this.getName(this.dataSet)}&row=${this.rowNo}`)
                .then((response) => {
                    if (response.data.error == "error") {
                        this.rowNo = "0-249(2019), 0-228(2020) ";
                        this.dataSet = "2019 or 2020";
                        document.getElementById("ds").style.background = "rgba(255,0,0,0.5)";
                        document.getElementById("rowNo").style.background = "rgba(255,0,0,0.5)";
                    } else {
                        document.getElementById("ds").style.background = "transparent";
                        document.getElementById("rowNo").style.background = "transparent";
                        this.x = response.data.x;
                        this.y = response.data.y;
                        this.y_real = response.data.y_real;
                        this.tau0 = response.data.t0;
                        this.tau1 = "none";
                        this.beta0 = response.data.b0;
                        this.beta1 = response.data.b1;
                        this.beta2 = response.data.b2;
                        this.beta3 = "none";
                        this.rsquare = response.data.rsquare;
                        this.plot();
                    }
                }, (err) => {
                    console.log(err.data);
                })
        },
        getAll: function () {
            axios.get(`http://127.0.0.1:8000/api/NS/?dataset=${this.getName(this.dataSet)}&row=-1`)
                .then((response) => {
                    if (response.data.error == "error") {
                        this.rowNo = "Should > 0 ";
                        this.dataSet = "2019 or 2020";
                    } else {
                        this.rsquare = response.data.rsquare;
                        this.x = response.data.x;
                        this.y = response.data.y;
                        this.y_real = response.data.y_real;
                        this.tau0 = response.data.paras[0];
                        this.tau1 = "none";
                        this.beta0 = response.data.paras[1];
                        this.beta1 = response.data.paras[2];
                        this.beta2 = response.data.paras[3];
                        this.beta3 = "none";
                        this.plot();
                    }
                }, (err) => {
                    console.log(err.data);
                })
        },
        postOne: function () {
            axios.post(`http://127.0.0.1:8000/api/NS/`, {
                "parameters": JSON.stringify(Array(this.tau0, this.beta0, this.beta1, this.beta2)),
                "row": this.rowNo,
                "dataSet": JSON.stringify(this.getName(this.dataSet))
            })
                .then((response) => {
                    if (response.data.error == "error") {
                        this.rowNo = "Should > 0 ";
                        this.dataSet = "2019 or 2020";
                        this.tau0 = "type in number";
                        this.tau1 = "type in number";
                        this.beta0 = "type in number";
                        this.beta1 = "type in number";
                        this.beta2 = "type in number";
                        this.beta3 = "type innumber";
                    } else {
                        this.rsquare = response.data.rsquare;
                        this.x = response.data.x;
                        this.y = response.data.y;
                        this.y_real = response.data.y_real;
                        this.tau0 = response.data.paras[0];
                        this.tau1 = "none";
                        this.beta0 = response.data.paras[1];
                        this.beta1 = response.data.paras[2];
                        this.beta2 = response.data.paras[3];
                        this.beta3 = "none";
                        this.plot();
                    }
                }, function (err) {
                    console.log(err.data);
                })
        },
        getNSSOne: function () {
            axios.get(`http://127.0.0.1:8000/api/NSS/?dataset=${this.getName(this.dataSet)}&row=${this.rowNo}`)
                .then((response) => {
                    if (response.data.error == "error") {
                        this.rowNo = "0-249(2019), 0-228(2020) ";
                        this.dataSet = "2019 or 2020";
                        document.getElementById("ds").style.background = "rgba(255,0,0,0.5)";
                        document.getElementById("rowNo").style.background = "rgba(255,0,0,0.5)";
                    } else {
                        document.getElementById("ds").style.background = "transparent";
                        document.getElementById("rowNo").style.background = "transparent";
                        this.x = response.data.x;
                        this.y = response.data.y;
                        this.y_real = response.data.y_real;
                        this.tau0 = response.data.t0;
                        this.tau1 = response.data.t1;
                        this.beta0 = response.data.b0;
                        this.beta1 = response.data.b1;
                        this.beta2 = response.data.b2;
                        this.beta3 = response.data.b3;
                        this.rsquare = response.data.rsquare;
                        this.plot();
                    }
                }, (err) => {
                    console.log(err.data);
                })
        },
        postNSSOne: function () {
            axios.post(`http://127.0.0.1:8000/api/NSS/`, {
                "parameters": JSON.stringify(Array(this.tau0, this.tau1, this.beta0, this.beta1, this.beta2, this.beta3)),
                "row": this.rowNo,
                "dataSet": JSON.stringify(this.getName(this.dataSet))
            })
                .then((response) => {
                    if (response.data.error == "error") {
                        this.rowNo = "Should > 0 ";
                        this.dataSet = "2019 or 2020";
                        this.tau0 = "type in number";
                        this.tau1 = "type in number";
                        this.beta0 = "type in number";
                        this.beta1 = "type in number";
                        this.beta2 = "type in number";
                        this.beta3 = "type innumber";
                    } else {
                        this.rsquare = response.data.rsquare;
                        this.x = response.data.x;
                        this.y = response.data.y;
                        this.y_real = response.data.y_real;
                        this.tau0 = response.data.paras[0];
                        this.tau1 = response.data.paras[1];
                        this.beta0 = response.data.paras[2];
                        this.beta1 = response.data.paras[3];
                        this.beta2 = response.data.paras[4];
                        this.beta3 = response.data.paras[5];
                        this.plot();
                    }
                }, function (err) {
                    console.log(err.data);
                })
        },
        plot: function () {
            var myChart = echarts.init(document.getElementById('charts'));
            option = {
                xAxis: {
                    name: 'time\n(year)',
                    type: 'category',
                    data: this.x
                },
                yAxis: {
                    name: 'yields(%)',
                    type: 'value'
                },
                series: [{
                    data: this.y,
                    type: 'line',
                    smooth: true
                }, {
                    data: this.y_real,
                    type: 'line',
                    smooth: true
                }],
                dataZoom: [{
                    type: "inside"
                }],
                tooltip: {
                    trigger: 'axis'
                },
            };
            myChart.setOption(option);
        },
    },
    template:
        `
<main class="bonds" style="overflow-y: hidden;">
    <div class="left">
        <div id="charts" :style="halfhw"></div>
    </div>
    <div class="right" :style="height">
        <!-- Home -->
        <div class="right-parameters">
            <p>Nelson Siegel Model</p>
            <input type="button" :value="engine" class="bgtrans btn" @click="changeEngine()">
            <br />
            <form id="form001">
                <p>Choose Data</p>
                <label for="ds">DataSet</label>
                <input id="ds" type="text" v-model="dataSet" class="bgtrans">
                <br />
                <label for="rowNo">Date (row)</label>
                <input id="rowNo" type="text" v-model="rowNo" class="bgtrans">
                <br />
                <input id="autoNS" type="button" value="Fit NS(Auto)" class="bgtrans btn" @click="getOne()"
                    title="get one row condition">
                <input id="autoNSS" type="button" value="Fit NSS(Auto)" class="bgtrans btn" @click="getNSSOne()"
                    title="get one row condition" hidden>
                <br />
                <br />
                <p>Parameters</p>
                <label for="tau0">τ0 (tau0)</label>
                <input id="tau0" type="text" v-model="tau0" class="bgtrans">
                <br />
                <label id="tau1label" for="tau1" style="display: none;">τ1 (tau1)</label>
                <input id="tau1" type="text" v-model="tau1" class="bgtrans" hidden>
                <br />
                <label for="beta0">β0 (beta0)</label>
                <input id="beta0" type="text" v-model="beta0" class="bgtrans">
                <br />
                <label for="beta1">β1 (beta1)</label>
                <input id="beta1" type="text" v-model="beta1" class="bgtrans">
                <br />
                <label for="beta2">β2 (beta2)</label>
                <input id="beta2" type="text" v-model="beta2" class="bgtrans">
                <br />
                <label id="beta3label" for="beta3" style="display: none;">β3 (beta3)</label>
                <input id="beta3" type="text" v-model="beta3" class="bgtrans" hidden>
                <br />
                <label for="rs">ΔY^2</label>
                <input id="rs" type="text" v-model="rsquare" class="bgtrans">
                <br />
                <input type="button" value="getAll" class="bgtrans btn" @click="getAll()" title="get optimal parameters"
                    hidden>
                <input id="manualNS" type="button" value="Fit NS(Manual)" class="bgtrans btn" @click="postOne()"
                    title="try one group of parameters">
                <input id="manualNSS" type="button" value="Fit NSS(Manual)" class="bgtrans btn" @click="postNSSOne()"
                    title="try one group of parameters" hidden>
                <input type="button" value="Reset" class="bgtrans btn" @click="clear()">
            </form>
            <p v-text="history"></p>
        </div>
    </div>
</main>
`
})