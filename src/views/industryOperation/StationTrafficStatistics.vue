<!--场站流量统计-->
<template>
	<div class="tw-template-wrapper">
		<div class="tw-template-body">
			<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
				<el-form-item>
					<tree-select class="tw-tree-select tw-line" v-model="query.depot" :multiple="true" :options="getDepotName" placeholder="场站"/>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-select v-model="query.type" placeholder="无重复">
						<el-option v-for="item in typePeriodOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQueryClick">查询</el-button>
					<el-button type="primary" @click="handleExportClick">导出</el-button>
				</el-form-item>
			</el-form>
			<div class="tw-query-panel">
				<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
					<el-table-column type="index" label="序号" width="60"></el-table-column>
					<el-table-column prop="chzh" label="场站" min-width="280"></el-table-column>
					<el-table-column prop="sjli" label="数据量" width="160"></el-table-column>
				</el-table>
				<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
			</div>
		</div>
		<div class="tw-template-right">
			<v-chart class="vehicleChart" v-loading="table.loading" :options="vehicleChartOptions" ref="vehicleChart"/>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import TreeSelect from '@riophae/vue-treeselect'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'
	import {mapGetters} from "vuex";

	export default {
		name: "StationTrafficStatistics",
		data() {
			let config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15
			};
			let labelOption = {
				normal: {
					show: true,
					position: config.position,
					distance: config.distance,
					align: config.align,
					verticalAlign: config.verticalAlign,
					rotate: config.rotate,
					formatter: '{c}  {name|{a}}',
					fontSize: 16,
					rich: {
						name: {
							textBorderColor: '#fff'
						}
					}
				}
			};
			return {
				query: {
					depot: [],
					stime: '',
					etime: '',
					type: 0
				},
				typePeriodOption: [
					{label: '不限', value: 0},
					{label: '1分钟内无重复', value: 1},
					{label: '5分钟内无重复', value: 5}
				],
				table: {
					loading: false,
					data: [],
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
				vehicleChartOptions: {
					color: ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						top: 20,
						data: ['数据量']
					},
					toolbox: {},
					grid: [
						{
							top: 60,
							left: 20,
							right: 20,
							bottom: 10,
							containLabel: true
						}
					],
					calculable: true,
					xAxis: [
						{
							type: 'category',
							axisTick: {show: false},
							axisLabel: {
								interval: 0,
								rotate: 30
							},
							data: ['三墩', '九堡客运中心', '城站火车站', '机场', '汽车西站', '火车东站北通道', '火车东站南通道']
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '数据量',
							type: 'bar',
							barGap: 0,
							label: labelOption,
							data: [320, 332, 301, 334, 390, 334, 390]
						}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
				this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
				this.getStationTraffic();
				window.onresize = () => {
					this.$refs.vehicleChart.resize();
				}
			});
		},
		computed: {
			...mapGetters(['getDepotName']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage -1;
				return _.filter(data, (item, index) => {
					return  index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			}
		},
		methods: {
			/*数据接口*/
			getStationTraffic(){
				this.table.loading = true;
				const {depot, stime, etime, type} = this.query;
				axios.get('capture/stationtraffic', {
					baseURL: this.baseURL,
					params: {
						depot:depot.toString(),
						stime:stime && formatDateTime(stime),
						etime: etime && formatDateTime(etime),
						type
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							chzh: item.ADDRESS,
							sjli: item.COUNT
						}
					});
					this.vehicleChartOptions.xAxis[0].data=[];
					this.vehicleChartOptions.series[0].data=[];
					_.map(res.data,item=>{
						this.vehicleChartOptions.xAxis[0].data.push(item.ADDRESS);
						this.vehicleChartOptions.series[0].data.push(item.COUNT);
					});
					this.table.total = this.table.data.length;
					this.table.currentPage = 1;
					this.table.loading = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			/*事件*/
			handleQueryClick() {
				this.getStationTraffic();
			},
			handleAlarmIssuedClick() {},
			handleExportClick() {
				const {depot, stime, etime, type} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}capture/stationtrafficdc?depot=${depot}&stime=${stime && formatDateTime(stime)}&etime=${etime && formatDateTime(etime)}&type=${type}`);
				}).catch(() => {});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		},
		components: {
			'tree-select': TreeSelect
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
			right: -600px;
			width: 800px;
			background-color: #ffffff;
			transition: box-shadow .5s ease, right .5s ease .2s;
			z-index: 10;

			&:hover {
				right: 0;
				box-shadow: -2px 0 6px #aaaaaa;
			}
		}
	}
	.tw-query {
		&-panel {
			height: calc(100% - 54px);
		}
	}
	.vehicleChart {
		width: 100%;
		height: 100%;
	}
</style>