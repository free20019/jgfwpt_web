<!--年出租车保有量分析-->
<template>
    <div class="tw-template-wrapper">
        <div class="tw-template-body">
            <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
                <el-form-item>
                    <el-autocomplete class="inline-input" v-model="query.companyName" placeholder="公司名称"
                                     :fetch-suggestions="queryCompanyNameSearch" :trigger-on-focus="false"></el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQueryClick">查询</el-button>
                    <el-button type="primary" @click="handleExportClick">导出</el-button>
                </el-form-item>
            </el-form>
            <!--<div class="tw-query-panel">-->
                <v-chart class="vehicleChart" v-loading="table.loading" :options="vehicleChartOptions" ref="vehicleChart" style="width: 70%;height: 80%;padding-left: 150px;padding-top: 50px"/>
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import ECharts from 'vue-echarts'
    import Malfunction from '../../components/TableColumn/Malfunction.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: "AnnualTaxiOwnershipAnalysis",
        data() {
            return {
                query: {
                    companyName: '',
                },
                table: {
                    loading: false
                },
                vehicleChartOptions: {
                    title: {
                        text: '杭州出租保有量统计',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function (params) {
                            return params[0].name + '<br/>'
                                + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                                + params[1].seriesName + ' : ' + (params[1].value + params[0].value);
                        }
                    },
                    color:['#4472C5','#4472C5'],
                    legend: {
                        selectedMode: false,
                        data: ['当前车辆', '新增车辆']
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
                    calculable: true,
                    xAxis: {
                        // axisTick: {
                        //     alignWithLabel: true
                        // },
                        type: 'category',
                        data: []
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 0.1]
                        }
                    ],
                    series: [
                        {
                            name: '当前车辆',
                            type: 'bar',
                            stack: 'sum',
                            barCategoryGap: '50%',
                            itemStyle: {
                                normal: {
                                    color: 'tomato',
                                    barBorderColor: 'tomato',
                                    barBorderWidth: 6,
                                    barBorderRadius: 0,
                                    label: {
                                        show: true, position: 'insideTop'
                                    }
                                }
                            },
                            data: []
                        },
                        {
                            name: '新增车辆',
                            type: 'bar',
                            stack: 'sum',
                            itemStyle: {
                                normal: {
                                    color: 'orange',
                                    barBorderColor: 'tomato',
                                    barBorderWidth: 6,
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: 'tomato'
                                        }
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getAnnualTaxiOwnershipAnalysis();
                window.onresize = () => {
                    this.$refs.vehicleChart.resize();
                }
            });
        },
        computed: {
            ...mapGetters(['getCompanyName']),
        },
        methods: {
            /*接口*/
            queryCompanyNameSearch(query, cb) {
                cb(_.filter(this.getCompanyName, item => item.label.indexOf(query) > -1));
            },
            getAnnualTaxiOwnershipAnalysis() {
                const {companyName} = this.query;
                this.table.loading = true;
                axios.get('terminal/getAnnualTaxiOwnershipAnalysis', {
                    baseURL: this.baseURL,
                    params: {
                        companyName,
                    }
                }).then(res => {
                    // let echart = res.data.echart;
                    // this.vehicleChartOptions.series[0].data = [
                    //     {name: '已维修', value: _.pluck(echart, 'WXZS')[0]},
                    //     {name: '故障', value: _.pluck(echart, 'GZZS')[0]},
                    //     {name: '完好', value: (_.pluck(echart, 'ZS')[0] - _.pluck(echart, 'GZZS')[0]- _.pluck(echart, 'WXZS')[0])}
                    // ];
                    // this.table.data = _.map(res.data.list, item => {
                    //     return {gsmc: item.COMP_NAME, gzcls: item.GZZS, gzl: item.GZL, ywxcls: item.WXZS, xcl: item.XCL}
                    // });
                    this.vehicleChartOptions.xAxis.data=[];
                    this.vehicleChartOptions.series[0].data=[];
                    this.vehicleChartOptions.series[1].data=[];
                    _.map(res.data, item => {
                        this.vehicleChartOptions.xAxis.data.push(item.VEHI_DATE);
                        this.vehicleChartOptions.series[0].data.push(item.C1);
                        this.vehicleChartOptions.series[1].data.push(item.C);
                    });
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.getAnnualTaxiOwnershipAnalysis();
                this.vehicleChartOptions.series[0].data = [
                    {name: '已维修', value: 2530},
                    {name: '故障', value: 2323},
                    {name: '完好', value: 2393}
                ]
            },
            handleExportClick() {
                const {companyName} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}terminal/getAnnualTaxiOwnershipAnalysisExcel?companyName=${companyName}`);
                }).catch(() => {
                });
            },
        },
        components: {
            Malfunction,
            'v-chart': ECharts
        }
    }
</script>