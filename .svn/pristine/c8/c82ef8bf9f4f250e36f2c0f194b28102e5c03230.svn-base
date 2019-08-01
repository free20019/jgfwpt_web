<!--报停车辆统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
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
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 72px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" min-width="240"></el-table-column>
				<el-table-column prop="cpzs" label="车辆总数" width="120"></el-table-column>
				<el-table-column prop="btsl" label="报停数" width="120"></el-table-column>
				<el-table-column prop="shtg" label="审核通过" width="120"></el-table-column>
				<el-table-column prop="shbtg" label="审核不通过" width="120"></el-table-column>
			</el-table>
			<div class="tw-count-panel">
				<div class="tw-count-item">总数：{{1234}}</div>
				<div class="tw-count-item">审核通过：{{1232}}</div>
				<div class="tw-count-item">审核不通过：{{2}}</div>
			</div>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
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
		name: "ReportingVehicleStatistics",
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
							cpzs: 1200,
							btsl: 100,
							shtg: 89,
							shbtg: 2
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
			...mapGetters(['getCompanyName']),
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
			/*事件*/
			handleQueryClick() {},
			handleExportClick() {},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tw-count {
		&-panel {
			text-align: center;
		}
		&-item {
			display: inline-block;
			height: 30px;
			padding: 0 20px;
			line-height: 30px;
			color: #666666;
		}
	}
</style>