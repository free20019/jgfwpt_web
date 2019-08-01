<!--维修质量报告-->
<template>
	<div class="tw-template-wrapper">
		<div class="tw-template-body">
			<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
				<el-form-item>
					<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
													 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false">
					</el-autocomplete>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQueryClick">查询</el-button>
					<el-button type="primary" @click="handleExportClick">导出</el-button>
				</el-form-item>
			</el-form>
			<div class="tw-query-panel">
				<el-table :data="filterUnlistedVehicleList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%">
					<el-table-column type="index" label="序号" width="60"></el-table-column>
					<el-table-column prop="gsmc" label="公司名称" min-width="280"></el-table-column>
					<el-table-column prop="wxcs" label="维修车辆数" width="140"></el-table-column>
					<el-table-column prop="many" label="满意" width="140"></el-table-column>
					<el-table-column prop="jbmy" label="基本满意" width="140"></el-table-column>
					<el-table-column prop="bmyi" label="不满意" width="140"></el-table-column>
					<el-table-column prop="myzb" label="满意占比" width="140"></el-table-column>
				</el-table>
				<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
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
	import {mapGetters} from 'vuex'

	export default {
		name: "MaintenanceQualityReport",
		data() {
			return {
				query:{
					companyName: '',
					stime: '',
					etime:''
				},
				table: {
					loading: false,
					data: [
						{
							gsmc: '杭州长运三运运输有限公司',
							wxcs: 3530,
							many: 1393,
							jbmy: 1093,
							bmyi: 2923,
							myzb: '45.96%'
						}
					],
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
				vehicleChartOptions: {
					color: ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'],
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						top: 60,
						left: 'center',
						data:['维修数','满意','基本满意','不满意']
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
						boundaryGap: false,
						data: ['2019-01-01', '2019-01-02', '2019-01-03']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '维修数',
							type: 'line',
							smooth: true,
							data: [3530, 2923, 1393, 1393]
						},
						{
							name: '满意',
							type: 'line',
							smooth: true,
							data: [3530, 1423, 3492, 3492]
						},
						{
							name: '基本满意',
							type: 'line',
							smooth: true,
							data: [1393, 3230, 2623, 2623]
						},
						{
							name: '不满意',
							type: 'line',
							smooth: true,
							data: [1093, 4293, 3792, 3792]
						}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment(moment().format('YYYY-MM-DD 00:00:00'));
				this.query.etime = moment(moment().format('YYYY-MM-DD 23:59:59'));
				this.getQualityReport();
				this.getQualityReportEchart();
				window.onresize = () => {
					this.$refs.vehicleChart.resize();
				}
			});
		},
		computed: {
			...mapGetters(['getCompanyName']),
			filterUnlistedVehicleList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage -1;
				return _.filter(data, (item, index) => {
					return  index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			}
		},
		methods: {
			/*接口*/
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			getQualityReport(){
				const {companyName, stime, etime} = this.query;
				this.table.loading = true;
				axios.get('maintenance/qualityreport', {
					baseURL: this.baseURL,
					params: {
						companyName,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')
					}
				}).then(res => {
					this.table.data = _.map(res.data, item => {
						return {
							gsmc: item.COMP_NAME,
							wxcs: item.WXCLS,
							many: item.MY,
							jbmy: item.JBMY,
							bmyi: item.BMY,
							myzb: item.MYZB
						}
					});
					this.table.total = this.table.data.length;
					this.table.currentPage = 1;
					this.table.loading = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			getQualityReportEchart(){
				const {companyName, stime, etime} = this.query;
				axios.get('maintenance/qualityreportechart', {
					baseURL: this.baseURL,
					params: {
						companyName,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')
					}
				}).then(res => {
					// console.info(res.data);
					this.vehicleChartOptions.xAxis.data=[];
					this.vehicleChartOptions.series[0].data=[];
					this.vehicleChartOptions.series[1].data=[];
					this.vehicleChartOptions.series[2].data=[];
					this.vehicleChartOptions.series[3].data=[];
					_.map(res.data, item => {
						this.vehicleChartOptions.xAxis.data.push(item.TIME);
						this.vehicleChartOptions.series[0].data.push(item.WXCLS);
						this.vehicleChartOptions.series[1].data.push(item.MY);
						this.vehicleChartOptions.series[2].data.push(item.JBMY);
						this.vehicleChartOptions.series[3].data.push(item.BMY);
					});
				}).catch(function (error) {
					console.log(error);
				});
			},
			/*事件*/
			handleQueryClick() {
				this.getQualityReport();
				this.getQualityReportEchart();
			},
			handleExportClick() {
				const {companyName, stime, etime} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}maintenance/qualityreportdc?companyName=${companyName}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
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