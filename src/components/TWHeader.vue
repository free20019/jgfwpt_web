<template>
	<div class="tw-header">
		<div class="tw-header-wrapper">
			<div class="tw-header-title"><slot name="title">{{title}}</slot></div>
			<div class="tw-header-tool"><slot name="tool"></slot></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TWHeader",
		props: {
			title: String
		}
	}
</script>

<style lang="scss" scoped>
.tw-header {
	&-wrapper {
		height: 100%;
		box-sizing: border-box;
		/*background-color: #0e87ef;*/
	}
	&-title {
		font-size: 28px;
		line-height: 50px;
		color: #ffffff;
	}
	&-tool {
		position: absolute;
		top: 5px;
		right: 5px;
		height: 40px;
	}
}
</style>