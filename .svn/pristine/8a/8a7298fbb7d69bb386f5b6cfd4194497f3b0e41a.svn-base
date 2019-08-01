<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
												 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-upload class="upload" name="file" action="" accept="xlsx,xls" multiple :before-upload="handleChange">
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)"  style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="REAL_NAME" label="车牌号码" min-width="140"></el-table-column>
				<el-table-column label="1路" width="100">
					<template scope="scope">
						<div class="images" v-viewer="{movable: false}">
							<img :src="scope.row.road1" width="70" height="40" class="head_pic"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="2路" width="100">
					<template scope="scope">
						<div class="images" v-viewer="{movable: false}">
							<img :src="scope.row.road2" width="70" height="40" class="head_pic"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="3路" width="100">
					<template scope="scope">
						<div class="images" v-viewer="{movable: false}">
							<img :src="scope.row.road3" width="70" height="40" class="head_pic"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="4路" width="100">
					<template scope="scope">
						<div class="images" v-viewer="{movable: false}">
							<img :src="scope.row.road4" width="70" height="40" class="head_pic"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="black" label="黑屏路数" min-width="80"></el-table-column>
				<el-table-column label="1路（第一次巡检）" width="140">
					<template slot-scope="scope">
							<el-radio-group v-model="scope.row.road1_e1">
								<!--<el-radio :label="0">是</el-radio>-->
								<!--<el-radio :label="1">否</el-radio>-->
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">偏移</el-radio>
								<el-radio :label="2">黑屏</el-radio>
							</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column label="2路（第一次巡检）" width="140">
					<template slot-scope="scope">
						<el-radio-group v-model="scope.row.road1_e2">
							<el-radio :label="0">正常</el-radio>
							<el-radio :label="1">偏移</el-radio>
							<el-radio :label="2">黑屏</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column label="3路（第一次巡检）" width="140">
					<template slot-scope="scope">
						<el-radio-group v-model="scope.row.road1_e3">
							<el-radio :label="0">正常</el-radio>
							<el-radio :label="1">偏移</el-radio>
							<el-radio :label="2">黑屏</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column label="4路（第一次巡检）" width="140">
					<template slot-scope="scope">
						<el-radio-group v-model="scope.row.road1_e4">
							<el-radio :label="0">正常</el-radio>
							<el-radio :label="1">偏移</el-radio>
							<el-radio :label="2">黑屏</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>

				<el-table-column label="1路（第二次巡检）" width="140">
					<template slot-scope="scope">
						<div v-if="scope.row.one_times!==''">
							<el-radio-group v-model="scope.row.road2_e1">
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">偏移</el-radio>
								<el-radio :label="2">黑屏</el-radio>
							</el-radio-group>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="2路（第二次巡检）" width="140">
					<template slot-scope="scope">
						<div v-if="scope.row.one_times!==''">
							<el-radio-group v-model="scope.row.road2_e2">
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">偏移</el-radio>
								<el-radio :label="2">黑屏</el-radio>
							</el-radio-group>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="3路（第二次巡检）" width="140">
					<template slot-scope="scope">
						<div v-if="scope.row.one_times!==''">
							<el-radio-group v-model="scope.row.road2_e3">
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">偏移</el-radio>
								<el-radio :label="2">黑屏</el-radio>
							</el-radio-group>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="4路（第二次巡检）" width="140">
					<template slot-scope="scope">
						<div v-if="scope.row.one_times!==''">
							<el-radio-group v-model="scope.row.road2_e4">
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">偏移</el-radio>
								<el-radio :label="2">黑屏</el-radio>
							</el-radio-group>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="time" label="巡查时间" width="140"></el-table-column>
				<el-table-column label="操作" width="140">
					<template slot-scope="scope">
						<div v-if="scope.row.two_times===''">
							<!--<el-button class="tw-table-button" size="mini" @click="handleTableSaveClick(scope.row)">审核</el-button>-->
							<el-button class="tw-table-button" type="text" icon="iconfont icon-find" @click="handleTableSaveClick(scope.row)"></el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
		<!--<el-dialog :title="dialog.title" :visible.sync="dialog.display" width="600px" @closed="handleDialogClosed">-->
			<!--<el-form ref="form" :model="dialog.form" size="small" label-width="80px" style="height:500px;overflow:auto">-->
				<!--<el-form-item label="1路" v-viewer>-->
					<!--<img :src="dialog.form.road1" width="400" height="250" class="head_pic"/>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="2路" >-->
					<!--<img :src="dialog.form.road2" width="400" height="250" class="head_pic"/>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="3路" v-viewer>-->
					<!--<img :src="dialog.form.road3" width="400" height="250" class="head_pic"/>-->
				<!--</el-form-item>-->
				<!--<el-form-item label="4路" v-viewer>-->
					<!--<img :src="dialog.form.road4" width="400" height="250" class="head_pic"/>-->
				<!--</el-form-item>-->

			<!--</el-form>-->
		<!--</el-dialog>-->
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import {formatDate, formatDateTime} from "../../assets/js/util";

	export default {
		name: "VideoShift",
		data() {
			return {
				query:{
					vehicle: ''
				},
				table: {
					loading: false,
					data: [],
					pageSize: 10,
					currentPage: 1,
					total: 0
				},
				// dialog: {
				// 	title: '',
				// 	display: false,
				// 	form: {
				// 		road1: '',
				// 		road2: '',
				// 		road3: '',
				// 		road4: ''
				// 	}
				// }
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.getVideoShift();
			});
		},
		computed: {
			...mapGetters(["getLPNumber"]),
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
				cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
			},
			getVideoShift(){
				this.table.loading = true;
				const {vehicle} = this.query;
				const {currentPage,pageSize} = this.table;
				axios.get('terminal/videoshift', {
					baseURL: this.baseURL,
					params: {
						vehicle,
						currentPage,
						pageSize
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data.datas, item => {
						return {
							id:item.ID,
							mdt_no:item.EQUIPMENT,
							one_times:item.ONE_ROAD_ONE||item.ONE_ROAD_TWO||item.ONE_ROAD_THREE||item.ONE_ROAD_FOUR||item.ONE_TIME,
							two_times:item.TWO_ROAD_ONE||item.TWO_ROAD_TWO||item.TWO_ROAD_THREE||item.TWO_ROAD_FOUR||item.TWO_TIME,
							REAL_NAME: item.VEHI_NO,
							road1: 'http://192.168.0.102:9000/'+item.EQUIPMENT+'_channel_1.mp4_kf__0.bmp',
							road2: 'http://192.168.0.102:9000/'+item.EQUIPMENT+'_channel_2.mp4_kf__0.bmp',
							road3: 'http://192.168.0.102:9000/'+item.EQUIPMENT+'_channel_3.mp4_kf__0.bmp',
							road4: 'http://192.168.0.102:9000/'+item.EQUIPMENT+'_channel_4.mp4_kf__0.bmp',
							black:item.TD,
							// road1: this.baseURL+'common/pic?key='+item.EQUIPMENT+'_channel_1.mp4_kf__0.bmp',
							// road2: this.baseURL+'common/pic?key='+item.EQUIPMENT+'_channel_2.mp4_kf__0.bmp',
							// road3: this.baseURL+'common/pic?key='+item.EQUIPMENT+'_channel_3.mp4_kf__0.bmp',
							// road4: this.baseURL+'common/pic?key='+item.EQUIPMENT+'_channel_4.mp4_kf__0.bmp',

							road1_e1: item.ONE_ROAD_ONE===""?"":parseInt(item.ONE_ROAD_ONE),
							road1_e2: item.ONE_ROAD_TWO===""?"":parseInt(item.ONE_ROAD_TWO),
							road1_e3: item.ONE_ROAD_THREE===""?"":parseInt(item.ONE_ROAD_THREE),
							road1_e4: item.ONE_ROAD_FOUR===""?"":parseInt(item.ONE_ROAD_FOUR),
							road2_e1: item.TWO_ROAD_ONE===""?"":parseInt(item.TWO_ROAD_ONE),
							road2_e2: item.TWO_ROAD_TWO===""?"":parseInt(item.TWO_ROAD_TWO),
							road2_e3: item.TWO_ROAD_THREE===""?"":parseInt(item.TWO_ROAD_THREE),
							road2_e4: item.TWO_ROAD_FOUR===""?"":parseInt(item.TWO_ROAD_FOUR),
							time: item.TWO_TIME===''?(item.ONE_TIME===''?'':formatDate(item.ONE_TIME)):formatDate(item.TWO_TIME)
						}
					});
					this.table.total = res.data.count;
					// this.table.currentPage = 1;
					this.table.loading = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			getVideoAudit(item){
				axios.get('terminal/videoaudit', {
					baseURL: this.baseURL,
					params: {
						id:item.id,
						vehicle:item.REAL_NAME,
						mdt_no:item.mdt_no,
						times:item.one_times,
						road_e1:item.one_times===''?item.road1_e1:item.road2_e1,
						road_e2:item.one_times===''?item.road1_e2:item.road2_e2,
						road_e3:item.one_times===''?item.road1_e3:item.road2_e3,
						road_e4:item.one_times===''?item.road1_e4:item.road2_e4,
					}
				}).then(res => {
					if(res.data>0){
						this.$message({message: "审核成功!", type: 'success'});
						this.getVideoShift();
					}else{
						this.$message.error('审核失败！');
					}
				}).catch(function (error) {
					console.error(error);
				});
			},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getVideoShift();
			},
			handleTableSaveClick(item) {
				this.$confirm('是否确定?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					// 不实操作
					this.getVideoAudit(item);
				}).catch(() => {
				});
			},
			handleChange(file){
				// console.log("1111111111111111111111=",file);
				let formData=new FormData();
				formData.append('file',file);
				// console.log("22222222222222222222222222222=",formData.get("file"));
				axios.post("terminal/upload", formData, {
					baseURL: this.baseURL,
					headers: {'Content-Type':'multipart/form-data'}
				}).then((res)=>{
						this.$message(res.data);
				}).catch(function (error) {
					console.error(error);
				});
				return false;
			},
			// handleTableDetailsClick(item){
			// 	this.dialog.title = item.REAL_NAME;
			// 	this.dialog.form.road1 = item.road1;
			// 	this.dialog.form.road2 = item.road2;
			// 	this.dialog.form.road3 = item.road3;
			// 	this.dialog.form.road4 = item.road4;
			// 	this.dialog.display = true;
			// },
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
				this.getVideoShift();
			},
			// handleDialogClosed() {
			// 	this.dialog.title = '';
			// 	this.dialog.form.road1 = '';
			// 	this.dialog.form.road2 = '';
			// 	this.dialog.form.road3 = '';
			// 	this.dialog.form.road4 = '';
			// }
		}
	}
</script>

<style scoped>

</style>
