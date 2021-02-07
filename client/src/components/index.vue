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
			<el-menu-item index="1" @click="changeShow('fintech')">
				<i class="el-icon-s-home"></i>
				<span slot="title">Home</span>
			</el-menu-item>
			<!-- fintech -->
			<el-submenu index="2" collapse="false">
				<template slot="title">
					<i class="el-icon-s-marketing"></i>
					<span>FinTech</span>
				</template>
				<el-menu-item-group>
					<template slot="title">Algorithms</template>
					<el-menu-item index="2-1" @click="changeShow('code1')">
						<i class="el-icon-s-flag"></i>
						<span slot="title">CTA</span>
					</el-menu-item>
					<el-menu-item index="2-2" @click="changeShow('code2')">
						<i class="el-icon-s-flag"></i>
						<span slot="title">Options</span>
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
			<el-backtop></el-backtop>
		</main>
	</div>
</template>

<script>
import Group from "./group.vue";
import Fintech from "./fintech.vue";

export default {
	name: "Home",
	components: {
		Group,
		Fintech,
	},
	data: function() {
		return {
			menuCollapse: true,
			groupShow: false,
			fintechShow: true,
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
			} else if (index == "fintech") {
				this.groupShow = false;
				this.fintechShow = true;
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
