<!--分段流量统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<tree-select class="tw-tree-select tw-line" v-model="query.depot" :multiple="true" :options="depotNameOption" placeholder="场站"/>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="query.time" type="date" placeholder="日期"></el-date-picker>
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
				<el-table-column prop="chzh" label="场站" min-width="200"></el-table-column>
				<el-table-column prop="sjd0" label="00:00-02:00" width="100"></el-table-column>
				<el-table-column prop="sjd1" label="02:00-04:00" width="100"></el-table-column>
				<el-table-column prop="sjd2" label="04:00-06:00" width="100"></el-table-column>
				<el-table-column prop="sjd3" label="06:00-08:00" width="100"></el-table-column>
				<el-table-column prop="sjd4" label="08:00-10:00" width="100"></el-table-column>
				<el-table-column prop="sjd5" label="10:00-12:00" width="100"></el-table-column>
				<el-table-column prop="sjd6" label="12:00-14:00" width="100"></el-table-column>
				<el-table-column prop="sjd7" label="14:00-16:00" width="100"></el-table-column>
				<el-table-column prop="sjd8" label="16:00-18:00" width="100"></el-table-column>
				<el-table-column prop="sjd9" label="18:00-20:00" width="100"></el-table-column>
				<el-table-column prop="sjd10" label="20:00-22:00" width="100"></el-table-column>
				<el-table-column prop="sjd11" label="22:00-24:00" width="100"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
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
	import {mapGetters} from 'vuex'
	import {formatDate} from '../../assets/js/util'

	export default {
		name: "SegmentedTrafficStatistics",
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
					time: '',
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
						trigger: 'axis'
					},
					legend: {
						top: 20,
						data:[]
					},
					grid: {
							top: 60,
							left: 20,
							right: 20,
							bottom: 40,
							containLabel: true
						},
					xAxis : [
						{
							axisTick: {
								alignWithLabel: true
							},
							type : 'category',
							name : '时间',
							data : ['0-2','2-4','4-6','6-8','8-10','10-12','12-14','14-16','16-18','18-20','20-22','22-24']
						},
					],
					yAxis: [
						{
							type: 'value',
						}
					],
					series: [
						{
							type:'line',
							data:[]
						}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.time = formatDate(moment());
				this.getSegmentedTraffic();
				window.onresize = () => {
					this.$refs.vehicleChart.resize();
				}
			});
		},
		computed: {
			...mapGetters(['getDepotName']),
			depotNameOption() {
				return this.getDepotName;
			},
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
			getSegmentedTraffic(){
				this.table.loading = true;
				const {depot, time, type} = this.query;
				axios.get('capture/segmentedtraffic', {
					baseURL: this.baseURL,
					params: {
						depot:depot.toString(),
						time: time && formatDate(time),
						type
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							chzh: item.ADDRESS,
							sjd0: item.C0,
							sjd1: item.C1,
							sjd2: item.C2,
							sjd3: item.C3,
							sjd4: item.C4,
							sjd5: item.C5,
							sjd6: item.C6,
							sjd7: item.C7,
							sjd8: item.C8,
							sjd9: item.C9,
							sjd10: item.C10,
							sjd11: item.C11
						}
					});
					this.vehicleChartOptions.legend.data=[];
					_.each(this.vehicleChartOptions.series, item => {
						item.data = [];
						item.name = '';
					});
					// this.vehicleChartOptions.series=[];
					_.map(res.data,(item)=>{
						let a=[];
						_.map(item,(item)=>{
							item!=='ADDRESS'?a.push(item):item;
						});
						this.vehicleChartOptions.series.push({type:'line',data:a,name:item.ADDRESS});
						this.vehicleChartOptions.legend.data.push(item.ADDRESS);
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
				this.getSegmentedTraffic();
			},
			handleExportClick() {
				// this.vehicleChartOptions.series = [];
				_.each(this.vehicleChartOptions.series, item => {
					item.data = [];
				});
				console.info(this.vehicleChartOptions.series)
				const {depot,time, type} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}capture/segmentedtrafficdc?depot=${depot}&time=${time && formatDate(time)}&type=${type}`);
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