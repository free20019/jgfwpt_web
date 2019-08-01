<!--手持分中心统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-input v-model="query.userName" placeholder="账号"></el-input>
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
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
				<el-table-column prop="USER_ACCOUNT" label="账号名称" width="260" header-align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="COUNT" label="登陆次数" min-width="140" align="center" :resizable="false"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'

	export default {
		name: "HandheldSubCenterStatistics",
		data() {
			return {
				query:{
					userName: '',
					stime: '',
					etime:''
				},
				table: {
					loading: false,
					data: [],
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
				dialog: {
					display:false,
					form: {
						jobNumber: '',
						satisfaction: '',
						remarks: ''
					},
					satisfactionOption: [
						{label: '满意', value: '满意'},
						{label: '基本满意', value: '满基本意'},
						{label: '不满意', value: '不满意'}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.getHandheldMonitoringStatistics();
			});
		},
		computed: {
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
			getHandheldMonitoringStatistics(){
				this.table.loading = true;
				const {userName, stime, etime} = this.query;
				axios.get('servicePlatformUsage/getHandheldMonitoringStatistics', {
					baseURL: this.baseURL,
					params: {
						userName:userName,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')
					}
				}).then(res => {
					this.table.data = res.data || [];
					this.table.currentPage = 1;
					this.table.total = this.table.data.length;
					this.table.loading = false;
				})
			},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getHandheldMonitoringStatistics();
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		}
	}
</script>

<style scoped>

</style>