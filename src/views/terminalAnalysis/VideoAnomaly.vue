<!--视频异常-->
<template>
	<div class="tw-template-wrapper">
		<el-form :inline="true" :model="query" size="small" class="tw-query-bar">
			<el-form-item>
				<el-autocomplete class="inline-input" v-model="query.lPNumber" placeholder="车牌号码"
												 :fetch-suggestions="getLPNumberRemoteMethod" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-date-picker arrow-control type="datetime" v-model="query.time" placeholder="选择时间点"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<tree-select class="tw-tree-select tw-line" v-model="query.faultType" :multiple="true" :options="getFaultType" placeholder="故障类型"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleQueryClick">查询</el-button>
				<el-button type="primary" @click="handleAlarmIssuedClick">告警下发</el-button>
				<el-button type="primary" @click="handleExportClick">导出</el-button>
			</el-form-item>
		</el-form>
		<div class="tw-query-panel">
			<el-table :data="filterTableList" v-loading="table.loading" border size="small" height="100%" style="width: 100%">
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="cphm" label="车牌号码" width="180"></el-table-column>
				<el-table-column prop="qiye" label="企业" width="180"></el-table-column>
				<el-table-column prop="spdx" label="视频短线" width="180">
					<template slot-scope="scope">
						<fault-review :item="scope.row" :fault="scope.row.spdx" :system-fault="scope.row.spdxxt" type="视频短线" @true-review-click="" @false-review-click=""></fault-review>
					</template>
				</el-table-column>
				<el-table-column prop="sphp" label="视频" width="180">
					<template slot-scope="scope">
						<fault-review :item="scope.row" :fault="scope.row.sphp" :system-fault="scope.row.sphpxt" type="视频黑屏" @true-review-click="" @false-review-click=""></fault-review>
					</template>
				</el-table-column>
				<el-table-column prop="spwy" label="视频移位" width="180">
					<template slot-scope="scope">
						<fault-review :item="scope.row" :fault="scope.row.spwy" :system-fault="scope.row.spwyxt" type="视频移位" @true-review-click="" @false-review-click=""></fault-review>
					</template>
				</el-table-column>
				<el-table-column prop="spxz" label="视频下载" width="180">
					<template slot-scope="scope">
						<fault-review :item="scope.row" :fault="scope.row.spxz" :system-fault="scope.row.spxzxt" type="视频下载" @true-review-click="" @false-review-click=""></fault-review>
					</template>
				</el-table-column>
				<el-table-column min-width="0"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import TreeSelect from '@riophae/vue-treeselect'
	import _ from 'underscore'
	import axios from 'axios'
	import moment from 'moment'
	import FaultReview from '../../components/TableColumn/FaultReview'
	import {mapGetters} from 'vuex'

	export default {
		name: "VideoAnomaly",
		data() {
			return {
				query: {
					lPNumber: '',
					time: '',
					faultType: []
				},
				table: {
					loading: false,
					data: [
						{
							cphm: '',
							qiye: '',
							spdxxt: 1,
							spdx: 0,
							sphpxt: 0,
							sphp: 0,
							spwyxt: 0,
							spwy: 0,
							spxzxt: 1,
							spxz: 2
						},
						{
							cphm: '',
							qiye: '',
							spdxxt: 1,
							spdx: 1,
							sphpxt: 1,
							sphp: 1,
							spwyxt: 0,
							spwy: 0,
							spxzxt: 1,
							spxz: 2
						},
						{
							cphm: '',
							qiye: '',
							spdxxt: 1,
							spdx: 2,
							sphpxt: 0,
							sphp: 0,
							spwyxt: 0,
							spwy: 0,
							spxzxt: 1,
							spxz: 2
						}
					],
					pageSize: 20,
					currentPage: 1,
					total: 0
				}
			}
		},
		computed: {
			...mapGetters(['getLPNumber', 'getFaultType']),
			filterTableList() {
				const {data, pageSize, currentPage} = this.table;
				const pageIndex = currentPage -1;
				return _.filter(data, (item, index) => {
					return index >= pageIndex * pageSize && index < currentPage * pageSize;
				})
			}
		},
		methods: {
			/*数据接口*/
			getLPNumberRemoteMethod(query, cb) {
				if (query.length < 3) cb(null);
				else
					cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1))
			},
			/*事件*/
			handleQueryClick() {},
			handleAlarmIssuedClick() {},
			handleExportClick() {},
			handleVerifyClick() {},
			handleAuditTypeClick(item) {
				this.$confirm('是否属实?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					// 属实操作
				}).catch(() => {
					// 不实操作
				});
			},
			/*格式*/
			formatAuditType(type) {
				switch (type) {
					case 0:
						return '未审核';
					case 1:
						return '故障';
					case 2:
						return '无故障';
				}
			},
			formatSystemAuditClassType(type) {
				switch (type) {
					case 0:
						return 'tw-text-success';
					case 1:
						return 'tw-text-error';
				}
			},
			formatAuditClassType(type) {
				switch (type) {
					case 0:
						return 'tw-text-info';
					case 1:
						return 'tw-text-error';
					case 2:
						return 'tw-text-success';
				}
			}
		},
		components: {
			'tree-select': TreeSelect,
			FaultReview
		}
	}
</script>

<style scoped>

</style>