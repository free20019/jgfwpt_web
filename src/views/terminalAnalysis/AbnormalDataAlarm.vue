<!--异常数据报警-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-autocomplete class="inline-input" v-model="query.vehicle" placeholder="车牌号码"
                                 :fetch-suggestions="queryVehicleSearch" :trigger-on-focus="false"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.driver" placeholder="驾驶员"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.type" placeholder="类型">
                    <el-option v-for="item in select.type " :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.area" placeholder="区域">
                    <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker arrow-control type="month" v-model="query.time" placeholder="月份"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60" :resizable="false"></el-table-column>
                <el-table-column prop="PLATE_NUMBER" label="运政车牌号" width="140"></el-table-column>
                <el-table-column prop="NAME" label="运政驾驶员" width="140"></el-table-column>
                <!--<el-table-column prop="CERTIFICATE_NUMBER" label="运政资格证号" width="240"></el-table-column>-->
                <el-table-column prop="OPERATION_VEHICLENO" label="实际车牌号" width="140"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域" width="140"></el-table-column>
                <el-table-column prop="ACTUAL_NAME" label="实际驾驶员" width="140"></el-table-column>
                <el-table-column prop="STATUS" label="状态" width="140"></el-table-column>
                <el-table-column prop="JJQ_TIME" label="计价器上传日期" min-width="240"></el-table-column>
                <!--<el-table-column prop="CERTIFICATE" label="实际资格证号" min-width="240"></el-table-column>-->
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next,total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import {formatCustomizeDate, formatDateTime} from "../../assets/js/util";
    import TWUnit from "../../components/TWTableColumn/TWUnit";

    export default {
        name: "AbnormalDataAlarm",
        data() {
            return {
                query:{
                    time: '',
                    vehicle: '',
                    driver:'',
                    type: '0',
                    area:'主城区',
                },
                select: {
                  type: [
                      {label: '正常数据', value: '1'},
                      {label: '异常数据', value: '0'},
                  ]
                },
                table: {
                    loading: false,
                    data: [],
                    pageSize: 20,
                    currentPage: 1,
                    total: 0
                },
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.time = formatCustomizeDate(moment(), 'YYYY-MM');
                this.getAbnormalDataAlarm();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber', 'getCompanyName','getRegionReal']),
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
            getAbnormalDataAlarm(){
                this.table.loading = true;
                const {vehicle, driver, type, area,time} = this.query;
                const {currentPage,pageSize} = this.table;
                axios.get('terminal/AbnormalDataAlarm', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        driver,
                        type,
                        area,
                        time: time&&moment(time).format('YYYY-MM'),
                        currentPage,
                        pageSize
                    }
                }).then(res => {
                    console.log(res.data.datas);
                    this.table.data = res.data.datas;
                    this.table.total = res.data.count;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.table.currentPage = 1;
                this.getAbnormalDataAlarm();
            },
            handleExportClick() {
                const {vehicle, driver, type, area,time} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}terminal/AbnormalDataAlarmExcel?vehicle=${vehicle}&driver=${driver}&type=${type}&area=${area}&time=${time&&moment(time).format('YYYY-MM')}`);
                }).catch(() => {});
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                this.getAbnormalDataAlarm();
            }
        },
        components: {
            'tw-unit': TWUnit
        }
    }
</script>

<style scoped>

</style>