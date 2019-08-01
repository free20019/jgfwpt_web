<!--未按时回场车辆查询-->
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
				<el-input v-model="query.count" placeholder="逾期天数(整数)"></el-input>
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
				<el-table-column type="index" label="序号" width="60" :resizable="false" fixed></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="140" fixed></el-table-column>
				<el-table-column prop="ssgs" label="所属公司" width="280" show-overflow-tooltip></el-table-column>
				<el-table-column prop="hcqy" label="回场区域" width="240"></el-table-column>
				<el-table-column prop="area" label="区域" width="180"></el-table-column>
				<el-table-column prop="hcss" label="上次回场时间" width="150"></el-table-column>
				<el-table-column label="回场间隔" width="150">
					<template slot-scope="scope">
						<tw-unit :data="scope.row.hcjg" unit="天"></tw-unit>
					</template>
				</el-table-column>
				<el-table-column label="逾期天数" min-width="160" :resizable="false">
					<template slot-scope="scope">
						<tw-unit :data="scope.row.yqts" unit="天"></tw-unit>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import {formatDateTime} from "../../assets/js/util";
	import TWUnit from "../../components/TWTableColumn/TWUnit";

	export default {
		name: "FailureReturnVehicleOnTime",
		data() {
			return {
				query:{
					vehicle: '',
					companyName: '',
					area: '',
					count:'',
					stime: '',
					etime:''
				},
				companyList: [],
				table: {
					loading: false,
					data: [],
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
			}
		},
		mounted() {
			this.$nextTick(() => {
				// this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				// this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.getReturnVehicleOnTime();
			});
		},
		computed: {
			...mapGetters(['getLPNumber', 'getCompanyName','getRegionReal']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage - 1;
				return _.filter(data, (item, index) => {
					return  index >= pageIndex * pageSize && index < currentPage * pageSize;
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
			getReturnVehicleOnTime(){
				this.table.loading = true;
				const {vehicle, companyName, area, count, stime, etime} = this.query;
				axios.get('area/returnvehicleontime', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						companyName,
						area,
						count,
						stime:stime && formatDateTime(stime),
						etime:etime && formatDateTime(etime)
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							cphm: item.VEHICLE_NO,
							ssgs: item.COMPANY_NAME,
							hcqy:item.AREA_NAME,
							area:item.AREA,
							hcss: item.HCSJ,
							hcjg: item.RETURN_TIME,
							yqts: item.YQTS,
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
				this.getReturnVehicleOnTime();
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		},
		components: {
			'tw-unit': TWUnit
		}
	}
</script>

<style scoped>

</style>