<!--车辆转出审批-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
                                 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.companyName" placeholder="原公司名称"
                                 :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
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
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60" align="center" :resizable="false" fixed></el-table-column>
                <el-table-column prop="cphm" label="车牌号码" width="140" align="center" fixed></el-table-column>
                <el-table-column prop="ygsmc" label="原公司名称" width="280" header-align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xgsmc" label="现公司名称" width="280" header-align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="area" label="区域" width="240"></el-table-column>
                <el-table-column prop="zrsj" label="转出时间" width="150" align="center"></el-table-column>
                <el-table-column prop="sqsj" label="申请时间" width="150" align="center"></el-table-column>
                <el-table-column prop="shzt" label="审核状态" width="140" align="center"></el-table-column>
                <el-table-column prop="shsj" label="审核时间" width="150" align="center"></el-table-column>
                <el-table-column prop="shyy" label="审核原因" width="380" header-align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shre" label="审核人" min-width="160" align="center" :resizable="false"></el-table-column>
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
        name: "VehicleTransferApproval",
        data() {
            return {
                query:{
                    vehicle: '',
                    companyName: '',
                    area:'',
                    stime: '',
                    etime:'',
                    type: ''
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
                this.getVehicleTransferApproval();
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
            getVehicleTransferApproval(){
                let status=1;
                this.table.loading = true;
                const {vehicle, companyName, area, stime, etime, type} = this.query;
                axios.get('area/vehicletransfer', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        companyName,
                        area,
                        stime:stime && formatDateTime(stime),
                        etime:etime && formatDateTime(etime),
                        type,
                        status
                    }
                }).then(res => {
                    console.log(res.data);
                    this.table.data = _.map(res.data, item => {
                        return {
                            id:item.ID,
                            userid:item.USER_ID,
                            user:item.USER_NAME,
                            cphm: item.VEHICLE_NO,
                            ygsmc: item.OLD_COMPANY,
                            xgsmc: item.NEW_COMPANY,
                            area: item.AREA_NAME,
                            zrsj: item.ZRSJ,
                            sqsj: item.SQSJ,
                            shzt: item.AUDIT_STATUS==='0'?'审核通过':(item.AUDIT_STATUS==='1'?'审核不通过':'未审核'),
                            shsj: item.SHSJ,
                            shyy: item.REASON,
                            shre: item.REAL_NAME
                        }
                    });
                    this.table.total = this.table.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getTransferAudit(){
                const {jobNum, reason} = this.dialog.form;
                const item =this.table.selectItem;
                if(!jobNum) return this.$message.error('请选择工号！');
                const {flag} = this.dialog;
                axios.get('area/transferaudit', {
                    baseURL: this.baseURL,
                    params: {
                        id:item.id,
                        jobNum,
                        reason:flag===true?"":reason,
                        issh:flag===true?"0":"1"}
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "操作成功!", type: 'success'});
                        this.dialog.display = false;
                        this.getVehicleTransferApproval();
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
                this.getVehicleTransferApproval();
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
                this.dialog.form.jobNum = item.userid;
                this.dialog.form.jobNumber = item.user;
                this.dialog.form.reason = item.shyy;
                this.table.selectItem = item;
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = true;
            },
            handleReviewFalseClick(item) {
                this.dialog.form.jobNum = item.userid;
                this.dialog.form.jobNumber = item.user;
                this.dialog.form.reason = item.shyy;
                this.table.selectItem = item;
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = false;
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>