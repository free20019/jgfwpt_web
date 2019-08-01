<!--报停车辆管理-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
												 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
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
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="100%" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" min-width="180"></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="140"></el-table-column>
				<el-table-column prop="sqrmc" label="申请人名称" width="140"></el-table-column>
				<el-table-column prop="sqrzh" label="申请人账号" width="140"></el-table-column>
				<el-table-column prop="shpi" label="审批" width="120">
					<template slot-scope="scope">
						<el-button class="tw-table-button" size="mini" @click="handleReviewClick(scope.row)">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'
	import {mapGetters} from 'vuex'

	export default {
		name: "ReportStopVehicleManage",
		data() {
			return {
				query:{
					companyName: '',
					vehicle: '',
					stime: '',
					etime:''
				},
				table: {
					loading: false,
					data: [
						{
							gsmc: '杭州长运三运运输有限公司',
							cphm: '浙AT234',
							sqrmc: '墨玉',
							sqrzh: 'shengws'
						}
					],
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
			});
		},
		computed: {
			...mapGetters(['getCompanyName', 'getLPNumber']),
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
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			queryVehicleSearch(query, cb) {
				if (query.length < 3) cb(null);
				else
					cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			/*事件*/
			handleQueryClick() {},
			handleExportClick() {},
			handleReviewClick(item) {
				this.$confirm('', '审核', {
					confirmButtonText: '审核通过',
					cancelButtonText: '审核不通过',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					center: true
				}).then(() => {
					//审核通过
				}).catch(() => {
					//审核不通过
				});
			}
		}
	}
</script>

<style scoped>

</style>