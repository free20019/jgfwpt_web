<!--重点区域车辆数量月报表-->
<template>
    <div class="tw-template-wrapper">
        <div class="tw-template-body">
            <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
                <el-form-item>
                    <tree-select class="tw-tree-select tw-line" v-model="query.area" :multiple="true" :options="areaNameOption" placeholder="区域"/>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="query.time" type="month" placeholder="日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQueryClick">查询</el-button>
                    <el-button type="primary" @click="handleExportClick">导出</el-button>
                </el-form-item>
            </el-form>
            <div class="tw-query-panel">
                <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                    <el-table-column type="index" label="序号" align="center" width="60" fixed></el-table-column>
                    <el-table-column prop="AREA_NAME" label="场站(统计)" align="center" min-width="200" fixed></el-table-column>
                    <el-table-column v-if="index<table.arr.length-1" v-for="(item,index) in table.arr" :prop="'D'+(index+1)" :label=item align="center" width="100"></el-table-column>
                </el-table>
                <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
            </div>
        </div>
        <div class="tw-template-right">
            <v-chart class="vehicleChart" v-loading="table.loading" :options="vehicleChartOptions" ref="vehicleChart"/>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import TreeSelect from '@riophae/vue-treeselect'
    import {mapGetters} from 'vuex'
    import {formatMonth} from '../../assets/js/util'

    export default {
        name: "KeyAreasVehicleQuantityMonthlyReport",
        data() {
            return {
                query: {
                    area: [],
                    time: '',
                },
                table: {
                    loading: false,
                    data: [],
                    pageSize: 500,
                    currentPage: 1,
                    total: 0,
                    arr: []
                },
                vehicleChartOptions: {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'shadow'
                        // },
                    },
                    legend: {
                        top: 20,
                        data:['总计','上月']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        top: '70px',
                        left: '50px',
                        right: '80px',
                        bottom: '60px'
                    },
                    xAxis : [
                        {
                            axisTick: {
                                alignWithLabel: true
                            },
                            type : 'category',
                            name : '时间',
                            data : ['2019-09-01','2019-09-02']
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 0.1]
                        }
                    ],
                    series: [
                        {
                            name: '总计',
                            type:'line',
                            data:['33','44']
                        },
                        {
                            name: '上月',
                            type:'line',
                            data:['31','59']
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.time = formatMonth(moment());
                this.getKeyAreasVehicleQuantityMonthlyReport();
                window.onresize = () => {
                    this.$refs.vehicleChart.resize();
                }
            });
        },
        computed: {
            ...mapGetters(['getKeyArea']),
            areaNameOption() {
                return this.getKeyArea;
            },
            filterTableList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage -1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
           /* 获取一个月的天数*/
            getDays(){
                this.query.time = this.query.time && formatMonth(this.query.time);
                this.table.arr = [];
                let number = moment(this.query.time, "YYYY-MM").daysInMonth();
                for (let i = 1; i <= number; i++) {
                    if(i<10){
                        this.table.arr.push(this.query.time+'-0'+i);
                    }else{
                        this.table.arr.push(this.query.time+'-'+i);
                    }
                }
            },
            /*数据接口*/
            getKeyAreasVehicleQuantityMonthlyReport(){
                const {area, time} = this.query;
                if(!time) return this.$message.error('请选择时间！');
                this.table.loading = true;
                this.getDays();
                axios.get('keyArea/getKeyAreasVehicleQuantityMonthlyReport', {
                    baseURL: this.baseURL,
                    params: {
                        area:area.toString(),
                        time: time && formatMonth(time),
                    }
                }).then(res => {
                    this.table.data = res.data.area.concat(res.data.total);

                    this.vehicleChartOptions.legend.data=[];
                    this.vehicleChartOptions.series=[];
                    this.vehicleChartOptions.xAxis[0].data=this.table.arr;
                    _.map(res.data.total,(item)=>{
                        let a=[];
                        for (let key in item) {
                            (/^D[1-9][0-9]?$/.test(key))?a.push(item[key]):item[key];
                        }
                        this.vehicleChartOptions.series.push({type:'line',data:a,name:item.AREA_NAME});
                        this.vehicleChartOptions.legend.data.push(item.AREA_NAME);
                    });
                    this.table.total = this.table.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.getKeyAreasVehicleQuantityMonthlyReport();
            },
            handleExportClick() {
                const {area,time} = this.query;
                if(!time) return this.$message.error('请选择时间！');
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}keyArea/getKeyAreasVehicleQuantityMonthlyReportExcel?area=${area}&time=${time&&formatMonth(time)}`);
                }).catch(() => {});
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
            }
        },
        components: {
            'tree-select': TreeSelect
        }
    }
</script>

<style lang="scss" scoped>
    .tw-template {
        &-wrapper {
            overflow: hidden;
        }

        &-body {
            width: calc(100% - 200px);
        }

        &-right {
            right: -600px;
            width: 800px;
            background-color: #ffffff;
            transition: box-shadow .5s ease, right .5s ease .2s;
            z-index: 10;

            &:hover {
                right: 0;
                box-shadow: -2px 0 6px #aaaaaa;
            }
        }
    }
    .tw-query {
        &-panel {
            height: calc(100% - 54px);
        }
    }
    .vehicleChart {
        width: 100%;
        height: 100%;
    }
</style>