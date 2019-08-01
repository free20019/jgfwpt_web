<!--终端异常告警-->
<template>
	<div class="tw-template-wrapper" style="padding: 10px; box-sizing: border-box;">
		<div class="el-table el-table--fit el-table--border el-table--small el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
			<div class="hidden-columns">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="el-table__header-wrapper">
				<table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
					<colgroup>
						<col name="el-table_16_column_65" width="160">
						<col name="el-table_16_column_66" width="274">
						<col name="el-table_16_column_67" width="273">
						<col name="el-table_16_column_68" width="470">
						<col name="gutter" width="0">
					</colgroup>
					<thead class="has-gutter">
					<tr class="">
						<th colspan="1" rowspan="5" class="el-table_16_column_65 is-center">
							<div class="cell" style="text-align: center;">类型</div>
						</th>
						<th colspan="1" rowspan="1" class="el-table_16_column_66 is-center">
							<div class="cell" style="text-align: center;">子类型</div>
						</th>
						<th colspan="1" rowspan="1" class="el-table_16_column_67 is-center">
							<div class="cell">数量</div>
						</th>
						<th colspan="1" rowspan="1" class="el-table_16_column_68  is-center">
							<div class="cell" style="line-height: 0;">
								<el-button size="mini" type="primary" @click="handleExportClick">导出</el-button>
							</div>
						</th>
						<th class="gutter" style="width: 0;"></th>
					</tr>
					</thead>
				</table>
			</div>
			<div class="el-table__body-wrapper is-scrolling-none">
				<table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
					<colgroup>
						<col name="el-table_16_column_65" width="160">
						<col name="el-table_16_column_66" width="274">
						<col name="el-table_16_column_67" width="273">
						<col name="el-table_16_column_68" width="470">
					</colgroup>
					<tbody>
					<tr class="el-table__row">
						<td rowspan="5" colspan="1" class="el-table_16_column_65 is-center">
							<div class="cell" >主机故障</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell" >有定位无营运</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="ydwwyy"></div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini"  @click="handleHostFailure(1)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">有营运无定位</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="yyywdw">20</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleHostFailure(2)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">有抓拍无定位无营运</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="yzpwdwwyy">30</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleHostFailure(3)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">7天无定位无营运</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="sevenwdwwyy">35</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleHostFailure(4)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">空重车无变化</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="wkcwbh">23</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleHostFailure(5)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<!--<tr class="el-table__row">-->
						<!--<td rowspan="1" colspan="1" class="el-table_16_column_65 is-center">-->
							<!--<div class="cell">计价器</div>-->
						<!--</td>-->
						<!--<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">-->
							<!--<div class="cell">计价器异常</div>-->
						<!--</td>-->
						<!--<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">-->
							<!--<div class="cell" v-text="jjqyc">25</div>-->
						<!--</td>-->
						<!--<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">-->
							<!--<div class="cell">-->
								<!--<el-button size="mini" @click="handleHostFailure">明细</el-button>-->
								<!--<el-button size="mini" type="danger">告警</el-button>-->
							<!--</div>-->
						<!--</td>-->
					<!--</tr>-->
					<tr class="el-table__row">
						<td rowspan="4" colspan="1" class="el-table_16_column_65 is-center">
							<div class="cell">视频异常</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">视频黑屏</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="sphp">31</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleVideoAnomaly(6)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">视频移位</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="spyw">24</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleVideoAnomaly(7)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					<tr class="el-table__row">
						<td rowspan="1" colspan="1" class="el-table_16_column_66 is-center">
							<div class="cell">视频断线</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_67 is-center">
							<div class="cell" v-text="spdx">67</div>
						</td>
						<td rowspan="1" colspan="1" class="el-table_16_column_68 is-center">
							<div class="cell">
								<el-button size="mini" @click="handleVideoAnomaly(8)">明细</el-button>
								<el-button size="mini" type="danger">告警</el-button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="el-table__column-resize-proxy" style="display: none;"></div>
		</div>
	</div>
</template>

<script>
	import _ from 'underscore'
	import axios from 'axios'

	export default {
		name: "TerminalAbnormalAlarm",
		data() {
			return {
				ydwwyy:'',
				yyywdw:'',
				yzpwdwwyy:'',
				sevenwdwwyy:'',
				wkcwbh:'',
				sphp:'',
				spyw:'',
				spdx:'',
			}
		},
		mounted: function () {
			this.handleQueryClick();
		},
		methods: {
			getTerminalError(){
				axios.get('terminal/terminalerror', {
					baseURL: this.baseURL,
					params: {
					}
				}).then(res => {
					console.info(res.data);
					_.map(res.data, item => {
						this.ydwwyy=item.NO_GPS;
						this.yyywdw=item.NO_JJQ;
						this.yzpwdwwyy=item.NO_GPS_JJQ;
						this.sevenwdwwyy=item.SEVEN_GPS_JJQ;
						this.wkcwbh=item.EMPTY_HEAVY;
						this.sphp=item.SCREEN_BLACK;
						this.spyw=item.MOVE_ON;
						this.spdx=item.BREAK_OFF;
					});
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			handleQueryClick() {
				this.getTerminalError();

			},
			handleHostFailure(id){
				this.$router.push({name: "HostFailure",params:{id:id}});
			},
			handleVideoAnomaly(id){
				this.$router.push({name: "HostFailure",params:{id:id}});
				// this.$router.push({name: "VideoAnomaly"});
			},
			handleExportClick() {
				this.$confirm('是否需要导出?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					cancelButtonClass: 'el-button--danger',
					closeOnClickModal: false,
					type: 'info',
					center: true
				}).then(() => {
					window.open(`${this.baseURL}terminal/terminalerrordc`);
				}).catch(() => {
				});
			}
		}
	}
</script>

<style scoped>

</style>