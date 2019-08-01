<!--维修记录查询-->
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
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" width="260"></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="140"></el-table-column>
				<el-table-column prop="area" label="区域" width="240"></el-table-column>
				<el-table-column prop="simk" label="SIM卡号" width="140"></el-table-column>
				<el-table-column prop="chez" label="车主" width="120"></el-table-column>
				<el-table-column prop="sjhm" label="手机号码" width="140"></el-table-column>
				<el-table-column prop="wxlx" label="维修类型" width="200"></el-table-column>
				<el-table-column prop="gzlx" label="故障类型" width="280"></el-table-column>
				<!--<el-table-column prop="gzfssj" label="故障发生时间" width="160"></el-table-column>-->
				<el-table-column prop="wxrxm" label="维修人姓名" width="120"></el-table-column>
				<el-table-column prop="wxqk" label="维修情况" width="240"></el-table-column>
				<el-table-column prop="wxdd" label="维修地点" width="280"></el-table-column>
				<el-table-column prop="wxfy" label="维修费用" width="120"></el-table-column>
				<el-table-column prop="wxjd" label="维修进度" width="140"></el-table-column>
				<el-table-column prop="wxjg" label="维修结果" width="240"></el-table-column>
				<el-table-column prop="sxsj" label="送修时间" width="160"></el-table-column>
				<el-table-column prop="wxsj" label="完修时间" width="160"></el-table-column>
				<el-table-column label="评价" width="120">
					<template slot-scope="scope">
						<el-button class="tw-table-button" type="text" size="mini" v-if="!scope.row.ghao" @click="handleEvaluationClick(scope.row)">评价</el-button>
						<span v-else>已回访</span>
					</template>
				</el-table-column>
				<el-table-column prop="ghao" label="工号" width="180"></el-table-column>
				<el-table-column prop="khmyd" label="客户满意度" width="120"></el-table-column>
				<el-table-column prop="beiz" label="备注" width="380"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
		<el-dialog title="评价" :visible.sync="dialog.display" width="400px" @closed="handleDialogClosed">
			<el-form :model="dialog.form" label-width="80px">
				<!--<el-form-item label="工号">-->
					<!--<el-input v-model="dialog.form.jobNumber"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item label="工号">
					<el-autocomplete class="inline-input" v-model="dialog.form.jobNumber" placeholder="工号" style="width: 100%;"
									 :fetch-suggestions="queryJobNumberSearch" :trigger-on-focus="false"
									 @select="handleJobNumberSelect"></el-autocomplete>
				</el-form-item>
				<el-form-item label="满意度">
					<el-select v-model="dialog.form.satisfaction" style="width: 100%;">
						<el-option v-for="item in dialog.satisfactionOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="dialog.form.remarks"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogCancelClick">取 消</el-button>
				<el-button type="primary" @click="handleDialogSubmitClick()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from "vuex";

	export default {
		name: "MaintenanceRecordInquiry",
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
					selectItem: {},
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
				dialog: {
					display:false,
					form: {
						jobNum:'',
						jobNumber: '',
						satisfaction: '',
						remarks: ''
					},
					satisfactionOption: [
						{label: '满意', value: '满意'},
						{label: '基本满意', value: '基本满意'},
						{label: '不满意', value: '不满意'}
					]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment(moment().format('YYYY-MM-DD 00:00:00'));
				this.query.etime = moment(moment().format('YYYY-MM-DD 23:59:59'));
				this.getRecordInquiry();
			});
		},
		computed: {
			...mapGetters(['getCompanyName','getLPNumber','getJobNumber','getRegionReal']),
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
			queryJobNumberSearch(query, cb) {
				cb(_.filter(this.getJobNumber, item => item.value.indexOf(query) > -1));
			},
			getRecordInquiry(){
				const {vehicle, companyName,area, stime, etime} = this.query;
				const {currentPage,pageSize} = this.table;
				this.table.loading = true;
				axios.get('maintenance/recordinquiry', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						companyName,
						area,
						stime: stime&&moment(stime).format('YYYY-MM-DD HH:mm:ss'),
						etime: etime&&moment(etime).format('YYYY-MM-DD HH:mm:ss'),
						currentPage,
						pageSize
					}
				}).then(res => {
					console.info(res.data.datas);
					this.table.data = _.map(res.data.datas, item => {
						return {
							id:item.RR_ID,
							gsmc: item.COMP_NAME,
							cphm: item.VEHI_NO,
							area: item.AREA_NAME,
							simk: item.VEHI_SIM,
							chez: item.OWN_NAME,
							sjhm: item.HOME_TEL,
							wxlx: item.RT_TYPE,
							gzlx: item.GZLX,
							// gzfssj: '',
							wxrxm: item.REAL_NAME,
							wxqk: item.RM_MALFUNCTION,
							wxdd: item.RA_ADDR,
							wxfy: item.RR_COST,
							wxjd: item.WXJD,
							wxjg: item.RC_CONTENT,
							sxsj: item.STIME,
							wxsj: item.ETIME,
							ghao: item.GHAO,
							// khmyd: item.TCSS,
							khmyd: item.HFJG,
							beiz: item.JFYY
						}
					});
					this.table.total = res.data.count;
					// this.table.total = this.table.data.length;
					// this.table.currentPage = 1;
					this.table.loading = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getEvaluate(){
				const {jobNum,satisfaction, remarks} = this.dialog.form;
				const item =this.table.selectItem;
				if(!jobNum) return this.$message.error('请选择工号！');
				axios.get('maintenance/evaluate', {
					baseURL: this.baseURL,
					params: {id:item.id,jobNum, satisfaction, remarks}
				}).then(res => {
					if(res.data>0){
						this.$message({message: "操作成功!", type: 'success'});
						this.dialog.display = false;
						this.getRecordInquiry();
					}else{
						this.$message.error('操作失败！');
					}
				}).catch(function (error) {
					console.error(error);
				});
			},
			/*事件*/
			handleJobNumberSelect(item) {
				this.dialog.form.jobNum = item.id
			},
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getRecordInquiry();
			},
			handleExportClick() {
				const {vehicle, companyName,area, stime, etime} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}maintenance/recordinquirydc?vehicle=${vehicle}&companyName=${companyName}&area=${area}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
				}).catch(() => {});
			},
			handleEvaluationClick(item) {
				this.table.selectItem = item;
				this.dialog.display = true;
			},
			handleDialogCancelClick() {
				this.dialog.display = false;
			},
			handleDialogSubmitClick() {
				this.getEvaluate();
			},
			handleDialogClosed() {
				this.table.selectItem = {};
				this.dialog.form = {jobNum:'',jobNumber: '', satisfaction: '', remarks: ''};
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getRecordInquiry();
			}
		}
	}
</script>

<style scoped>

</style>