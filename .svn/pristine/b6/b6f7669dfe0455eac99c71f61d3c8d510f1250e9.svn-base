<!--月度安装分析-->
<template>
	<div class="tw-template-wrapper">
		<div class="tw-template-body">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-date-picker v-model="query.stime" type="month" placeholder="开始日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="query.etime" type="month" placeholder="结束日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="100%" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="time" label="月份" width="120"></el-table-column>
				<el-table-column prop="count1" label="车辆总数/辆" width="120"></el-table-column>
				<el-table-column prop="count2" label="已安装/辆" width="120"></el-table-column>
				<el-table-column prop="count3" label="新增安装数/辆" width="120"></el-table-column>
				<el-table-column prop="count4" label="新增占比" width="120"></el-table-column>
				<el-table-column prop="count5" label="已安装占比" min-width="120"></el-table-column>
			</el-table>
		</div>
		</div>
		<div class="tw-template-right">
			<v-chart class="vehicleChart" :options="vehicleChartOptions" ref="vehicleChart" />
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import ECharts from 'vue-echarts'

	export default {
		name: "MonthlyInstallationAnalysis",
		data() {
			return {
				query:{
					stime: '',
					etime:''
				},
				table: {
					loading: false,
					data: []
				},
				vehicleChartOptions: {
					color: ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'],
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						top: 60,
						left: 'center',
						data:['车辆总数','已安装数','新增数','不满意']
					},
					grid: {
						top: 90,
						left: 20,
						right: 40,
						bottom: 20,
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '车辆总数',
							type: 'line',
							smooth: true,
							data: []
						},
						{
							name: '已安装数',
							type: 'line',
							smooth: true,
							data: []
						},
						{
							name: '新增数',
							type: 'bar',
							smooth: true,
							data: []
						}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment().format('YYYY-MM');
				this.query.etime = moment().format('YYYY-MM');
				this.getMonthInstallAnalysis();
				window.onresize = () => {
					this.$refs.vehicleChart.resize();
				}
			});
		},
			/*接口*/
			methods: {
				getMonthInstallAnalysis(){
					this.table.loading = true;
					const {stime, etime} = this.query;
					axios.get('servicePlatformUsage/getMonthInstallAnalysis', {
						baseURL: this.baseURL,
						params: {
							stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
							etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')
						}
					}).then(res => {
						this.table.data = res.data || [];
						this.table.currentPage = 1;
						this.table.total = this.table.data.length;
						this.vehicleChartOptions.xAxis.data=[];
						this.vehicleChartOptions.series[0].data=[];
						this.vehicleChartOptions.series[1].data=[];
						this.vehicleChartOptions.series[2].data=[];
						this.table.loading = false;
						_.map(res.data, item => {
							this.vehicleChartOptions.xAxis.data.push(item.time);
							this.vehicleChartOptions.series[0].data.push(item.count1);
							this.vehicleChartOptions.series[1].data.push(item.count2);
							this.vehicleChartOptions.series[2].data.push(item.count3);
						});
					})
				},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getMonthInstallAnalysis();
			}
			},
		components: {
			'v-chart': ECharts
		}
	}
</script>

<style lang="scss" scoped>
	.tw-template {
		&-wrapper {
			overflow: hidden;
		}

		&-body {
			width: calc(100% - 200px);
		}

		&-right {
			right: -400px;
			width: 600px;
			background-color: #ffffff;
			transition: box-shadow .5s ease, right .5s ease .2s;
			z-index: 10;

			&:hover {
				right: 0;
				box-shadow: -2px 0 6px #aaaaaa;
			}
		}
	}
	.vehicleChart {
		width: 100%;
		height: 100%;
	}
</style>