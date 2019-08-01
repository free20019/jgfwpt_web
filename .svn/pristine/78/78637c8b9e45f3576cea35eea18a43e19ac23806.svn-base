<!--维修记录统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
								 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false">

				</el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false">

				</el-autocomplete>
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
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
				<el-button type="primary" @click="handleExportClick">导出</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterUnlistedVehicleList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" min-width="180"></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="140"></el-table-column>
				<el-table-column prop="area" label="区域" width="240"></el-table-column>
				<el-table-column prop="wxcs" label="维修次数" width="140"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from "vuex";

	export default {
		name: "MaintenanceRecordStatistics",
		data() {
			return {
				query:{
					vehicle: '',
					companyName: '',
					area:'',
					stime: '',
					etime:''
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
				this.query.stime = moment(moment().format('YYYY-MM-DD 00:00:00'));
				this.query.etime = moment(moment().format('YYYY-MM-DD 23:59:59'));
				this.getRecordStatistics();
			});
		},
		computed: {
			...mapGetters(['getCompanyName','getLPNumber','getRegionReal']),
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
			queryVehicleSearch(query, cb) {
				if (query.length < 3) cb(null);
				else
					cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			getRecordStatistics(){
				const {vehicle, companyName,area, stime, etime} = this.query;
				this.table.loading = true;
				axios.get('maintenance/recordstatistics', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						companyName,
						area,
						stime: stime&&moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime&&moment(etime).format('YYYY-MM-DD HH:mm:ss')
					}
				}).then(res => {
					console.info(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							gsmc: item.COMP_NAME,
							cphm: item.VEHI_NO,
							area: item.AREA_NAME,
							wxcs: item.COUNT
						}
					});
					this.table.total = this.table.data.length;
					this.table.currentPage = 1;
					this.table.loading = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			/*事件*/
			handleQueryClick() {
				this.getRecordStatistics();
			},
			handleExportClick() {
				const {vehicle, companyName, area, stime, etime} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}maintenance/recordstatisticsdc?vehicle=${vehicle}&companyName=${companyName}&area=${area}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		}
	}
</script>

<style scoped>

</style>