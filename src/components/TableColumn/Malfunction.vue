<template>
	<tw-icon class="faultJudgment" :class="formatReviewClassName(fault)" :icon="formatFaultJudgment(fault)"></tw-icon>
</template>

<script>
	import TWIcon from '../TWIcon'
	export default {
		name: "Malfunction",
		props: {
			fault: Number
		},
		methods: {
			/*格式*/
			formatFaultJudgment(type) {
				console.info('formatFaultJudgment:', type)
				switch (type) {
					case 0:
						return 'icon-true';
					case 1:
						return 'icon-false';
					default:
						return '';
				}
			},
			formatReviewClassName(type) {
				switch (type) {
					case 0:
						return 'tw-text-success';
					case 1:
						return 'tw-text-error';
				}
			}
		},
		components: {
			'tw-icon': TWIcon
		}
	}
</script>

<style lang="scss" scoped>
	.faultJudgment {
		line-height: 18px;
	}
</style>