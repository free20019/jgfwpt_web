<!--公司信息-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
												 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.type" placeholder="类型">
					<el-option v-for="item in getUserType" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="query.region" placeholder="区域">
					<el-option v-for="item in getRegion" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input v-model="query.minNum" placeholder="最小规模"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="query.maxNum" placeholder="最大规模"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
				<el-button type="primary" @click="handleExportClick">导出</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="NAME" label="公司名称" min-width="280"></el-table-column>
				<el-table-column prop="VEHICLE_SUM" label="规模" width="140"></el-table-column>
				<el-table-column prop="AREA_NAME" label="区域" width="180"></el-table-column>
				<el-table-column prop="ECONOMIC_NAME" label="性质" width="180"></el-table-column>
				<el-table-column prop="RESPONSIBLE_PERSON" label="负责人" width="100"></el-table-column>
				<el-table-column prop="LICENSE_NUMBER" label="经营许可证号" width="120"></el-table-column>
				<el-table-column prop="RESPONSIBLE_PERSON_PHONE" label="联系方式" width="120"></el-table-column>
				<el-table-column prop="LICENSE_VALID_PERIOD_FROM" label="许可证起" width="120"></el-table-column>
				<el-table-column prop="LICENSE_VALID_PERIOD_END" label="许可证止" width="120"></el-table-column>
				<el-table-column prop="LICENSE_ISSUING_DATE" label="发放日期" width="100"></el-table-column>
				<el-table-column prop="BUSINESS_SCOPE_NAME" label="经营范围" width="140"></el-table-column>
				<el-table-column prop="BUSINESS_STATUS_NAME" label="经营状态" width="100"></el-table-column>

				<el-table-column prop="COLOR" label="车身颜色" width="100"></el-table-column>
				<el-table-column prop="AREA_NAME" label="行政区划" width="100"></el-table-column>
				<el-table-column prop="IS_EXPIRED" label="证照是否过期" width="100"></el-table-column>
				<el-table-column prop="FUEL_NAME" label="燃料类型" width="100"></el-table-column>
				<el-table-column prop="EMISSION_STANDARD_NAME" label="排放标准" width="100"></el-table-column>
			</el-table>
			<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import {mapGetters} from 'vuex'
	import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'

	export default {
		name: "CompanyInfo",
		data() {
			return {
				query: {
					companyName: '',
					type: '',
					region: '',
					minNum: '',
					maxNum: ''
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
				this.getCompanyInformation();
			});
		},
		computed: {
			...mapGetters(['getCompanyName', 'getRegion', 'getUserType']),
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
			getCompanyInformation(){
				this.table.loading = true;
				const {companyName,type,region, minNum,maxNum} = this.query;
				axios.get('transportationDataAccess/getCompanyInformation', {
					baseURL: this.baseURL,
					params: {
						companyName:companyName,
						region:region,
						type:type,
						minNum:minNum,
						maxNum:maxNum
					}
				}).then(res => {
					console.info(res.data)
					this.table.data = res.data || [];
					this.table.currentPage = 1;
					this.table.total = this.table.data.length;
					this.table.loading = false;
				})
			},
			queryCompanyNameSearch(query, cb) {
				cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
			},
			/*事件*/
			handleQueryClick() {
				this.table.currentPage = 1;
				this.getCompanyInformation();
			},
			handleExportClick() {
				const {companyName,region,type,minNum,maxNum} = this.query;
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}transportationDataAccess/getCompanyInformationExcel?companyName=${companyName}&type=${type}&region=${region}&minNum=${minNum}&maxNum=${maxNum}`);
				}).catch(() => {
				});
			},
			handleTablePageCurrentChange(index) {
				this.table.currentPage = index;
			}
		}
	}
</script>

<style scoped>

</style>