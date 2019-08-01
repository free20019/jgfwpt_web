<!--表格列的故障模块-->
<template>
	<div v-if="systemFault === 1" style="text-align: center;">
		<span :class="formatSystemReviewClassName(systemFault)">故障:</span>
		<div style="display: inline-block; width: 100px; text-align: center;">
			<div v-if="fault === 0">
				<el-button class="tw-table-button" size="mini" @click="handleReviewClick(item)">属实</el-button>
				<el-button class="tw-table-button" size="mini" @click="handleNoReviewClick(item)">不属实</el-button>
			</div>
			<span :class="formatReviewClassName(fault)" v-else>{{formatReviewType(fault)}}</span>
		</div>
	</div>
	<div v-else style="text-align: center;">
		<span :class="formatSystemReviewClassName(systemFault)">无故障</span>
	</div>
</template>

<script>
	export default {
		name: "FaultReview",
		data() {
			return {}
		},
		props: {
			item: Object,
			fault: Number,
			systemFault: Number,
			type: String
		},
		methods: {
			/*事件*/
			handleReviewClick(item) {
				const {fault, systemFault, type} = this;
				this.$confirm('是否确定?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					// 属实操作
					this.$emit('true-review-click', {id: item.id, fault, systemFault, type});
				}).catch(() => {
				});
			},
			handleNoReviewClick(){
				const {fault, systemFault, type} = this;
				this.$confirm('是否确定?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					// 不实操作
					this.$emit('false-review-click', {id: item.id, fault, systemFault, type});
				}).catch(() => {
				});
			},
			/*格式*/
			formatReviewType(type) {
				switch (type) {
					case 0:
						return '未审核';
					case 1:
						return '故障';
					case 2:
						return '无故障';
				}
			},
			formatReviewClassName(type) {
				switch (type) {
					case 0:
						return 'tw-text-info';
					case 1:
						return 'tw-text-error';
					case 2:
						return 'tw-text-success';
				}
			},
			formatSystemReviewClassName(type) {
				switch (type) {
					case 0:
						return 'tw-text-success';
					case 1:
						return 'tw-text-error';
				}
			}
		}
	}
</script>

<style scoped>

</style>