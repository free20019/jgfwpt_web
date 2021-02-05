<!--停运协查审批-->
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
                <el-select v-model="query.assist" placeholder="协查类型" clearable>
                    <el-option v-for="item in this.table.select.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.type" placeholder="审核状态" clearable>
                    <el-option v-for="item in this.table.select.approvalStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;" :row-class-name="handleFailedClick">
                <el-table-column type="index" label="序号" width="60" align="center" :resizable="false" fixed></el-table-column>
                <el-table-column prop="TYPE" label="协查类型" width="180" align="center"></el-table-column>
                <el-table-column prop="COMP" label="公司"  align="center" width="240" show-overflow-tooltip></el-table-column>
                <el-table-column prop="VEHI_NO" label="车号" width="120" align="center"></el-table-column>
                <el-table-column prop="SUBMIT_PEOPLE" label="提交人" min-width="120" align="center" :resizable="false"></el-table-column>
                <el-table-column prop="CONTENT" label="查询内容" width="240"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="ACCEPT_DATE" label="受理时间" width="180" align="center"></el-table-column>
                <el-table-column prop="ACCEPT_GH" label="受理工号" width="120" align="center"></el-table-column>
                <el-table-column prop="DEAL_GH" label="处理工号" width="120" align="center"></el-table-column>
                <el-table-column prop="NOTICE_GH" label="通知工号" width="120" align="center"></el-table-column>
                <el-table-column prop="NOTICE_DATE" label="通知时间" width="180" align="center"></el-table-column>
                <el-table-column label="图片" width="100" align="center">
                        <template scope="scope">
                            <div v-if="scope.row.PIC!==''">
                                <div v-if="/.(gif|jpg|jpeg|png)$/.test(scope.row.PIC)">
                                    <div class="images" v-viewer="{movable: false}">
                                        <img :src="baseURL+'common/pic?key='+scope.row.PIC.replace('D:\\offline\\','O:/')" width="50" height="50" class="head_pic" alt=""/>
                                        <!--<img :src="baseURL+'common/pic?key=E:/upload/image/1572227801575.jpg'" width="50" height="50" class="head_pic" alt=""/>-->
                                    </div>
                                </div>
                                <div v-else>
                                    <a  style="text-decoration:none;" target="_blank"  title="下载文件" :href="baseURL+'common/download?key='+scope.row.PIC.replace('D:\\offline\\','O:/')" >下载</a>
                                    <!--<a style="text-decoration:none;" target="_blank" title="下载文件" :href="baseURL+'common/download?key=E:/upload/image/1572227801575.jpg'" >下载</a>-->
                                </div>
                            </div>
                        </template>

                </el-table-column>
                <el-table-column prop="STATE" label="审批状态" width="120" align="center"></el-table-column>
                <el-table-column prop="SH_GH" label="审批人工号" width="120" align="center"></el-table-column>
                <el-table-column prop="FAILREASON" label="审批原因" width="240" align="center"></el-table-column>
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
        name: "DecommissioningAssistanceApproval",
        data() {
            return {
                query:{
                    vehicle: '',
                    companyName: '',
                    assist:'',
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
                    total: 0,
                    select: {
                        company: [],
                        vehicle: [],
                        type: [
                            {value: '1', label: '营运数据协查'},
                            {value: '2', label: '行车轨迹协查'},
                        ],
                        approvalStatus: [
                            {value: '0', label: '未审核'},
                            {value: '1', label: '审核通过'},
                            {value: '2', label: '审核不通过'},
                        ]
                    }
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
                this.getDecommissioningAssistanceApproval();
                this.getThisTableField('COMP');
                this.getThisTableField('VEHI_NO');
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
                else cb(_.filter(this.table.select.vehicle, item => item.label.indexOf(query) > -1));
            },
            queryCompanyNameSearch(query, cb) {
                cb(_.filter(this.table.select.company, item => item.label.indexOf(query) > -1));
            },
            getThisTableField(field){
                axios.get('area/getThisTableField', {
                    baseURL: this.baseURL,
                    params: {
                        field
                    }
                }).then(res => {
                    if (field==='COMP'){
                        this.table.select.company = _.map(res.data, item => {
                            return {value: item[field], label: item[field]}
                        })||[];
                    } else if (field==='VEHI_NO') {
                        this.table.select.vehicle = _.map(res.data, item => {
                            return {value: item[field], label: item[field]}
                        })||[];
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            queryJobNumberSearch(query, cb) {
                cb(_.filter(this.getJobNumber, item => item.label.indexOf(query) > -1));
            },
            getDecommissioningAssistanceApproval(){
                let status=0;
                this.table.loading = true;
                const {vehicle, companyName, assist, stime, etime, type} = this.query;
                axios.get('area/getDecommissioningAssistanceApproval', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        companyName,
                        assist,
                        stime:stime && formatDateTime(stime),
                        etime:etime && formatDateTime(etime),
                        type
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
                const item =this.table.selectItem;
                if(!jobNum) return this.$message.error('请选择工号！');
                const {flag} = this.dialog;
                axios.get('area/decommissioningAssistanceAudit', {
                    baseURL: this.baseURL,
                    params: {
                        id:item.ID,
                        jobNum,
                        reason:flag===true?"":reason,
                        issh:flag===true?"1":"2"}
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "操作成功!", type: 'success'});
                        this.dialog.display = false;
                        this.getDecommissioningAssistanceApproval();
                    }else{
                        this.$message.error('操作失败！');
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            /*事件*/
            handleJobNumberSelect(item) {
                this.dialog.form.jobNum = item.value
            },
            handleQueryClick() {
                this.getDecommissioningAssistanceApproval();
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
                this.dialog.form.jobNum = item.SH_GH;
                this.dialog.form.jobNumber = item.SH_GH;
                this.dialog.form.reason = item.FAILREASON;
                this.table.selectItem = item;
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = true;
            },
            handleReviewFalseClick(item) {
                this.dialog.form.jobNum = item.SH_GH;
                this.dialog.form.jobNumber = item.SH_GH;
                this.dialog.form.reason = item.FAILREASON;
                this.table.selectItem = item;
                this.dialog.display = true;
                this.dialog.title = '审批';
                this.dialog.flag = false;
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
            },
            handleFailedClick({row, rowIndex}){
               if (row.STATE==='审核不通过') return 'warning-row';
            }
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: red;
    }
</style>