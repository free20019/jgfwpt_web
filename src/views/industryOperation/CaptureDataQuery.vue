<!--抓拍数据查询-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
												 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.area" placeholder="区域">
					<el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<tree-select class="tw-tree-select tw-line" v-model="query.depot" :multiple="true" :options="getDepotName" placeholder="场站"/>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.timePeriod" placeholder="时间段" @change="handleTimePeriodChange">
					<el-option v-for="item in timePeriodOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="query.stime" :type="dateType" placeholder="开始日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="query.etime" :type="dateType" placeholder="结束日期"></el-date-picker>
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
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" min-width="280"></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" min-width="140"></el-table-column>
				<el-table-column prop="area" label="区域" width="240"></el-table-column>
				<el-table-column prop="chzh" label="场站" min-width="280"></el-table-column>
				<el-table-column prop="shji" label="时间" width="160"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import TreeSelect from '@riophae/vue-treeselect'
	import TWUnit from '../../components/TWTableColumn/TWUnit'
	import {formatCustomizeDate, formatDate, formatDateTime} from '../../assets/js/util'
	import {mapGetters} from "vuex";

	export default {
		name: "CaptureDataQuery",
		data() {
			return {
				query: {
					vehicle: '',
					companyName: '',
					area:'',
					depot: [],
					timePeriod: 0,
					stime: '',
					etime: '',
					type: 0
				},
				dateType: 'datetime',
				timePeriodOption: [
					{label: '自定义时间', value: 0},
					{label: '全天', value: 1},
					{label: '21:00:00~02:00:00', value: '21:00:00~02:00:00'}
				],
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
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
				this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
				this.getCaptureData();
			});
		},
		computed: {
			...mapGetters(['getDepotName','getLPNumber','getCaptureCompanyName','getRegionReal']),
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
			queryVehicleSearch(query, cb) {
				if (query.length < 3) cb(null);
				else
					cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCaptureCompanyName, item => item.label.indexOf(query) > -1));
			},
			getCaptureData(){
				this.table.loading = true;
				const {vehicle, companyName, area,depot, timePeriod, stime, etime, type} = this.query;
				const {currentPage,pageSize} = this.table;
				axios.get('capture/capturedata', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						companyName,
						area,
						depot:depot.toString(),
						timePeriod,
						stime: timePeriod===0?stime && formatDateTime(stime):stime && formatDate(stime),
						etime: timePeriod===0?etime && formatDateTime(etime):etime && formatDate(etime),
						type,
						currentPage,
						pageSize
					}
				}).then(res => {
					console.log(res.data.datas);
					this.table.data = _.map(res.data.datas, item => {
						return {
							gsmc: item.COMPANY_NAME,
							cphm: item.VEHICLE_NO,
							area: item.AREA_NAME,
							chzh: item.ADDRESS,
							shji: item.DBTIME
						}
					});
					this.table.total = res.data.count;
					// this.table.total = this.table.data.length;
					// this.table.currentPage = 1;
					this.table.loading = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			/*事件*/
			handleTimePeriodChange() {
				switch (this.query.timePeriod) {
					case 0:
						this.dateType = 'datetime';
						this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
						this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
						break;
					case 1:
						this.dateType = 'date';
						this.query.stime = formatDate(moment());
						this.query.etime = formatDate(moment());
						break;
					case '21:00:00~02:00:00':
						this.dateType = 'date';
						this.query.stime = formatDate(moment().subtract(1, 'days'));
						this.query.etime = formatDate(moment().subtract(1, 'days'));
						break;
				}
			},
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getCaptureData();
			},
			handleExportClick() {
				const {vehicle, companyName,area, depot, timePeriod, stime, etime, type} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}capture/capturedatadc?vehicle=${vehicle}&companyName=${companyName}&area=${area}&depot=${depot}&timePeriod=${timePeriod}
								&stime=${timePeriod===0?stime && formatDateTime(stime):stime && formatDate(stime)}&etime=${timePeriod===0?etime && formatDateTime(etime):etime && formatDate(etime)}&type=${type}`);
				}).catch(() => {
				});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getCaptureData();
			}
		},
		components: {
			'tree-select': TreeSelect,
			'tw-unit': TWUnit
		}
	}
</script>

<style lang="scss" scoped>
	.tw-query-panel {
		height: calc(94% - 53px);
	}
</style>