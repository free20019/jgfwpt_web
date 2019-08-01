<!--单车营运情况-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.vehicle"
												 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false" placeholder="请输入车牌号码"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-date-picker arrow-control type="datetime" v-model="query.sTime" placeholder="开始时间"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker arrow-control type="datetime" v-model="query.eTime" placeholder="结束时间"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.region" placeholder="区域">
					<el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
				<el-table-column prop="CPHM_NEW" label="车牌号码" min-width="140"></el-table-column>
				<el-table-column prop="YINGYUN" label="服务资格证号" width="140"></el-table-column>
				<el-table-column prop="SHANGCHE" label="上车时间" width="180"></el-table-column>
				<el-table-column prop="XIACHE" label="下车时间" width="160"></el-table-column>
				<el-table-column prop="YYSJ" label="营运时间/分钟" width="160"></el-table-column>
				<el-table-column prop="JICHENG" label="载客里程/公里" width="140"></el-table-column>
				<el-table-column prop="KONGSHI" label="空车里程/公里" width="140"></el-table-column>
				<el-table-column prop="DENGHOU" label="等候时间/分钟" width="140"></el-table-column>
				<el-table-column prop="JIAOYITYPE" label="交易类型" width="140"></el-table-column>
				<el-table-column prop="JINE" label="营运金额/元" width="140"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import TWUnit from '../../components/TWTableColumn/TWUnit'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'
	import {mapGetters} from 'vuex'

	export default {
		name: "BicycleOperation",
		data() {
			return {
				query: {
					vehicle: '',
					sTime: '',
					eTime: '',
					region: ''
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
				this.query.sTime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
				this.query.eTime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
				this.getCyclingOperation();
			});
		},
		computed: {
			...mapGetters(['getLPNumber','getRegionReal']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage -1;
				return _.filter(data, (item, index) => {
					return  index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			}
		},
		methods: {
			/*接口*/
			getCyclingOperation(){
				this.table.loading = true;
				const {vehicle, sTime, eTime,region} = this.query;
				const {currentPage,pageSize} = this.table;
				axios.get('industryOperation/getCyclingOperation', {
					baseURL: this.baseURL,
					params: {
						vehiNo:vehicle,
						stime: sTime && moment(sTime).format('YYYY-MM-DD HH:mm:ss'),
						etime: eTime && moment(eTime).format('YYYY-MM-DD HH:mm:ss'),
						currentPage:currentPage,
						pageSize:pageSize,
						region:region
					}
				}).then(res => {
					this.table.data = res.data.datas || [];
					this.table.total = res.data.count;
					this.table.loading = false;
				})
			},
			queryVehicleSearch(query, cb) {
				if(query.legth < 3) cb = null;
				else cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getCyclingOperation();
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getCyclingOperation();
			},
			handleExportClick() {
				const {vehicle, sTime, eTime,region} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}industryOperation/getCyclingOperationExcel?vehicle=${vehicle}&region=${region}&stime=${sTime && moment(sTime).format('YYYY-MM-DD HH:mm:ss')}&etime=${eTime && moment(eTime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			},
		},
		components: {
			'tw-unit':TWUnit
		}
	}
</script>

<style scoped>

</style>