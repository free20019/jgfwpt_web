<template>
	<div class="tw-layout" :class="[classTemplateType]">
		<div class="tw-layout-header" v-if="hasTop"><slot name="layout-header"></slot></div>
		<div class="tw-layout-left" v-if="hasLeft"><slot name="layout-left"></slot></div>
		<div class="tw-layout-body"><slot></slot></div>
		<div class="tw-layout-right" v-if="hasRight"><slot name="layout-right"></slot></div>
		<div class="tw-layout-footer" v-if="hasBottom"><slot name="layout-footer"></slot></div>
	</div>
</template>

<script>
	export default {
		name: "TWLayout",
		props: {
			type: String
		},
		computed: {
			classTemplateType() {
				if (this.type === 'top') return 'tw-layout-tt';
				else if (this.type === 'top-left' || this.type === 'template') return 'tw-layout-ttl';
				else if (this.type === 'top-left-right') return 'tw-layout-ttlr';
				else if (this.type === 'top-left-right-bottom') return 'tw-layout-ttlrb';
				else if (this.type === 'top-right') return 'tw-layout-ttr';
				else if (this.type === 'top-bottom') return 'tw-layout-ttb';
				else if (this.type === 'left-right') return 'tw-layout-tlr';
				else if (this.type === 'left-right-bottom') return 'tw-layout-tlrb';
				else if (this.type === 'left-bottom') return 'tw-layout-tlb';
				else if (this.type === 'right') return 'tw-layout-tr';
				else if (this.type === 'right-bottom') return 'tw-layout-trb';
				else if (this.type === 'bottom') return 'tw-layout-tb';
				else return 'tw-layout-tl';
			},
			hasTop() {
				return this.type && !!this.type.indexOf('top') >= 0;
			},
			hasLeft() {
				return this.type && !!this.type.indexOf('left') >= 0 || !this.type;
			},
			hasRight() {
				return this.type && !!this.type.indexOf('right') >= 0;
			},
			hasBottom() {
				return this.type && !!this.type.indexOf('bottom') >= 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$headerHeight: 50px;
	$leftWidth: 240px;
	$rightWidth: 300px;
	.tw-layout {
		height: 100%;

		&-body {
			width: 100%;
			height: 100%;
		}
		&-tt{
			.tw-layout-header {
				height: $headerHeight;
			}
			.tw-layout-body {
				height: calc(100% - #{$headerHeight});
			}
		}
		&-ttl {
			position: relative;
			.tw-layout-header {
				height: $headerHeight;
			}

			.tw-layout-left {
				position: absolute;
				top: $headerHeight;
				left: 0;
				width: $leftWidth;
				height: calc(100% - #{$headerHeight});
			}

			.tw-layout-body {
				width: calc(100% - #{$leftWidth});
				height: calc(100% - #{$headerHeight});
				margin-left: $leftWidth;
			}
		}
		&-tl {
			position: relative;

			.tw-layout-left {
				position: absolute;
				top: 0;
				left: 0;
				width: $leftWidth;
				height: 100%;
			}

			.tw-layout-body {
				width: calc(100% - #{$leftWidth});
				height: 100%;
				margin-left: $leftWidth;
			}
		}
		&-tr {
			position: relative;

			.tw-layout-right {
				position: absolute;
				top: 0;
				right: 0;
				width: $rightWidth;
				height: 100%;
			}

			.tw-layout-body {
				width: calc(100% - #{$rightWidth});
				height: 100%;
				margin-right: $rightWidth;
			}
		}
	}
</style>