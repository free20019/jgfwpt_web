<!--运行中不在线车辆统计-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.vehicle"
                                 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false" placeholder="请输入车牌号码"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.area" placeholder="区域">
                    <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker arrow-control type="date" v-model="query.sTime" placeholder="抓拍开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker arrow-control type="date" v-model="query.eTime" placeholder="抓拍结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                　 <el-checkbox v-model="query.type">过滤当天抓拍重复</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="VEHICLE_NO" label="车牌号码" min-width="120"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域" width="300"></el-table-column>
                <el-table-column prop="COUNT" label="次数" width="250"></el-table-column>
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import TWUnit from '../../components/TWTableColumn/TWUnit'
    import {formatCustomizeDate, formatDateTime} from '../../assets/js/util'
    import {mapGetters} from 'vuex'

    export default {
        name: "BicycleOperation",
        data() {
            return {
                query: {
                    vehicle: '',
                    area:'',
                    sTime: '',
                    eTime: '',
                    type:'',
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
                this.query.sTime = formatCustomizeDate(moment(), 'YYYY-MM-DD');
                this.query.eTime = formatCustomizeDate(moment(), 'YYYY-MM-DD');
                this.getVehiclesOperationNotOnline();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber','getRegionReal']),
            filterTableList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage -1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
            /*接口*/
            getVehiclesOperationNotOnlineStatistics(){
                this.table.loading = true;
                const {vehicle, area, sTime, eTime, type} = this.query;
                axios.get('industryOperation/getVehiclesOperationNotOnlineStatistics', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        area,
                        sTime: sTime && moment(sTime).format('YYYY-MM-DD 00:00:00'),
                        eTime: eTime && moment(eTime).format('YYYY-MM-DD 23:59:59'),
                        type
                    }
                }).then(res => {
                    this.table.data =  res.data;
                    this.table.total = res.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                })
            },
            queryVehicleSearch(query, cb) {
                if(query.length < 3) cb = null;
                else cb(_.filter(this.getLPNumber, item => item.label.indexOf(query) > -1));
            },
            /*事件*/
            handleQueryClick() {
                this.table.currentPage = 1;
                this.getVehiclesOperationNotOnlineStatistics();
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                // this.getVehiclesOperationNotOnlineStatistics();
            },
            handleExportClick() {
                const {vehicle, area, sTime, eTime, type} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}industryOperation/getVehiclesOperationNotOnlineStatisticsExcel?vehicle=${vehicle}&area=${area}&sTime=${sTime && moment(sTime).format('YYYY-MM-DD 00:00:00')}&eTime=${eTime && moment(eTime).format('YYYY-MM-DD 23:59:59')}&type=${type}`);
                }).catch(() => {});
            },
        },
        components: {
            'tw-unit':TWUnit
        }
    }
</script>

<style scoped>

</style>