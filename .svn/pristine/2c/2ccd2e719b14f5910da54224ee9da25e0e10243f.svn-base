<!--爱心业务用车记录审批-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
                                 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
                                 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.address" placeholder="详细地址" ></el-input>
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
                <el-select v-model="query.type" placeholder="审核状态">
                    <el-option v-for="item in getApprovalStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleAuditTrueClick">批量通过</el-button>
                <el-button type="primary" @click="handleAuditFalseClick">批量不通过</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="filterTableList" v-loading="table.loading" ref="multipleTable"  @selection-change="handleSelectionChange" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号" width="60" align="center" :resizable="false" fixed></el-table-column>
                <el-table-column prop="DB_TIME" label="生成时间" width="200" align="center"></el-table-column>
                <el-table-column prop="COMMIT_PERSON" label="录入人员" width="120" align="center"></el-table-column>
                <el-table-column prop="CUST_NAME" label="客户姓名" width="120" align="center"></el-table-column>
                <el-table-column prop="CUST_TEL" label="手机号码" width="120" align="center"></el-table-column>
                <el-table-column prop="JSYXM" label="驾驶员姓名" width="120" align="center"></el-table-column>
                <el-table-column prop="CF" label="车费金额" width="120" align="center"></el-table-column>
                <el-table-column prop="DDQY" label="调度区域" width="120" align="center"></el-table-column>
                <el-table-column prop="ADDRESS" label="详细地址" width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="DEST_ADDRESS" label="目的地址" width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="DISP_TIME" label="用车时间" width="200" align="center"></el-table-column>
                <el-table-column prop="VEHI_NO1" label="所派车辆" width="120" align="center"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域"  align="center" width="140"></el-table-column>
                <el-table-column prop="SJDH1" label="司机联系方式" width="120" align="center"></el-table-column>
                <el-table-column prop="SIM_NUM1" label="SIM卡" width="120" align="center"></el-table-column>
                <el-table-column prop="COMP_NAME1" label="所属公司" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="YCMS" label="用车模式" width="120" align="center"></el-table-column>
                <el-table-column prop="TSRQ" label="特殊人群" width="120" align="center"></el-table-column>
                <el-table-column prop="PTQK" label="陪同情况" width="120" align="center"></el-table-column>
                <el-table-column prop="YCXQ" label="用车需求" width="120" align="center"></el-table-column>
                <el-table-column prop="NOTE" label="附加信息" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="SZQY" label="所在区域" width="120" align="center"></el-table-column>
                <el-table-column prop="AUDIT_DATE" label="审核时间" width="140" align="center"></el-table-column>
                <el-table-column prop="REAL_NAME" label="审核人员" width="140" align="center"></el-table-column>
                <el-table-column prop="AUDIT_REASON" label="审核原因" width="140" header-align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="AUDIT_STATUS" label="审核状态" width="140" align="center"></el-table-column>
                <el-table-column label="操作" width="80" :resizable="false" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="审核通过" placement="left" :hide-after="700">
                            <el-button class="tw-table-button" type="text" size="mini" icon="el-icon-check" @click="handleReviewTrueClick(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="审核不通过" placement="left" :hide-after="700">
                            <el-button class="tw-table-button" type="text" size="mini" icon="el-icon-close" @click="handleReviewFalseClick(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
        <el-dialog :title="dialog.title" :visible.sync="dialog.display" width="400px" @closed="handleDialogClosed">
            <el-form ref="form" :model="dialog.form" label-width="100px">
                <el-form-item label="审核人工号">
                    <el-autocomplete v-model="dialog.form.jobNumber" placeholder="审核人工号" :fetch-suggestions="queryJobNumberSearch" :trigger-on-focus="false" @select="handleJobNumberSelect" style="width: 260px;"></el-autocomplete>
                </el-form-item>
                <el-form-item label="原因" v-if="!dialog.flag">
                    <el-input v-model="dialog.form.reason" type="textarea" rows="4" placeholder="原因" style="width: 260px;"></el-input>
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
    import {mapGetters} from 'vuex'
    import {formatDateTime} from "../../assets/js/util";

    export default {
        name: "LoveApprovalBusinessVehicleUseRecord",
        data() {
            return {
                query:{
                    vehicle: '',
                    companyName: '',
                    phone:'',
                    address:'',
                    area:'',
                    stime: '',
                    etime:'',
                    type: ''
                },
                table: {
                    multipleSelection: [],
                    loading: false,
                    data: [],
                    selectItem: {},
                    pageSize: 20,
                    currentPage: 1,
                    total: 0
                },
                dialog: {
                    display: false,
                    title: '',
                    flag: false,
                    form: {
                        jobNumber:'',
                        jobNum: '',
                        reason: ''
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.stime = moment().format('YYYY-MM-DD 00:00:00');
                this.query.etime = moment().format('YYYY-MM-DD 23:59:59');
                this.getLoveApprovalBusinessVehicleUseRecord();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber', 'getCompanyName', 'getApprovalStatus', 'getJobNumber','getRegionReal']),
            filterTableList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage - 1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.table.multipleSelection = val;
            },
            handleAuditTrueClick(){
              if(this.table.multipleSelection.length===0) return this.$message.error('请先选中至少一条！！');
              if(this.table.multipleSelection.length===1){
                  this.handleReviewTrueClick(this.table.multipleSelection[0])
              }else{
                  this.dialog.display = true;
                  this.dialog.title = '审批';
                  this.dialog.flag = true;
              }
            },
            handleAuditFalseClick(){
              if(this.table.multipleSelection.length===0) return this.$message.error('请先选中至少一条！！');
                if(this.table.multipleSelection.length===1){
                    this.handleReviewFalseClick(this.table.multipleSelection[0])
                }else{
                    this.dialog.display = true;
                    this.dialog.title = '审批';
                    this.dialog.flag = false;
                }
            },
            /*接口*/
            queryVehicleSearch(query, cb) {
                if (query.length < 3) cb(null);
                else cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
            },
            queryCompanyNameSearch(query, cb) {
                cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
            },
            queryJobNumberSearch(query, cb) {
                cb(_.filter(this.getJobNumber, item => item.label.indexOf(query) > -1));
            },
            getLoveApprovalBusinessVehicleUseRecord(){
                let status=0;
                this.table.loading = true;
                const {vehicle, companyName,phone,address, area, stime, etime, type} = this.query;
                axios.get('area/loveApproval', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        companyName,
                        phone,
                        address,
                        area,
                        stime:stime && formatDateTime(stime),
                        etime:etime && formatDateTime(etime),
                        type,
                        status
                    }
                }).then(res => {
                    console.log(res.data);
                    this.table.data = res.data||[];
                    this.table.total = this.table.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getTransferAudit(){
                const {jobNum, reason} = this.dialog.form;
                // const item =this.table.selectItem;
                let ids = _.map(this.table.multipleSelection,item=>{
                    return item.DISP_ID;
                });
                if(!jobNum) return this.$message.error('请选择工号！');
                const {flag} = this.dialog;
                axios.get('area/loveApprovalAudit', {
                    baseURL: this.baseURL,
                    params: {
                        // id:item.DISP_ID,
                        id:ids.toString(),
                        jobNum,
                        reason:flag===true?"":reason,
                        issh:flag===true?"0":"1"}
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "操作成功!", type: 'success'});
                        this.dialog.display = false;
                        this.getLoveApprovalBusinessVehicleUseRecord();
                    }else{
                        this.$message.error('操作失败！');
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            handleExportClick() {
                const {vehicle, companyName,phone,address, area, stime, etime, type} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}area/loveApprovalExcel?vehicle=${vehicle}&companyName=${companyName}&phone=${phone}&address=${address}&area=${area}&stime=${stime && formatDateTime(stime)}&etime=${etime && formatDateTime(etime)}&type=${type}`);
                }).catch(() => {});
            },
            /*事件*/
            handleJobNumberSelect(item) {
                this.dialog.form.jobNum = item.id
            },
            handleQueryClick() {
                this.getLoveApprovalBusinessVehicleUseRecord();
            },
            handleDialogSaveClick() {
                this.getTransferAudit();
            },
            handleDialogClosed() {
                this.dialog.title = '审批';
                this.dialog.flag = false;
                this.dialog.form.jobNum = '';
                this.dialog.form.jobNumber = '';
                this.dialog.form.reason = '';
                this.table.selectItem = {};
            },
            handleReviewTrueClick(item) {
                this.dialog.form.jobNum = item.USER_ID;
                this.dialog.form.jobNumber = item.USER_NAME;
                this.dialog.form.reason = item.AUDIT_REASON;
                this.table.selectItem = item;
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(this.table.selectItem);
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = true;
            },
            handleReviewFalseClick(item) {
                this.dialog.form.jobNum = item.USER_ID;
                this.dialog.form.jobNumber = item.USER_NAME;
                this.dialog.form.reason = item.AUDIT_REASON;
                this.table.selectItem = item;
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(this.table.selectItem);
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = false;
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>