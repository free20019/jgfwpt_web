<!--投诉查询-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-select v-model="query.typeComplaint" placeholder="投诉类型">
					<el-option v-for="item in typeComplaintOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
				<el-button type="primary" @click="handleExportClick">导出</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="CALL_NAME" label="投诉人" min-width="140"></el-table-column>
				<el-table-column prop="BUSINESS_ITEMTYPE_NAME" label="投诉类型" width="180"></el-table-column>
				<el-table-column prop="CALLER_ID" label="联系方式" width="140"></el-table-column>
				<el-table-column prop="VEHICLE_PLATE_NUMBER" label="投诉车辆" width="120"></el-table-column>
				<el-table-column prop="BUSINESS_STATUS_NAME" label="处理详情" width="120"></el-table-column>
				<el-table-column prop="ARCHIVE_TIME" label="投诉时间" width="140"></el-table-column>
				<el-table-column prop="ACCEPT_TIME" label="处理时间" width="140"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'

	export default {
		name: "ComplaintInquiry",
		data() {
			return {
				query: {
					typeComplaint: '',
					stime: '',
					etime: ''
				},
				typeComplaintOption: [
					{label: '全部', value: ''},
					{label: '绕道', value: '绕道'},
					{label: '中途抛客', value: '中途抛客'},
					{label: '扰乱场站秩序', value: '扰乱场站秩序'},
					{label: '服务质量', value: '服务质量'},
					{label: '拒载', value: '拒载'},
					{label: '拼载', value: '拼载'},
					{label: '表扬', value: '表扬'},
					{label: '其他', value: '其他'}
				],
				table: {
					loading: false,
					data: [
						{
							tsur: '付女士',
							tslx: '扰乱场站秩序',
							lxfs: '18357355628',
							tscl: '浙AT7821',
							clxq: '待办理',
							tssj: '2019-02-20',
							clsj: '2019-02-21'
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
				this.getComplaintsStatistics();
			});
		},
		computed: {
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
			getComplaintsStatistics(){
				this.table.loading = true;
				const {typeComplaint,stime,etime} = this.query;
				const {currentPage,pageSize} = this.table;
				axios.get('industryOperation/getComplaintsStatistics', {
					baseURL: this.baseURL,
					params: {
						typeComplaint:typeComplaint,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss'),
						currentPage:currentPage,
						pageSize:pageSize
					}
				}).then(res => {
					console.info(res.data)
					this.table.data = res.data.datas || [];
					this.table.total = res.data.count;
					this.table.loading = false;
				})
			},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getComplaintsStatistics();
			},
			handleExportClick() {
				const {typeComplaint,stime,etime} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}industryOperation/getComplaintsStatisticsExcel?&typeComplaint=${typeComplaint}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {
				});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getComplaintsStatistics();
			}
		}
	}
</script>

<style scoped>

</style>