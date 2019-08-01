<!--支付明细查询-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-input v-model="query.orderTitle" placeholder="订单标题"></el-input>
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
				<el-table-column prop="ddbt" label="订单标题" min-width="140"></el-table-column>
				<el-table-column prop="jycjsj" label="交易创建时间" width="140"></el-table-column>
				<el-table-column prop="jyfksj" label="交易付款时间" width="140"></el-table-column>
				<el-table-column prop="mjzfzh" label="卖家支付账号" width="140"></el-table-column>
				<el-table-column prop="wjzfzh" label="买家支付账号" width="140"></el-table-column>
				<el-table-column label="商品单价" width="140">
					<template slot-scope="scope">
						<tw-unit :data="scope.row.spdj" unit="元"></tw-unit>
					</template>
				</el-table-column>
				<el-table-column prop="gmsl" label="购买数量" width="140"></el-table-column>
				<el-table-column label="交易金额" width="140">
					<template slot-scope="scope">
						<tw-unit :data="scope.row.jyje" unit="元"></tw-unit>
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
	import TWUnit from '../../components/TWTableColumn/TWUnit'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'

	export default {
		name: "PaymentDetailsInquiry",
		data() {
			return {
				query: {
					orderTitle: '',
					stime: '',
					etime: ''
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
				this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
				this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
				this.getDetailsInquiry();
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
			getDetailsInquiry(){
				const {orderTitle, stime, etime} = this.query;
				const {currentPage,pageSize} = this.table;
				this.table.loading = true;
				axios.get('pay/detailsinquiry', {
					baseURL: this.baseURL,
					params: {
						orderTitle,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss'),
						currentPage,
						pageSize
					}
				}).then(res => {
					this.table.data = _.map(res.data.datas, item => {
						return {
							ddbt: item.SUBJECT,
							jycjsj: item.GMT_CREATE,
							jyfksj: item.GMT_PAYMENT,
							mjzfzh: item.SELLER_EMAIL,
							wjzfzh: item.BUYER_EMAIL,
							spdj: item.PRICE,
							gmsl: item.QUANTITY,
							jyje: item.TOTAL_FEE
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
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getDetailsInquiry();
			},
			handleExportClick() {
				const {orderTitle, stime, etime} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}pay/detailsinquirydc?orderTitle=${orderTitle}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getDetailsInquiry();
			}
		},
		components: {
			'tw-unit': TWUnit
		}
	}
</script>

<style scoped>

</style>