<!--营运单次异常分析-->
<template>
    <div class="tw-template-wrapper">
        <div class="tw-template-body">
            <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
                <el-form-item>
                    <el-date-picker v-model="query.time" type="date" placeholder="日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="query.low" placeholder="最低单次" @input="handleInput" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="query.high" placeholder="最高单次" @input="handleInput"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="query.area" placeholder="区域">
                        <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQueryClick">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="tw-query-panel">
                <el-table :data="table.data" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="TI" label="区间" min-width="180"></el-table-column>
                    <el-table-column prop="COUNT" label="数量" width="180"></el-table-column>
                    <el-table-column :resizable="false" width="200" align="center" title="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    icon="el-icon-search"
                                    type="text"
                                    @click="handleItemDetails(scope.row)"
                            ></el-button>
                            <el-button
                                    size="mini"
                                    icon="el-icon-download"
                                    type="text"
                                    @click="handleExportClick(scope.row)"
                            ></el-button>
                            <!--<el-button size="mini" type="primary" @click="handleItemDetails(scope.row)">详情</el-button>-->
                            <!--<el-button size="mini" type="primary" @click="handleExportClick(scope.row)">导出</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
                <div style="color: blue;" align="center">
                    <span>{{dialog.title}}</span>
                </div>
                <!--<el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>-->
            </div>
        </div>
        <div class="tw-template-right">
            <v-chart class="vehicleChart" v-loading="table.loading" :options="vehicleChartOptions" ref="vehicleChart"/>
        </div>
        <div class="tw-template-footer" v-if="dialog.display">
            <el-table :data="filterList" v-loading="dialog.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="CPHM" label="车牌" min-width="120"></el-table-column>
                <el-table-column prop="AREA_NAME" label="区域" min-width="120"></el-table-column>
                <el-table-column prop="C" label="单次" width="120"></el-table-column>
                <el-table-column prop="DAY" label="日期" width="120"></el-table-column>
                <el-table-column prop="ZGS" label="总公司" width="240"></el-table-column>
                <el-table-column prop="FGS" label="分公司" width="240"></el-table-column>
            </el-table>
            <el-pagination background :page-size="dialog.pageSize" :current-page="dialog.currentPage" :total="dialog.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import TreeSelect from '@riophae/vue-treeselect'
    import {mapGetters} from "vuex";

    export default {
        name: "SingleOperationAnomalyAnalysis",
        data() {
            return {
                query: {
                    time: '',
                    low: '5',
                    high: '10',
                    area:'主城区',
                    selectArea:'主城区'
                },
                table: {
                    loading: false,
                    data: [],
                },
                dialog: {
                    title: '',
                    display: false,
                    loading: false,
                    data: [],
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
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
                        data:['数量']
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
                            name: '数量',
                            type:'line',
                            data:['33','44']
                        },
                    ]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.time = moment(moment().format('YYYY-MM-DD'));
                this.getSingleOperationAnomalyAnalysis();
                window.onresize = () => {
                    this.$refs.vehicleChart.resize();
                }
            });
        },
        computed: {
            ...mapGetters(['getRegionReal']),
            filterList() {
                const {data, pageSize, currentPage} = this.dialog;
                const pageIndex = currentPage - 1;
                return _.filter(data, (item, index) => {
                    return index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
            /*接口*/
            getSingleOperationAnomalyAnalysis() {
                const {time, low, high,area} = this.query;
                if(low===''||high==='') return this.$message.error("请输入最低单次或最高单次！！");
                if(parseInt(low)>parseInt(high)) return this.$message.error("最低单次不能大于最高单次！！");
                this.table.loading = true;
                this.dialog.display = false;
                this.dialog.title='';
                axios.get('keyArea/getSingleOperationAnomalyAnalysis', {
                    baseURL: this.baseURL,
                    params: {
                        time: time && moment(time).format('YYYY-MM-DD'),
                        low,
                        high,
                        area
                    }
                }).then(res => {
                    this.table.data = res.data||[];
                    this.query.selectArea=area;
                    this.vehicleChartOptions.xAxis[0].data=[];
                    this.vehicleChartOptions.series[0].data=[];
                    _.map(this.table.data,(item)=>{
                        this.vehicleChartOptions.xAxis[0].data.push(item.TI);
                        this.vehicleChartOptions.series[0].data.push(item.COUNT);
                    });
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getSingleOperationAnomalyAnalysisDetails(item){
                this.dialog.display = true;
                this.dialog.loading=true;
                axios.get('keyArea/getSingleOperationAnomalyAnalysisDetails', {
                    baseURL: this.baseURL,
                    params: {
                        time: item.TIME,
                        low: item.TI.replace("以上","").split("-")[0],
                        high: item.TI.replace("以上","").split("-").length>1?item.TI.replace("以上","").split("-")[1]:'',
                        area: this.query.selectArea,
                    }
                }).then(res => {
                    this.dialog.title=item.TI;
                    this.dialog.data = res.data||[];
                    this.dialog.total = this.dialog.data.length;
                    this.dialog.currentPage = 1;
                    this.dialog.loading = false;

                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.getSingleOperationAnomalyAnalysis();
            },
            handleExportClick(item) {
                let arr=item.TI.replace("以上","").split("-");
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}keyArea/getSingleOperationAnomalyAnalysisDetailsExcel?time=${item.TIME}&low=${arr[0]}&high=${arr.length>1?arr[1]:''}&area=${this.query.selectArea}`);
                }).catch(() => {
                });
            },
            handleTablePageCurrentChange(index) {
                this.dialog.currentPage = index;
            },
            handleItemDetails(item){
                this.getSingleOperationAnomalyAnalysisDetails(item);
            },
            handleInput(){
                this.query.low=this.query.low.replace(/[^\d]/g,'');
                this.query.high=this.query.high.replace(/[^\d]/g,'');
            }
        },
        components: {
            'tree-select': TreeSelect
        }
    }
</script>

<style lang="scss" scoped>
    .tw-template {
        $footerHeader: 300px;
        $leftWidth: 300px;
        &-wrapper {
            overflow: hidden;
        }

        &-right {
            right: -200px;
            width: 400px;
            background-color: #ffffff;
            transition: box-shadow .5s ease, right .5s ease .2s;
            z-index: 10;

            &:hover {
                right: 0;
                box-shadow: -2px 0 6px #aaaaaa;
            }
        }
        &-left{
            width: $leftWidth;
            height: 100%;
        }

        &-body{
            width: calc(100% - 200px);
            height: $footerHeader;
            border-bottom: 1px solid #eeeeee;
        }
        &-footer{
            width: calc(100% - 200px);
            height: calc(100% - #{$footerHeader} - 1px);
            border-bottom: 1px solid #eeeeee;
        }
    }

    .vehicleChart {
        width: 100%;
        height: 100%;
    }
</style>