<!--数据质量月报-->
<template>
    <div class="tw-template-wrapper">
        <div class="tw-template-body">
            <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
                <el-form-item>
                    <el-date-picker v-model="query.time" type="month" placeholder="日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="query.area" placeholder="区域">
                        <el-option v-for="item in getRegionReal" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQueryClick">查询</el-button>
                    <el-button type="primary" @click="handleExportClick">导出</el-button>
                </el-form-item>
            </el-form>
            <div class="tw-query-panel">
                <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                    <el-table-column prop="DAY" label="时间/总计" width="300" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="WZ_PERCENT" label="完整性百分比" width="300"></el-table-column>
                    <el-table-column prop="CX_PERCENT" label="连续性百分比" width="300"></el-table-column>
                    <el-table-column prop="ZQ_PERCENT" label="正确性百分比" min-width="300"></el-table-column>
                </el-table>
                <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
            </div>
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
        name: "MonthlyDataQualityReport",
        data() {
            return {
                query: {
                    time: '',
                    area:'主城区',
                },
                table: {
                    loading: false,
                    data: [],
                    pageSize: 500,
                    currentPage: 1,
                    total: 0,
                },
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.time = moment(moment().format('YYYY-MM'));
                this.getMonthlyDataQualityReport();
            });
        },
        computed: {
            ...mapGetters(['getRegionReal']),
            filterTableList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage -1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            }
        },
        methods: {
            /*数据接口*/
            getMonthlyDataQualityReport(){
                const {time,area} = this.query;
                if(!time) return this.$message.error('请选择时间！');
                this.table.loading = true;
                axios.get('keyArea/getMonthlyDataQualityReport', {
                    baseURL: this.baseURL,
                    params: {
                        time: time && formatMonth(time),
                        area,
                    }
                }).then(res => {
                    this.table.data = res.data;
                    this.table.total = this.table.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            /*事件*/
            handleQueryClick() {
                this.getMonthlyDataQualityReport();
            },
            handleExportClick() {
                const {time,area} = this.query;
                if(!time) return this.$message.error('请选择时间！');
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}keyArea/getMonthlyDataQualityReportExcel?time=${time&&formatMonth(time)}&area=${area}`);
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