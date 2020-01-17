<!--车辆流向位置分析-->
<template>
    <div class="tw-template-wrapper">
        <div id="map" style="height: 100%;width: 100%;"></div>
        <div class="tw-map-query-panel">
            <template v-if="mapPanel.display">
                <div class="tw-map-query-header">
                    <tw-icon class="tw-map-query-close" icon="icon-shut-down" @click.native="handleMapPanelDisplay"></tw-icon>
                </div>
                <el-form :inline="true" :model="query" size="small" class="tw-map-query-bar">
                    <el-form-item>
                        <el-date-picker class="tw-map-query-item" v-model="query.stime" type="date" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item >
                        <el-date-picker class="tw-map-query-item" v-model="query.etime" type="date" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item >
                        <!--<span style="color: #909399">前</span>-->
                        <el-input class="tw-map-query-item" style="width: 100px" v-model="query.number" type="text" placeholder="前几名" @input="handleInput"></el-input>
                        <!--<span style="color: #909399">名</span>-->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="handleQueryClick">查询</el-button>
                        <el-button type="primary" size="mini" @click="handleExportClick">导出</el-button>
                    </el-form-item>
                </el-form>
                <div class="tw-query-panel">
                    <el-table :data="table.data" v-loading="table.loading" border size="small" height="350px" style="width: 100%; margin-bottom: 10px;height: 350px" @current-change="handleCurrentChange">
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="AREA_NAME" label="热点区域" min-width="140"></el-table-column>
                        <el-table-column prop="AREA_COUNT" label="车辆数" width="140"></el-table-column>
                    </el-table>
                    <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
                </div>
            </template>
            <tw-icon v-else class="tw-map-query-show" icon="icon-search" @click.native="handleMapPanelDisplay"></tw-icon>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import moment from 'moment'
    import TWUnit from '../../components/TWTableColumn/TWUnit'
    import TWIcon from '../../components/TWIcon'
    import {AMapManager} from 'vue-amap'
    import {formatCustomizeDate, formatDate} from '../../assets/js/util'

    export default {
        name: "VehicleFlowPosition",
        data() {
            return {
                query: {
                    stime: '',
                    etime: '',
                    number:10,
                },
                table: {
                    loading: false,
                    data: [],
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                map:null,
                infoWindow: new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)}),
                mapPanel: {
                    display: true
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.query.stime = formatCustomizeDate(moment(), 'YYYY-MM-DD');
                this.query.etime = formatCustomizeDate(moment(), 'YYYY-MM-DD');
                this.getVehicleFlowPosition();
                this.map = new AMap.Map('map', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:11 //初始化地图层级
                });
            });
        },
        computed: {
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
            getVehicleFlowPosition(){
                this.table.loading = true;
                const {stime,etime,number} = this.query;
                const {currentPage,pageSize} = this.table;
                axios.get('industryOperation/getVehicleFlowPosition', {
                    baseURL: this.baseURL,
                    params: {
                        stime: stime && moment(stime).format('YYYY-MM-DD'),
                        etime: etime && moment(etime).format('YYYY-MM-DD'),
                        number,
                        currentPage:currentPage,
                        pageSize:pageSize
                    }
                }).then(res => {
                    this.table.data = res.data.datas || [];
                    this.table.total = res.data.count;
                    for(let i=0;i<res.data.datas.length;i++){
                        this.addPolygon1(res.data.datas[i].AREA_COORDINATES,res.data.datas[i].AREA_NAME,res.data.datas[i].AREA_COUNT);
                    }
                    this.table.loading = false;
                })
            },
            addPolygon1(obj,name,count){
                let polygonArr=[];//多边形覆盖物节点坐标数组
                let zbs = obj.split(";");
                for(let i=0;i<zbs.length;i++){
                    let zb = zbs[i].split(",");
                    polygonArr.push(new AMap.LngLat(zb[0],zb[1]));
                }
                let polygon=new AMap.Polygon({
                    path:polygonArr,//设置多边形边界路径
                    strokeColor:"#ee2200", //线颜色
                    // strokeOpacity:0.2, //线透明度
                    strokeWeight:0,    //线宽
                    fillColor: "#ee2200", //填充色
                    fillOpacity: 0.1//填充透明度
                });
                polygon.setMap(this.map);

                polygon.on('mouseover',() =>{
                    let info = [];
                    info.push("<p>区域名称 :"+name+"</p>");
                    info.push("<p>车辆数 :"+count+"</p>");
                    this.infoWindow = new AMap.InfoWindow({
                        content: info.join("</br>") //使用默认信息窗体框样式，显示信息内容
                    });
                    this.infoWindow.open(this.map, [zbs[0].split(",")[0], zbs[0].split(",")[1]]);//展示窗体(窗体位置)
                });
                polygon.on('mouseout', () => {
                    this.infoWindow.close();
                });
            },
            /*事件*/
            handleCurrentChange(row){
                if(row != null){
                    this.currentRow = row;
                    let obj = row.AREA_COORDINATES;
                    let zbs = obj.split(";");
                    this.map.panTo([zbs[0].split(",")[0],zbs[0].split(",")[1]]);
                    let info = [];
                    info.push("<p>区域名称 :"+row.AREA_NAME+"</p>");
                    info.push("<p>车辆数 :"+row.AREA_COUNT+"</p>");
                    this.infoWindow = new AMap.InfoWindow({
                        content: info.join("</br>") //使用默认信息窗体框样式，显示信息内容
                    });
                    this.infoWindow.open(this.map, [zbs[0].split(",")[0], zbs[0].split(",")[1]]);//展示窗体(窗体位置)

                }
            },
            handleMapPanelDisplay() {
                this.mapPanel.display = !this.mapPanel.display;
            },
            handleQueryClick() {
                this.table.currentPage=1;
                this.getVehicleFlowPosition();
            },
            handleExportClick(){
                const {stime,etime,number} = this.query;
                this.$confirm('是否需要导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    window.open(`${this.baseURL}industryOperation/getVehicleFlowPositionExcel?stime=${stime && moment(stime).format('YYYY-MM-DD')}&etime=${etime && moment(etime).format('YYYY-MM-DD')}&number=${number}`);
                }).catch(() => {

                });
            },
            handleTablePageCurrentChange(index) {
                this.table.currentPage = index;
                this.map.clearMap();
                this.getVehicleFlowPosition();
            },
            handleInput(){
                this.query.number=this.query.number.replace(/[^\d]/g,'');
            }
        },
        components: {
            'tw-unit': TWUnit,
            'tw-icon': TWIcon
        }
    }
</script>

<style lang="scss" scoped>
    .tw-map {
        &-query {
            &-panel {
                position: absolute;
                top: 30px;
                left: 20px;
                max-height: calc(100% - 160px);
                border: 1px solid #eeeeee;
                border-radius: 4px;
                box-shadow: 2px 2px 4px #aaaaaa;
                background-color: #ffffff;
                .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
                    margin-bottom: 0;
                }
            }
            &-close {
                position: absolute;
                top: 15px;
                right: 5px;
                padding: 5px;
                transform: translateY(-50%);
                cursor: pointer;
                &:hover {
                    color: #e81123;
                }
            }
            &-show {
                padding: 10px;
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }
            &-bar {
                position: static;
                width: 400px;
                padding-top: 30px;
                border: none;
                box-shadow: none;
            }
            &-item {
                width: 130px;
            }
        }
    }
</style>