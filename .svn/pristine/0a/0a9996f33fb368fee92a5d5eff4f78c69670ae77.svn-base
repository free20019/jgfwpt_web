<template>
	<div class="tw-menu">
		<template v-for="item in data">
			<tw-menu-group :data="item" :active="selectRouterPath" :open="openPanel" @change-open="changeOpenPanel" v-if="hasPathChildren(item)"></tw-menu-group>
			<tw-menu-item :data="item" :active="selectRouterPath" :open="openPanel" @click.native="handlerMenuTitleClick" v-else></tw-menu-item>
		</template>
	</div>
</template>

<script>
	import _ from 'underscore'
	import TWMenuGroup from './TWMenuGroup'
	import TWMenuItem from './TWMenuItem'

	export default {
		name: "TWMenu",
		data() {
			return {
				active: '',
				openPanel: {}
			}
		},
		props: {
			data: Array,
			height: String,
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(()=>{
					const menuList = this.data;
					this.openPanel = _.map(_.filter(menuList, item => item.fullPath && this.selectRouterPath.indexOf(`${item.fullPath}`) === 0), item => {
						return {id: item.id, title: item.title, fullPath: item.fullPath}
					})[0] || {};
				}, 0)
			});
		},
		computed: {
			selectRouterPath() {
				return this.$route.path;
			}
		},
		methods: {
			changeOpenPanel(item) {
				this.active = '';
				this.openPanel = item;
			},
			handlerMenuTitleClick() {
				this.openPanel = {};
			},
			hasPathChildren(item) {
				return item.children && item.children.length > 0;
			}
		},
		watch: {
			'$route'(value) {
				this.active = value.path;
			}
		},
		components: {
			'tw-menu-group': TWMenuGroup,
			'tw-menu-item': TWMenuItem
		}
	}
</script>

<style lang="scss" scoped>
	.tw-menu {
		height: 100%;
		color: #cccccc;
	}
</style>