<template>
	<div class="tw-menu-item" :class="{active: hasActive(data)}">
		<router-link tag="div" class="tw-menu-link" :to="data.href">
			<tw-icon :icon="data.icon"></tw-icon>
			<el-badge :value="hasBadgeItem(data)"  :max="99" class="badge_item" v-if="hasBadgeItem(data)>0">{{data.title}}</el-badge>
			<template v-else>{{data.title}}</template>
		</router-link>
	</div>
</template>

<script>
	import TWIcon from '../TWIcon'

	export default {
		name: "TWMenuItem",
		props: {
			data: Object,
			active: String,
			open: {}
		},
		methods: {
			hasActive(item) {
				const active = this.active;
				const openItem = this.open;
				return active === item.href && (Object.prototype.toString.call(openItem).indexOf('Object') === -1 || active.indexOf(openItem.fullPath) === -1);
				// return Object.prototype.toString.call(openItem).indexOf('Object') === -1 ? active === item.href : active.indexOf(openItem.fullPath) === 0;
			},
			hasBadgeItem(item) {
				console.info("111111111",this.$store.state.auditManage)
				for(let key in this.$store.state.auditManage){
					if(item.title===key&&this.$store.state.auditManage[key]>0){
						return this.$store.state.auditManage[key];
					}
				}
			}
		},
		components: {
			'tw-icon': TWIcon
		}
	}
</script>

<style lang="scss" scoped>
	.tw-menu {
		&-item {
			 height: 40px;
			 font-size: 16px;
			 line-height: 40px;
			 cursor: pointer;

			 &:hover {
				 color: #ffffff;
				 background-color: #4d89ab;
				 background-color: rgba(255, 255, 255, .2);
			 }

			 &.active {
				 color: #ffffff;
				 background-color: #336e90;
				 background-color: rgba(0, 0, 0, 0.2);
			 }
		 }

		&-link {
			padding-left: 10px;
			padding-right: 10px;
			/*overflow: hidden;*/
			/*text-overflow: ellipsis;*/
			white-space: nowrap;
		}
	}
	.tw-icon {
		width: 40px;
		text-align: center;
	}
	.badge_item{
		/*margin-top: 15px;*/
		/*margin-left: 20px;*/
	}
</style>