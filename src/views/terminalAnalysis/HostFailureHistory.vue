<!--主机故障历史记录-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.lPNumber" placeholder="车牌号码"
                                 :fetch-suggestions="getLPNumberRemoteMethod" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.area" placeholder="区域">
                    <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
            <el-date-picker arrow-control type="date" v-model="query.time" placeholder="选择时间点"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <tree-select class="tw-tree-select tw-line" v-model="query.faultType" :multiple="true" :options="getFaultType" placeholder="故障类型"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="cphm" label="车牌号码" min-width="180"></el-table-column>
                <el-table-column prop="qy" label="公司" width="240"></el-table-column>
                <el-table-column prop="area" label="区域" width="240"></el-table-column>
                <el-table-column prop="time" label="时间" min-width="180"></el-table-column>
                <el-table-column prop="ydwwyy" label="有定位无营运" width="180" >
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.ydwwyy)" v-text="formatError(scope.row.ydwwyy)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="yyywdw" label="有营运无定位" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.yyywdw)" v-text="formatError(scope.row.yyywdw)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="yzpwdwwyy" label="有抓拍无定位无营运" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.yzpwdwwyy)" v-text="formatError(scope.row.yzpwdwwyy)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="sevenwdwwyy" label="7天无定位无营运" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.sevenwdwwyy)" v-text="formatError(scope.row.sevenwdwwyy)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="wkcwbh" label="空重车无变化" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.wkcwbh)" v-text="formatError(scope.row.wkcwbh)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="sphp" label="视频黑屏" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.sphp)" v-text="formatError(scope.row.sphp)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="spyw" label="视频移位" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.spyw)" v-text="formatError(scope.row.spyw)"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="spdx" label="视频断线" width="180">
                    <template slot-scope="scope">
                        <span :class="formatSystemReviewClassName(scope.row.spdx)" v-text="formatError(scope.row.spdx)"></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next ,total" @current-change="handleTablePageCurrentChange"></el-pagination>
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
    import {formatDate} from "../../assets/js/util";

    export default {
        name: "HostFailure",
        data() {
            return {
                query: {
                    lPNumber: '',
                    area:'',
                    time: '',
                    faultType: []
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
                this.query.time = moment().subtract(1,'day');
                this.getHostFailureHistory();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber', 'getFaultType','getRegionReal']),
            filterVehicleList() {
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
            getHostFailureHistory() {
                this.table.loading = true;
                const {lPNumber,area, time, faultType} = this.query;
                const {currentPage,pageSize} = this.table;
                axios.get('terminal/hostfailurehistory', {
                    baseURL: this.baseURL,
                    params: {
                        lPNumber,
                        area,
                        time: time && formatDate(time),
                        faultType: faultType.toString(),
                        currentPage,
                        pageSize
                    }
                }).then(res => {
                    console.log(res.data.datas);
                    this.table.data = _.map(res.data.datas, item => {
                        return {
                            cphm: item.VEHICLE_NO,
                            qy: item.COMP_NAME,
                            area: item.AREA_NAME,
                            time:item.TIME,
                            ydwwyy: item.NO_GPS,
                            yyywdw: item.NO_JJQ,
                            yzpwdwwyy: item.NO_GPS_JJQ,
                            sevenwdwwyy:item.SEVEN_GPS_JJQ,
                            wkcwbh: item.EMPTY_HEAVY,
                            sphp: item.SCREEN_BLACK,
                            spyw: item.MOVE_ON,
                            spdx: item.BREAK_OFF,
                            sh:item.IF_CHECK,
                            order:item.ORDER_RESULT
                        }
                    });
                    this.table.total = res.data.count;
                    // this.table.total = this.table.data.length;
                    // this.table.currentPage = 1;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.table.currentPage = 1;
                this.getHostFailureHistory();
            },
            handleExportClick() {
                const {lPNumber,area,time, faultType} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}terminal/hostfailurehistorydc?lPNumber=${lPNumber}&area=${area}&time=${time&&formatDate(time)}&faultType=${faultType.toString()}`);
                }).catch(() => {

                });
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                this.getHostFailureHistory();
            },
            formatError(Value){
                return Value === '1'? '故障' : Value === '0' ? '无故障' :  ''
            },
            formatSystemReviewClassName(type) {
                switch (type) {
                    case '0':
                        return 'tw-text-success';
                    case '1':
                        return 'tw-text-error';
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