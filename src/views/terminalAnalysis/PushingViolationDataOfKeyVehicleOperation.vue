<!--重点车辆营运违章数据推送-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.lPNumber" placeholder="车牌号码"
                                 :fetch-suggestions="getLPNumberRemoteMethod" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.illegalType" placeholder="违章类型">
                    <el-option v-for="item in illegalTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.area" placeholder="区域">
                    <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.stime" type="date" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.etime" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="VEHICLE_NO" label="车牌号码" min-width="100"></el-table-column>
                <el-table-column prop="COMPANY_NAME" label="公司" width="240"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域" width="140"></el-table-column>
                <el-table-column prop="ILLEGAL_TYPE" label="违章类型" width="140"></el-table-column>
                <el-table-column prop="TIME" label="时间" width="140"></el-table-column>
                <el-table-column label="审核" width="140">
                    <template slot-scope="scope">
                        <div v-if="scope.row.IS_CHECK===0">
                            <span>不属实</span>
                        </div>
                        <div v-else>
                            <el-button class="tw-table-button" size="mini" v-if="scope.row.ORDER_RESULT!==0" @click="handleReviewClick(scope.row)">属实</el-button>
                            <el-button class="tw-table-button" size="mini" v-if="scope.row.ORDER_RESULT!==0" @click="handleNoReviewClick(scope.row)">不属实</el-button>
                            <span v-else>等待工单结束</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import TreeSelect from '@riophae/vue-treeselect'
    import FaultReview from '../../components/TableColumn/FaultReview'
    import {mapGetters} from 'vuex'
    import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'

    export default {
        name: "PushingViolationDataOfKeyVehicleOperation",
        data() {
            return {
                query: {
                    lPNumber: '',
                    illegalType: '1',
                    area:'',
                    stime: '',
                    etime: ''
                },
                illegalTypeList: [
                    {value: '1', label: '出租汽车绕道'},
                    {value: '2', label: '计价器异常'},
                    {value: '3', label: '营运时间异常'},
                    {value: '4', label: '模子车'},
                    {value: '5', label: '疑似黑车'},
                    {value: '6', label: '疑似套牌车'},
                ],
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
                this.query.stime = moment().subtract(1,'day');
                this.query.etime = moment();
                this.getPushingViolationDataOfKeyVehicleOperation();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber','getRegionReal']),
            filterList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage -1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
            /*数据接口*/
            getLPNumberRemoteMethod(query, cd) {
                if (query.length < 3) cd(null);
                else
                    cd(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1))
            },
            getPushingViolationDataOfKeyVehicleOperation() {
                this.table.loading = true;
                const {lPNumber,  illegalType, area, stime, etime} = this.query;
                const {currentPage,pageSize} = this.table;
                axios.get('keyArea/getPushingViolationDataOfKeyVehicleOperation', {
                    baseURL: this.baseURL,
                    params: {
                        lPNumber,
                        illegalType,
                        area,
                        stime: stime&&moment(stime).format('YYYY-MM-DD'),
                        etime: etime&&moment(etime).format('YYYY-MM-DD'),
                        currentPage,
                        pageSize
                    }
                }).then(res => {
                    console.log(res.data);
                    this.table.data = res.data.datas||[];
                    this.table.total = res.data.count;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getAudit(item, type) {
                axios.get('keyArea/audit', {
                    baseURL: this.baseURL,
                    params: {
                        check_id: item.ID,
                        vehicle: item.VEHICLE_NO,
                        illegal_type: item.ILLEGAL_TYPE,
                        illegal_id: item.ILLEGAL_ID,
                        result: type
                    }
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "审核成功!", type: 'success'});
                        this.getPushingViolationDataOfKeyVehicleOperation();
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
                this.getPushingViolationDataOfKeyVehicleOperation();
            },
            handleReviewClick(item) {
                this.$confirm('是否确定?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    // 属实操作
                    this.getAudit(item, 1);
                }).catch(() => {
                });
            },
            handleNoReviewClick(item) {
                this.$confirm('是否确定?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    // 不实操作
                    this.getAudit(item, 0);
                }).catch(() => {
                });
            },
            handleExportClick() {
                const {lPNumber,  illegalType, area, stime, etime} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}keyArea/getPushingViolationDataOfKeyVehicleOperationExcel?lPNumber=${lPNumber}&illegalType=${illegalType}&area=${area}&stime=${stime&&moment(stime).format('YYYY-MM-DD')}&etime=${etime&&moment(etime).format('YYYY-MM-DD')}`);
                }).catch(() => {

                });
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                this.getPushingViolationDataOfKeyVehicleOperation();
            },
        },
        components: {
            'tree-select': TreeSelect,
            FaultReview
        }
    }
</script>

<style scoped>
</style>