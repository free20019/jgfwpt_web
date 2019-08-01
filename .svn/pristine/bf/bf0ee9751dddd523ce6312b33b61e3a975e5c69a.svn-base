<!--报停车辆统计-->
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
				<el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60" align="center" :resizable="false" fixed></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="140" align="center" fixed></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" width="280" header-align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="area" label="区域" width="240"></el-table-column>
				<el-table-column prop="btcs" label="报停次数" min-width="120" align="center" :resizable="false"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import {formatDateTime} from "../../assets/js/util";

	export default {
		name: "ReportingVehicleStatistics",
		data() {
			return {
				query: {
					vehicle: '',
					companyName: '',
					stime: '',
					etime: '',
					area: ''
				},
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
				this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.getStopStatistics();
			});
		},
		computed: {
			...mapGetters(['getLPNumber', 'getCompanyName', 'getRegionReal']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage - 1;
				return _.filter(data, (item, index) => {
					return index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			}
		},
		methods: {
			/*接口*/
			queryVehicleSearch(query, cb) {
				if (query.length < 3) cb(null);
				else cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			getStopStatistics(){
				this.table.loading = true;
				const {vehicle, companyName, area, stime, etime} = this.query;
				axios.get('area/stopstatistics', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						companyName,
						area,
						stime:stime && formatDateTime(stime),
						etime:etime && formatDateTime(etime)
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							cphm: item.VEHICLE_NO,
							gsmc: item.COMPANY_NAME,
							area:item.AREA_NAME,
							btcs: item.COUNT
						}
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
				this.table.currentPage = 1;
				this.getStopStatistics();
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		}
	}
</script>

<style scoped>

</style>