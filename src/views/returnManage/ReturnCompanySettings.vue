<!--回场公司设置-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.type" filterable placeholder="回场区域">
					<el-option  v-for="item in getReturnArea" :key="item.id" :label="item.label" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60" :resizable="false" fixed></el-table-column>
				<el-table-column prop="gsmc" label="公司名称" width="280" fixed show-overflow-tooltip></el-table-column>
				<el-table-column prop="hcqy" label="回场区域" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="hcjg" label="回场间隔" width="150"></el-table-column>
				<el-table-column prop="remarks" label="备注" min-width="160" :resizable="false" show-overflow-tooltip></el-table-column>
				<el-table-column :resizable="false" width="100" align="center">
					<template slot="header" slot-scope="scope">
						<el-button size="mini" icon="el-icon-plus" @click="handleTableAddClick"></el-button>
					</template>
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="text" @click="handleTableEditClick(scope.row)"></el-button>
						<el-button size="mini" icon="el-icon-delete" type="text" @click="handleTableDeleteClick(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.display" width="400px" @closed="handleDialogClosed">
			<el-form ref="form" :model="dialog.form" size="small" label-width="80px">
				<!--<el-form-item label="公司名称">-->
					<!--<el-select v-model="dialog.form.companyName" placeholder="公司名称" style="width: 200px;">-->
						<!--<el-option v-for="item in getCompanyName" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
					<!--</el-select>-->
				<!--</el-form-item>-->
				<el-form-item label="公司名称">
					<el-autocomplete class="inline-input" v-model="dialog.form.companyName" placeholder="公司名称"
									 :fetch-suggestions="queryDialogCompanyNameSearch" :trigger-on-focus="false" style="width: 260px;"></el-autocomplete>
				</el-form-item>
				<el-form-item label="回场区域">
					<tree-select class="tw-tree-select tw-line" v-model="dialog.form.region" :multiple="true" :options="filterReturnArea" placeholder="回场区域" style="width: 260px;"/>
				</el-form-item>
				<el-form-item label="回场间隔">
					<el-input v-model="dialog.form.interval" placeholder="回场间隔" style="width: 260px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialog.display = false">取 消</el-button>
				<el-button type="primary" @click="handleDialogSaveClick">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import TreeSelect from '@riophae/vue-treeselect'
	import {mapGetters} from 'vuex'

	export default {
		name: "ReturnCompanySettings",
		data() {
			return {
				query:{
					companyName: '',
					type: ''
				},
				companyList: [],
				table: {
					loading: false,
					selectItem: {},
					data: [{
						gsmc: '杭州通悟科技有限公司',
						hcqy: '下场区',
						hcjg: 2,
						remarks: '北冥有鱼，其名为鲲。鲲之大，不知其几千里也。化而为鸟，其名为鹏。鹏之背，不知其几千里也。怒而飞，其翼若垂天之云。是鸟也，海运则将徙于南冥。南冥者，天池也。',
					}],
					pageSize: 20,
					currentPage: 1,
					total: 0
				},
				dialog: {
					title: '',
					display: false,
					form: {
						companyName: '',
						region: [],
						interval: ''
					}
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
				this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
				this.getReturnCompany();
			});
		},
		computed: {
			...mapGetters(['getCompanyName', 'getReturnArea']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage - 1;
				return _.filter(data, (item, index) => {
					return  index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			},
			filterReturnArea() {
				return _.map(_.filter(this.getReturnArea, item => item.id), item => {
					return {id: item.id, label: item.label}
				})
			}
		},
		methods: {
			/*接口*/
			queryDialogCompanyNameSearch(query, cb){
				 cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			getReturnCompany(){
				this.table.loading = true;
				const {companyName,  type} = this.query;
				axios.get('area/returncompany', {
					baseURL: this.baseURL,
					params: {
						company:companyName,
						area:type
					}
				}).then(res => {
					console.log(res.data);
					this.table.data = _.map(res.data, item => {
						return {
							id:item.ID,
							area_id:item.AREA_ID,
							gsmc: item.COMPANY_NAME,
							hcqy: item.AREA_NAME,
							hcjg: item.RETURN_TIME,
							remarks: item.REMARKS
						}
					});
					this.table.total = this.table.data.length;
					this.table.currentPage = 1;
					this.table.loading = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			getAddReturnCompany(){
				const {companyName,region, interval} = this.dialog.form;
				if(companyName===''||region.toString()===''||interval===''){
					this.$message.error('请填写完整信息！');
					return false;
				}
				axios.get('area/addreturncompany', {
					baseURL: this.baseURL,
					params: {company:companyName,area:region.toString(),time:interval}
				}).then(res => {
					if(res.data>0){
						this.$message({message: "操作成功!", type: 'success'});
						this.dialog.display = false;
						this.getReturnCompany();
					}else if (res.data===0){
						this.$message.error('操作失败！');
					}else if (res.data===-1){
						this.$message.error('该公司已添加！');
					}
				}).catch(function (error) {
					console.error(error);
				});
			},
			getUpdateReturnCompany(){
				const item =this.table.selectItem;
				const {companyName,region, interval} = this.dialog.form;
				if(companyName===''||region.toString()===''||interval===''){
					this.$message.error('请填写完整信息！');
					return false;
				}
				axios.get('area/updatereturncompany', {
					baseURL: this.baseURL,
					params: {id:item.id,company:companyName,area:region.toString(),time:interval}
				}).then(res => {
					if(res.data>0){
						this.$message({message: "操作成功!", type: 'success'});
						this.dialog.display = false;
						this.getReturnCompany();
					}else if (res.data===0){
						this.$message.error('操作失败！');
					}else if (res.data===-1){
						this.$message.error('该公司已添加！');
					}
				}).catch(function (error) {
					console.error(error);
				});
			},
			/*事件*/
			handleQueryClick() {
				this.getReturnCompany();
			},
			handleTableAddClick() {
				this.dialog.title = '添加回场';
				this.dialog.display = true;
			},
			handleTableEditClick(item) {
				this.dialog.title = '修改回场';
				this.dialog.display = true;
				this.table.selectItem = item;
				this.dialog.form.companyName = item.gsmc;
				this.dialog.form.region = item.area_id.split(',');
				this.dialog.form.interval = item.hcjg;
			},
			handleTableDeleteClick(item) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					axios.get('area/deletereturncompany', {
						baseURL: this.baseURL,
						params: {id:item.id}
					}).then(res => {
						if(res.data>0){
							this.$message({message: "操作成功!", type: 'success'});
							this.getReturnCompany();
						}else{
							this.$message.error('操作失败！');
						}
					}).catch(function (error) {
						console.error(error);
					});				}).catch(() => {

				});
			},
			handleDialogSaveClick() {
				if(this.dialog.title === '修改回场'){
					this.getUpdateReturnCompany();
				}else if(this.dialog.title === '添加回场'){
					this.getAddReturnCompany();
				}
			},
			handleDialogClosed() {
				this.dialog.title = '';
				this.dialog.form.companyName = '';
				this.dialog.form.region = [];
				this.dialog.form.interval = '';
				this.table.selectItem={};
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		},
		components: {
			'tree-select': TreeSelect
		}
	}
</script>

<style scoped>

</style>