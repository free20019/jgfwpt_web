import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
			redirect: '/zdfx/zjgz',
      component: () => import('./views/Index.vue'),
			children: [
				/*终端分析统计*/
				{/*主机故障*/
					path: '/zdfx/zjgz',
					name: 'HostFailure',
					component: () => import('./views/terminalAnalysis/HostFailure.vue')
				},
				{/*终端异常告警*/
					path: '/zdfx/zdyc',
					name: 'TerminalAbnormalAlarm',
					component: () => import('./views/terminalAnalysis/TerminalAbnormalAlarm.vue')
				},
				{/*完好率统计*/
					path: '/zdfx/whltj',
					name: 'GoodRateStatistics',
					component: () => import('./views/terminalAnalysis/GoodRateStatistics.vue')
				},
				{/*在线车辆统计*/
					path: '/zdfx/clgl/zxcltj',
					name: 'OnlineVehicleStatistics',
					component: () => import('./views/terminalAnalysis/OnlineVehicleStatistics.vue')
				},
				{/*未上线车辆查询*/
					path: '/zdfx/clgl/wsxclcx',
					name: 'UnlistedVehicleInquiry',
					component: () => import('./views/terminalAnalysis/UnlistedVehicleInquiry.vue')
				},
				{/*无营运数据车辆*/
					path: '/zdfx/clgl/wyysjcl',
					name: 'NoOperatingDataVehicle',
					component: () => import('./views/terminalAnalysis/NoOperatingDataVehicle.vue')
				},
				{/*无签到签退*/
					path: '/zdfx/clgl/wqdqt',
					name: 'UnsSignInAndSignOff',
					component: () => import('./views/terminalAnalysis/UnSignInAndSignOff.vue')
				},
				// {/*视频异常*/
				// 	path: '/zdfx/spyc',
				// 	name: 'VideoAnomaly',
				// 	component: () => import('./views/terminalAnalysis/VideoAnomaly.vue')
				// },
				{/*公司管理员手机号管理*/
					path: '/zdfx/gsglysjhgl',
					name: 'AdministratorPhoneManagement',
					component: () => import('./views/terminalAnalysis/AdministratorPhoneManagement.vue')
				},
				{/*视频位移巡查*/
					path: '/zdfx/spyw',
					name: 'VideoShift',
					component: () => import('./views/terminalAnalysis/VideoShift.vue')
				},
				{/*维修工单*/
					path: '/zdfx/wxgdcx',
					name: 'RepairWorkOrderInquiry',
					component: () => import('./views/terminalAnalysis/RepairWorkOrderInquiry.vue')
				},
				{/*主机故障历史记录*/
					path: '/zdfx/zjgzlsjl',
					name: 'HostFailureHistory',
					component: () => import('./views/terminalAnalysis/HostFailureHistory.vue')
				},
				{/*偶发掉线车辆查询*/
					path: '/zdfx/ofdxcl/ofdxclcx',
					name: 'OccasionalDropOffVehicleInquiry',
					component: () => import('./views/terminalAnalysis/OccasionalDropOffVehicleInquiry.vue')
				},
				{/*偶发掉线车辆统计*/
					path: '/zdfx/ofdxcl/ofdxcltj',
					name: 'OccasionalDropOffVehicleStatistics',
					component: () => import('./views/terminalAnalysis/OccasionalDropOffVehicleStatistics.vue')
				},
				{/*重点区域管理*/
					path: '/zdfx/zdqy/zdqygl',
					name: 'KeyRegionalManagement',
					component: () => import('./views/terminalAnalysis/KeyRegionalManagement.vue')
				},
				{/*重点区域车辆数量实时分析*/
					path: '/zdfx/zdqy/zdqyclslssfx',
					name: ' KeyAreasVehicleQuantityRealTimeAnalysis',
					component: () => import('./views/terminalAnalysis/KeyAreasVehicleQuantityRealTimeAnalysis.vue')
				},
				{/*重点区域车辆数量月报表*/
					path: '/zdfx/zdqy/zdqyclslybb',
					name: 'KeyAreasVehicleQuantityMonthlyReport',
					component: () => import('./views/terminalAnalysis/KeyAreasVehicleQuantityMonthlyReport.vue')
				},
				{/*重点区域车辆数量半年报表*/
					path: '/zdfx/zdqy/zdqyclslbnbb',
					name: 'KeyAreasVehicleQuantityHalfAYearReport',
					component: () => import('./views/terminalAnalysis/KeyAreasVehicleQuantityHalfAYearReport.vue')
				},
				{/*重点区域车辆数量年报表*/
					path: '/zdfx/zdqy/zdqyclslnbb',
					name: 'KeyAreasVehicleQuantityYearReport',
					component: () => import('./views/terminalAnalysis/KeyAreasVehicleQuantityYearReport.vue')
				},
				{/*重点监控区域出租车数量预警*/
					path: '/zdfx/zdqy/zdjkqyczcslyj',
					name: 'KeyMonitoringAreasVehicleQuantityEarlyWarning',
					component: () => import('./views/terminalAnalysis/KeyMonitoringAreasVehicleQuantityEarlyWarning.vue')
				},
				{/*异常处置过程添加处理*/
					path: '/zdfx/zdqy/ycczgctjcl',
					name: 'abnormalDisposalProcess',
					component: () => import('./views/terminalAnalysis/AbnormalDisposalProcess.vue')
				},
				{/*异常处置报告*/
					path: '/zdfx/zdqy/ycczbg',
					name: 'abnormalDisposalReport',
					component: () => import('./views/terminalAnalysis/AbnormalDisposalReport.vue')
				},
				{/*异常数据查询*/
					path: '/zdfx/ycfx/ycsjbj',
					name: 'AbnormalDataAlarm',
					component: () => import('./views/terminalAnalysis/AbnormalDataAlarm.vue')
				},
				{/*年出租车保有量分析*/
					path: '/zdfx/ycfx/nczcbylfx',
					name: 'AnnualTaxiOwnershipAnalysis',
					component: () => import('./views/terminalAnalysis/AnnualTaxiOwnershipAnalysis.vue')
				},
				{/*计价器异常营运分析*/
					path: '/zdfx/ycfx/jjqycyyfx',
					name: 'AbnormalOperationValuatorAnalysis',
					component: () => import('./views/terminalAnalysis/AbnormalOperationValuatorAnalysis.vue')
				},
				{/*营运里程异常分析*/
					path: '/zdfx/ycfx/yylcycfx',
					name: 'AbnormalOperatingMileageAnalysis',
					component: () => import('./views/terminalAnalysis/AbnormalOperatingMileageAnalysis.vue')
				},
				{/*营运单次异常分析*/
					path: '/zdfx/ycfx/yydcycfx',
					name: 'SingleOperationAnomalyAnalysis',
					component: () => import('./views/terminalAnalysis/SingleOperationAnomalyAnalysis.vue')
				},
				{/*疑似套牌*/
					path: '/zdfx/ycfx/ystp',
					name: 'DoubtfulDeck',
					component: () => import('./views/terminalAnalysis/DoubtfulDeck.vue')
				},
				{/*疑似黑车*/
					path: '/zdfx/ycfx/yshc',
					name: 'SuspectedBlackCar',
					component: () => import('./views/terminalAnalysis/SuspectedBlackCar.vue')
				},
				{/*重点车辆营运违章数据推送*/
					path: '/zdfx/ycfx/zdclyywzsjts',
					name: 'PushingViolationDataOfKeyVehicleOperation',
					component: () => import('./views/terminalAnalysis/PushingViolationDataOfKeyVehicleOperation.vue')
				},
				{/*数据异常工单*/
					path: '/zdfx/ycfx/sjycgd',
					name: 'DataExceptionOrder',
					component: () => import('./views/terminalAnalysis/DataExceptionOrder.vue')
				},
				{/*重点车辆营运违章稽查*/
					path: '/zdfx/ycfx/zdclyywzjc',
					name: 'KeyVehicleOperationViolationInspection',
					component: () => import('./views/terminalAnalysis/KeyVehicleOperationViolationInspection.vue')
				},
				{/*异常数据报警整改报表*/
					path: '/zdfx/sjzl/ycsjbjzgbb',
					name: 'AbnormalDataAlarmRectificationReport',
					component: () => import('./views/terminalAnalysis/AbnormalDataAlarmRectificationReport.vue'),
				},
				{/*数据质量周报*/
					path: '/zdfx/sjzl/sjzlzb',
					name: 'WeeklyDataQualityReport',
					component: () => import('./views/terminalAnalysis/WeeklyDataQualityReport.vue'),
				},
				{/*数据质量月报*/
					path: '/zdfx/sjzl/sjzlyb',
					name: 'MonthlyDataQualityReport',
					component: () => import('./views/terminalAnalysis/MonthlyDataQualityReport.vue'),
				},
				{/*数据质量半年报*/
					path: '/zdfx/sjzl/sjzlbnb',
					name: 'SemiAnnualDataQualityReport',
					component: () => import('./views/terminalAnalysis/SemiAnnualDataQualityReport.vue'),
				},
				{/*数据质量年报*/
					path: '/zdfx/sjzl/sjzlnb',
					name: 'AnnualDataQualityReport',
					component: () => import('./views/terminalAnalysis/AnnualDataQualityReport.vue'),
				},
				/*企业函件管理*/
				{/*报停车辆管理*/
					path: '/qyhj/btclgl',
					name: 'ReportStopVehicleManage',
					component: () => import('./views/enterpriseLetters/ReportStopVehicleManage.vue'),
				},
				{/*报停车辆管理*/
					path: '/qyhj/btcltj',
					name: 'ReportingVehicleStatistics',
					component: () => import('./views/enterpriseLetters/ReportingVehicleStatistics.vue'),
				},
				/*工单管理统计*/
				/*维护管理统计*/
				{/*维修质量报告*/
					path: '/wxgl/wxzlbg',
					name: 'MaintenanceQualityReport',
					component: () => import('./views/maintenanceManageSystem/MaintenanceQualityReport.vue')
				},
				{/*维修记录查询*/
					path: '/wxgl/wxjlcx',
					name: 'MaintenanceRecordInquiry',
					component: () => import('./views/maintenanceManageSystem/MaintenanceRecordInquiry.vue')
				},
				{/*维修记录统计*/
					path: '/wxgl/wxjltj',
					name: 'MaintenanceRecordStatistics',
					component: () => import('./views/maintenanceManageSystem/MaintenanceRecordStatistics.vue')
				},
				/*运力调度管理*/
				{/*运力调度查询*/
					path: '/dldd/dlddcx',
					name: 'PowerSchedulingQuery',
					component: () => import('./views/capacityDispatchManage/PowerSchedulingQuery.vue')
				},
				{/*动力调度统计*/
					path: '/dldd/dlddtj',
					name: 'PowerSchedulingStatistics',
					component: () => import('./views/capacityDispatchManage/PowerSchedulingStatistics.vue')
				},
				/*服务平台使用情况*/
				{/*企业分中心查询*/
					path: '/fwpt/qyfzxcx',
					name: 'EnterpriseSubCenterQuery',
					component: () => import('./views/servicePlatformUsage/EnterpriseSubCenterQuery.vue')
				},
				{/*企业分中心统计*/
					path: '/fwpt/qyfzxtj',
					name: 'EnterpriseSubCenterStatistics',
					component: () => import('./views/servicePlatformUsage/EnterpriseSubCenterStatistics.vue')
				},
				{/*手持分中心查询*/
					path: '/fwpt/scfzxcx',
					name: 'HandheldSubCenterQuery',
					component: () => import('./views/servicePlatformUsage/HandheldSubCenterQuery.vue')
				},
				{/*手持分中心统计*/
					path: '/fwpt/scfzxtj',
					name: 'HandheldSubCenterStatistics',
					component: () => import('./views/servicePlatformUsage/HandheldSubCenterStatistics.vue')
				},
				{/*维修管理查询*/
					path: '/fwpt/wxglcx',
					name: 'MaintenanceManageInquiry',
					component: () => import('./views/servicePlatformUsage/MaintenanceManageInquiry.vue')
				},
				{/*维修管理统计*/
					path: '/fwpt/wxgltj',
					name: 'MaintenanceManageStatistics',
					component: () => import('./views/servicePlatformUsage/MaintenanceManageStatistics.vue')
				},
				{/*终端未安装查询*/
					path: '/fwpt/wazcx',
					name: 'TerminalQueryNotInstalled',
					component: () => import('./views/servicePlatformUsage/TerminalQueryNotInstalled.vue')
				},
				{/*安装情况统计*/
					path: '/fwpt/aztj',
					name: 'InstallationStatistics',
					component: () => import('./views/servicePlatformUsage/InstallationStatistics.vue')
				},
				{/*月度安装分析*/
					path: '/fwpt/ydaz',
					name: 'MonthlyInstallationAnalysis',
					component: () => import('./views/servicePlatformUsage/MonthlyInstallationAnalysis.vue')
				},
				{/*车辆转入审批*/
					path: '/fwpt/spgl/clzrsp',
					name: 'VehicleTransferApproval',
					component: () => import('./views/approvalManage/VehicleTransferApproval.vue')
				},
				{/*车牌号变更审批*/
					path: '/fwpt/spgl/cpbgsp',
					name: 'LicensePNChangeApproval',
					component: () => import('./views/approvalManage/LicensePNChangeApproval.vue')
				},
				{/*车辆报停审批*/
					path: '/fwpt/spgl/cpbtsp',
					name: 'VehicleParkingApproval',
					component: () => import('./views/approvalManage/VehicleParkingApproval.vue')
				},
				{/*车辆转出审批*/
					path: '/fwpt/spgl/clzcsp',
					name: 'VehicleTurnOutApproval',
					component: () => import('./views/approvalManage/VehicleTurnOutApproval.vue')
				},
				{/*数据接入审批*/
					path: '/fwpt/spgl/sjjrsp',
					name: 'DataAccessApproval',
					component: () => import('./views/approvalManage/DataAccessApproval.vue')
				},
				{/*车辆转入统计*/
					path: '/fwpt/spgl/clzrtj',
					name: 'VehicleTransferStatistics',
					component: () => import('./views/approvalManage/VehicleTransferStatistics.vue')
				},
				{/*车牌号变更统计*/
					path: '/fwpt/spgl/cphbgtj',
					name: 'LicensePNChangeStatistics',
					component: () => import('./views/approvalManage/LicensePNChangeStatistics.vue')
				},
				{/*报停车辆统计*/
					path: '/fwpt/spgl/btcltj',
					name: 'ReportingVehicleStatistics',
					component: () => import('./views/approvalManage/ReportingVehicleStatistics.vue')
				},
				{/*车辆转出统计*/
					path: '/fwpt/spgl/clzctj',
					name: 'VehicleTurnOutStatistics',
					component: () => import('./views/approvalManage/VehicleTurnOutStatistics.vue')
				},
				{/*回场车辆查询*/
					path: '/fwpt/hcgl/hcclcx',
					name: 'ReturnVehicleInquiry',
					component: () => import('./views/returnManage/ReturnVehicleInquiry.vue')
				},
				{/*回场报表统计*/
					path: '/fwpt/hcgl/hcbbtj',
					name: 'ReturnReportStatistics',
					component: () => import('./views/returnManage/ReturnReportStatistics.vue')
				},
				{/*未按时回场车辆查询*/
					path: '/fwpt/hcgl/washcclcx',
					name: 'FailureReturnVehicleOnTime',
					component: () => import('./views/returnManage/FailureReturnVehicleOnTime.vue')
				},
				{/*回场公司设置*/
					path: '/fwpt/hcgl/hcgssz',
					name: 'ReturnCompanySettings',
					component: () => import('./views/returnManage/ReturnCompanySettings.vue')
				},
				{/*回场区域设置*/
					path: '/fwpt/hcgl/hcqysz',
					name: 'ReturnAreaSetting',
					component: () => import('./views/returnManage/ReturnAreaSetting.vue')
				},
				/*行业运行情况*/
				{/*单车营运情况*/
					path: '/hyyx/dcyyqk',
					name: 'BicycleOperation',
					component: () => import('./views/industryOperation/BicycleOperation.vue')
				},
				{/*行业营运情况*/
					path: '/hyyx/hyyyqk',
					name: 'IndustryOperation',
					component: () => import('./views/industryOperation/IndustryOperation.vue')
				},
				{/*行业平均运行情况*/
					path: '/hyyx/hypjyxqk',
					name: 'AverageIndustryPerformance',
					component: () => import('./views/industryOperation/AverageIndustryPerformance.vue')
				},
				{/*企业车辆营运情况*/
					path: '/hyyx/qyclyyqk',
					name: 'EnterpriseVehicleOperation',
					component: () => import('./views/industryOperation/EnterpriseVehicleOperation.vue')
				},
				{/*驾驶员收入情况*/
					path: '/hyyx/jsysrqk',
					name: 'DriverIncome',
					component: () => import('./views/industryOperation/DriverIncome.vue')
				},
				{/*车辆运行排行*/
					path: '/hyyx/clyxph',
					name: 'VehicleRunningRanking',
					component: () => import('./views/industryOperation/VehicleRunningRanking.vue')
				},
				{/*运力需求热点*/
					path: '/hyyx/ylxqrd',
					name: 'CapacityDemandHotsPot',
					component: () => import('./views/industryOperation/CapacityDemandHotsPot.vue')
				},
				{/*OD营运数据分析*/
					path: '/hyyx/dcrdod/odyysj',
					name: 'ODOperationDataAnalysis',
					component: () => import('./views/industryOperation/ODOperationDataAnalysis.vue')
				},
				{/*OD流向统计*/
					path: '/hyyx/dcrdod/odlxtj',
					name: 'ODFlowStatistics',
					component: () => import('./views/industryOperation/ODFlowStatistics.vue')
				},
				{/*OD流向图*/
					path: '/hyyx/dcrdod/odlxt',
					name: 'ODFlowDiagram',
					component: () => import('./views/industryOperation/ODFlowDiagram.vue')
				},
				{/*夜间停放位置分析*/
					path: '/hyyx/yjtfwz',
					name: 'ParkingPlaceAtNight',
					component: () => import('./views/industryOperation/ParkingPlaceAtNight.vue')
				},
				{/*打车需求热点位置分析*/
					path: '/hyyx/dcxqrdwz',
					name: 'HotSpotOfTaxiDemand',
					component: () => import('./views/industryOperation/HotSpotOfTaxiDemand.vue')
				},
				{/*车辆流向位置分析*/
					path: '/hyyx/cllxwz',
					name: 'VehicleFlowPosition',
					component: () => import('./views/industryOperation/VehicleFlowPosition.vue')
				},
				{/*驾驶员违法统计*/
					path: '/hyyx/jsywftj',
					name: 'DriverViolationStatistics',
					component: () => import('./views/industryOperation/DriverViolationStatistics.vue')
				},
				{/*投诉查询*/
					path: '/hyyx/tscx',
					name: 'ComplaintInquiry',
					component: () => import('./views/industryOperation/ComplaintInquiry.vue')
				},
				{/*抓拍数据查询*/
					path: '/hyyx/zpsj/zpsjcx',
					name: 'CaptureDataQuery',
					component: () => import('./views/industryOperation/CaptureDataQuery.vue')
				},
				{/*场站流量统计*/
					path: '/hyyx/zpsj/calltj',
					name: 'StationTrafficStatistics',
					component: () => import('./views/industryOperation/StationTrafficStatistics.vue')
				},
				{/*日流量统计*/
					path: '/hyyx/zpsj/rlltj',
					name: 'DailyTrafficStatistics',
					component: () => import('./views/industryOperation/DailyTrafficStatistics.vue')
				},
				{/*分段流量统计*/
					path: '/hyyx/zpsj/fdlltj',
					name: 'SegmentedTrafficStatistics',
					component: () => import('./views/industryOperation/SegmentedTrafficStatistics.vue')
				},
				{/*运行中不在线车辆*/
					path: '/hyyx/yxzbzxcl',
					name: 'VehiclesOperationNotOnline',
					component: () => import('./views/industryOperation/VehiclesOperationNotOnline.vue')
				},
				{/*运行中不在线车辆统计*/
					path: '/hyyx/yxzbzxcltj',
					name: 'VehiclesOperationNotOnlineStatistics',
					component: () => import('./views/industryOperation/VehiclesOperationNotOnlineStatistics.vue')
				},
				{/* 司机签到签退查询*/
					path: '/hyyx/sjqdqtcx',
					name: 'DriverSignAndSignOffQuery',
					component: () => import('./views/industryOperation/DriverSignAndSignOffQuery.vue')
				},
				/*运政数据接入*/
				{/*车辆信息*/
					path: '/sjdj/clxx',
					name: 'VehicleInfo',
					component: () => import('./views/transportDataAccess/VehicleInfo.vue')
				},
				{/*驾驶员信息*/
					path: '/sjdj/jsyxx',
					name: 'DriverInfo',
					component: () => import('./views/transportDataAccess/DriverInfo.vue')
				},
				{/*公司信息*/
					path: '/sjdj/gsxx',
					name: 'CompanyInfo',
					component: () => import('./views/transportDataAccess/CompanyInfo.vue')
				},
				{/*交班信息*/
					path: '/sjdj/jbxx',
					name: 'handoverInfo',
					component: () => import('./views/transportDataAccess/handoverInfo.vue')
				},
				{/*服务质量平台*/
					path: '/sjdj/fwzlpt',
					name: 'ServiceQualityPlatform',
					component: () => import('./views/transportDataAccess/ServiceQualityPlatform.vue')
				},
				/*支付服务*/
				{/*支付明细查询*/
					path: '/zffw/zfmxcx',
					name: 'PaymentDetailsInquiry',
					component: () => import('./views/paymentService/PaymentDetailsInquiry.vue')
				},
				{/*支付账单统计*/
					path: '/zffw/zfzdtf',
					name: 'PayBillsStatistics',
					component: () => import('./views/paymentService/PayBillsStatistics.vue')
				}
			]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    }
  ]
})
