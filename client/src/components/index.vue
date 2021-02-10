<template>
	<div class="whole">
		<!-- left navigation bar -->
		<el-menu
			:style="left"
			default-active="1"
			background-color="#2b2b2b"
			text-color="#fff"
			active-text-color="gold"
			:collapse="menuCollapse"
		>
			<!-- home -->
			<el-menu-item index="1" @click="changeShow('charts')">
				<i class="el-icon-s-home"></i>
				<span slot="title">Home</span>
			</el-menu-item>
			<!-- fintech -->
			<el-submenu index="2" collapse="false">
				<template slot="title">
					<i class="el-icon-monitor"></i>
					<span>Terminal</span>
				</template>
				<el-menu-item-group>
					<template slot="title">Terminal</template>
					<el-menu-item index="2-1" @click="changeShow('python')">
						<i class="el-icon-s-flag"></i>
						<span slot="title">Python</span>
					</el-menu-item>
					<el-menu-item index="2-2" @click="changeShow('sql')">
						<i class="el-icon-s-flag"></i>
						<span slot="title">SQL</span>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- group -->
			<el-menu-item index="3" @click="changeShow('group')">
				<i class="el-icon-user"></i>
				<span slot="title">Group</span>
			</el-menu-item>
			<!-- collapse -->
			<el-menu-item index="4" @click="changeMenuCollapse">
				<i class="el-icon-s-fold"></i>
				<span slot="title">Hide</span>
			</el-menu-item>
		</el-menu>
		<main :style="main">
			<!-- components -->
			<Fintech v-show="fintechShow"></Fintech>
			<Group v-show="groupShow"></Group>
			<Coding v-show="codingShow"></Coding>
			<el-backtop></el-backtop>
		</main>
	</div>
</template>

<script>
import Group from "./group.vue";
import Fintech from "./fintech.vue";
import Coding from './coding.vue';

export default {
	name: "Home",
	components: {
		Group,
		Fintech,
		Coding,
	},
	data: function() {
		return {
			menuCollapse: true,
			groupShow: false,
			fintechShow: true,
			codingShow:false,
			left:{height: this.getHeight()+ 'px'},
			main:{width: (this.getWidth()-65)+ 'px',height: this.getHeight()+ 'px'}
		};
	},
	mounted() {
		setInterval(() => {
			this.checkVisibility();
		}, 1000);
	},
	methods: {
		getWidth(){
			return parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
		},
		getHeight(){
			return parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
		},
		checkVisibility: function() {
			let vs = document.visibilityState;
			let date = new Date(Date.now());
			if (vs == "visible") {
				document.title =
					"YeStock - " +
					date.getHours() +
					":" +
					date.getMinutes() +
					":" +
					date.getSeconds();
			}
		},
		changeMenuCollapse() {
			this.menuCollapse = !this.menuCollapse;
		},
		changeShow(index) {
			if (index == "group") {
				this.groupShow = true;
				this.fintechShow = false;
				this.codingShow = false;
			} else if (index == "charts") {
				this.groupShow = false;
				this.fintechShow = true;
				this.codingShow = false;
			} else if (index == "python") {
				this.groupShow = false;
				this.fintechShow = false;
				this.codingShow = true;
			} else if (index == "sql") {
				this.groupShow = false;
				this.fintechShow = false;
				this.codingShow = true;
			}
		},
	},
};
</script>

<style scoped>
.whole {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
