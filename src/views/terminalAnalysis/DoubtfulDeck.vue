<!--疑似套牌-->
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
                <el-select v-model="query.area" placeholder="区域">
                    <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="query.point" placeholder="采集点" filterable >
                    <el-option v-for="item in select.pointList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.stime" type="datetime" placeholder="开始日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="query.etime" type="datetime" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQueryClick">查询</el-button>
                <el-button type="primary" @click="handleExportClick">导出</el-button>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60" :resizable="false"></el-table-column>
                <el-table-column prop="VEHICLE_NO" label="车牌号" width="100"></el-table-column>
                <el-table-column prop="COMPANY_NAME" label="所属公司" width="250"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域" width="140"></el-table-column>
                <el-table-column prop="HK_TIME" label="抓拍时间" width="160"></el-table-column>
                <el-table-column prop="HK_ADDRESS" label="抓拍地点" width="140"></el-table-column>
                <el-table-column prop="ZX_POINT" label="抓拍经纬度" width="180"></el-table-column>
                <el-table-column prop="SPEED_TIME" label="定位时间" width="160"></el-table-column>
                <el-table-column prop="GPS_ADDRESS" label="定位地点" width="250"></el-table-column>
                <el-table-column prop="GPS_POINT" label="定位经纬度" min-width="180"></el-table-column>
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
    import {formatCustomizeDate} from "../../assets/js/util";
    import TWUnit from "../../components/TWTableColumn/TWUnit";

    export default {
        name: "DoubtfulDeck",
        data() {
            return {
                query:{
                    vehicle: '',
                    companyName: '',
                    area:'主城区',
                    point:'',
                    stime: '',
                    etime: ''
                },
                select: {
                  typeList: [],
                  pointList: [],
                },
                companyList: [],
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
                this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD 00:00:00');
                this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD 23:59:59');
                this.getCollectPoint();
                this.getDoubtfulDeck();
            });
        },
        computed: {
            ...mapGetters(['getLPNumber','getCompanyName','getRegionReal']),
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
            getCollectPoint(){
                axios.get('common/getIllegalTypeOrPoint', {
                    baseURL: this.baseURL,
                    params: {
                        field: 'HK_ADDRESS',
                        table: 'TB_TAXI_TPC@db69',
                    }
                }).then(res => {
                    this.select.pointList = _.map(res.data, item => {
                        return {value: item.HK_ADDRESS, label: item.HK_ADDRESS}
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getDoubtfulDeck(){
                this.table.loading = true;
                const {vehicle, companyName, area, point,stime,etime} = this.query;
                const {currentPage,pageSize} = this.table;
                axios.get('keyArea/getDoubtfulDeck', {
                    baseURL: this.baseURL,
                    params: {
                        vehicle,
                        companyName,
                        area,
                        point,
                        stime: stime && moment(stime).format('YYYY-MM-DD HH:mm:ss'),
                        etime: etime && moment(etime).format('YYYY-MM-DD HH:mm:ss'),
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
                this.getDoubtfulDeck();
            },
            handleExportClick() {
                const {vehicle,companyName, area, point,stime,etime} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}keyArea/getDoubtfulDeckExcel?vehicle=${vehicle}&companyName=${companyName}&area=${area}&point=${point}&stime=${stime && moment(stime).format('YYYY-MM-DD HH:mm:ss')}&etime=${etime && moment(etime).format('YYYY-MM-DD HH:mm:ss')}`);
                }).catch(() => {});
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                this.getDoubtfulDeck();
            }
        },
        components: {
            'tw-unit': TWUnit
        }
    }
</script>

<style scoped>

</style>