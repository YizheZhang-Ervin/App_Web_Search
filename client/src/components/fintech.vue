<template>
	<section class="whole">
		<div class="scrolled">
			<!-- chart 1 -->
			<el-card class="w100">
				<div slot="header" class="flex">
					<span>Chart 1</span>
					<div class="atend">
						<el-select v-model="col1" placeholder="Choose column 1" style="width:20%;" @change="getData">
							<el-option v-for="item in cols" :key="item" :label="item" :value="item"> </el-option>
						</el-select>
						<el-select v-model="col2" placeholder="Choose column 2" style="width:20%;" @change="getData">
							<el-option v-for="item in cols" :key="item" :label="item" :value="item"> </el-option>
						</el-select>
						<el-input style="width:20%;" @change="getData" placeholder="Type in stock name" v-model="stockname" clearable></el-input>
					</div>
				</div>
				<div id="chart1" class="charts"></div>
			</el-card>
			<!-- chart 2 -->
			<el-card class="w100">
				<div slot="header">
					<span>Chart 2</span>
				</div>
				<div id="chart2" class="charts"></div>
			</el-card>
		</div>
	</section>
</template>

<script>
const axios = require("axios");
var echarts = require("echarts");

export default {
	name: "Fintech",
	data() {
		return {
			chartData: {
				x: [],
				y: [],
				y2: [],
			},
			stockname: "",
			col1: "",
			col2: "",
			cols: ["High", "Low", "Open", "Close", "Adj Close", "Volume"],
		};
	},
	mounted() {},
	methods: {
		getData() {
			axios.get(`http://127.0.0.1:5000/api/${this.stockname}?col1=${this.col1}&col2=${this.col2}`).then(
				(response) => {
					if (response.data.error == "error") {
						console.log("bakend error");
					} else {
						this.chartData = response.data;
						this.plotChart1();
						this.plotChart2();
					}
				},
				(err) => {
					console.log("frontend error", err);
				}
			);
		},
		plotChart1() {
			let myChart = echarts.init(document.getElementById("chart1"));
			let option = {
				xAxis: {
					name: "Axis-X",
					type: "category",
					data: this.chartData.x,
				},
				yAxis: {
					name: "Axis-Y",
					type: "value",
				},
				series: [
					{
						data: this.chartData.y,
						type: "line",
						smooth: true,
					},
					{
						data: this.chartData.y2,
						type: "line",
						smooth: true,
					},
				],
				dataZoom: [
					{
						type: "inside",
					},
				],
				tooltip: {
					trigger: "axis",
				},
			};
			myChart.setOption(option);
		},
		plotChart2() {
			let myChart = echarts.init(document.getElementById("chart2"));
			let option = {
				xAxis: {
					name: "Axis-X",
					type: "category",
					data: this.chartData.x,
				},
				yAxis: {
					name: "Axis-Y",
					type: "value",
				},
				series: [
					{
						data: this.chartData.y,
						type: "line",
						smooth: true,
					},
					{
						data: this.chartData.y2,
						type: "line",
						smooth: true,
					},
				],
				dataZoom: [
					{
						type: "inside",
					},
				],
				tooltip: {
					trigger: "axis",
				},
			};
			myChart.setOption(option);
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
	height: 100vh;
	width: 100%;
}

.flex {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.atend {
	display: flex;
	justify-content: flex-end;
}

.w100 {
	width: 100%;
}

.charts {
	min-height: 50vh;
}

.scrolled {
	overflow-y: scroll;
	width: 100%;
}
</style>
