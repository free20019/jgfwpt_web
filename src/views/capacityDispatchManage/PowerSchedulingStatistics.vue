<!--动力调度统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-input class="inline-input" v-model="query.username" placeholder="用户名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.disptype">
					<el-option v-for="item in getDispatchType" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
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
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="100%" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="USERNAME" label="用户名称" min-width="180"></el-table-column>
				<el-table-column prop="DISPTYPE" label="下发类型" min-width="100"></el-table-column>
				<el-table-column prop="NUMS" label="下发车辆数量" min-width="100"></el-table-column>
				<el-table-column prop="TS" label="下发条数" min-width="100"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from 'vuex'

	export default {
		name: "PowerSchedulingStatistics",
		data() {
			return {
				query:{
					username: '',
					disptype: '0',
					stime: '',
					etime:''
				},
				table: {
					loading: false,
					data: [
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.handleQueryClick();
			});
		},
		computed: {
			...mapGetters(['getDispatchType'])
		},
		methods: {
			/*接口*/
			getPowerSchedulingStatistics(){
				const {username,disptype, stime, etime} = this.query;
				if(!stime||!etime) return this.$message.error('请选择时间！');
				this.table.loading=true;
				axios.get('powerScheduling/count', {
					baseURL: this.baseURL,
					params: {
						username:username,
						disptype:disptype,
						stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')
					}
				}).then(res => {
					this.table.loading=false;
					this.table.data = res.data;
				})
			},
			/*事件*/
			handleQueryClick() {
				this.getPowerSchedulingStatistics();
			},
			handleExportClick() {
				const {username,disptype, stime, etime} = this.query;
				if(!stime||!etime) return this.$message.error('请选择时间！');
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}powerScheduling/count_export?username=${username}&disptype=${disptype}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			}
		}
	}
</script>

<style scoped>

</style>