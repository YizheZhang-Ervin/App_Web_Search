<template>
	<section class="whole">
		<!-- libs -->
		<el-card class="w100 scroll-h">
			<div slot="header">
				<span>1.Libs</span>
			</div>
			<div v-for="o in libs" :key="o">
				{{ o }}
			</div>
		</el-card>
		<!-- data -->
		<el-card class="w100 scroll-h">
			<div slot="header">
				<span>2.Stock Data</span>
			</div>
			<div v-for="(v, i) in stockData" :key="i">{{ i }}:{{ v }}</div>
		</el-card>
		<!-- bootstrap -->
		<el-card class="w100 scroll-h">
			<div slot="header">
				<span>3.Bootstrap: confidence interval(5%-95%) of mu</span>
			</div>
			<div v-for="(v, i) in bootstrapMU" :key="i">{{ i }}:{{ v }}</div>
		</el-card>
	</section>
</template>

<script>
const axios = require("axios");
export default {
	name: "Fintech",
	data() {
		return {
			libs: [
				"numpy",
				"pandas",
				"math",
				"random",
				"matplotlib",
				"scipy",
				"pandas_datareader",
				"datetime",
				"seaborn",
			],
			stockData: {
				Open: [1, 2, 3],
				Close: [1, 2, 3],
				High: [1, 2, 3],
				Low: [1, 2, 3],
				Volume: [1, 2, 3],
				"Adj Close": [1, 2, 3],
			},
			bootstrapMU: {
				min: 4,
				max: 5,
			},
		};
	},
	mounted() {},
	methods: {
		getStockData() {
			axios.get(`http://127.0.0.1:5000/api/stockdata`).then(
				(response) => {
					if (response.data.error == "error") {
						console.log("bakend error");
					} else {
						this.algorithm = response.data.result;
					}
				},
				(err) => {
					console.log("frontend error", err);
				}
			);
		},
		getBootStrapRst() {
			axios.get(`http://127.0.0.1:5000/api/bootstrap`).then(
				(response) => {
					if (response.data.error == "error") {
						console.log("bakend error");
					} else {
						this.algorithm = response.data.result;
					}
				},
				(err) => {
					console.log("frontend error", err);
				}
			);
		},
	},
};
</script>

<style scoped>
.whole {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	overflow-y: scroll;
}

.w100 {
	width: 100%;
}

.scroll-h {
	overflow-x: scroll;
}
</style>
