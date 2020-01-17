<!-- 异常处置过程添加处理 -->
<template>
  <div class="tw-template-wrapper">
    <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
      <el-form-item>
        <el-input class="inline-input" v-model="query.title" placeholder="主题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
        <el-button type="primary" @click="handleAddClick">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel">
      <el-table class="tw-table" :data="filterTableList" v-loading="table.loading" @row-click="handleTableRowClick" border size="small" height="calc(100% - 42px)">
        <el-table-column type="index" label="序号" width="60" align="center" :resizable="false"></el-table-column>
        <el-table-column prop="TIME" label="时间" width="140" align="center"></el-table-column>
        <el-table-column prop="SJZT" label="主题" min-width="180" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="BJR" label="报警人" width="100" align="center"></el-table-column>
        <el-table-column prop="DJDH" label="报警人电话" width="140" align="center"></el-table-column>
        <el-table-column prop="JJR" label="接警人" width="100" align="center"></el-table-column>
        <el-table-column prop="SJJB" label="事件级别" width="100" align="center"></el-table-column>
        <el-table-column prop="SH" label="状态" width="100" align="center"></el-table-column>
        <el-table-column prop="DB_TIME" label="操作" width="130" align="center">
          <template v-slot="scope">
            <el-button
              type="text"
              icon="el-icon-check"
              size="small"
              @click="handleDetailClick(scope.row)"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="small"
              @click="handleEditClick(scope.row)"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              @click="handleDeleteClick(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="tw-pagination"
        background
        :page-size="table.pageSize"
        :current-page="table.currentPage"
        :total="table.data.length"
        layout="prev, pager, next,total"
        @current-change="handleTablePageCurrentChange"
      ></el-pagination>
    </div>
    <div class="tw-panel tw-panel-layout">
      <div class="tw-panel tw-panel__left">
        <div class="tw-panel__title">报警内容</div>
        <div class="tw-panel__body">{{table.selectTableItem.SJJL}}</div>
      </div>
      <div class="tw-panel__right">
        <div class="tw-map" id="gaodeMap" v-loading="map.loading"></div>
      </div>
    </div>
    <el-dialog
      class="tw-dialog"
      :title="dialog.title"
      :visible.sync="dialog.display"
      width="900px"
      @closed="handleDialogClosed"
    >
      <div class="tw-panel tw-panel-layout">
        <div class="tw-panel tw-panel__left">
          <el-form :model="dialog.form" size="small" label-width="100px">
            <el-form-item label="事件编号">
              <el-input class="inline-input" v-model="dialog.form.sjbh" placeholder="事件编号"></el-input>
            </el-form-item>
            <el-form-item label="事件主题">
              <el-input class="inline-input" v-model="dialog.form.sjzt" placeholder="事件主题"></el-input>
            </el-form-item>
            <el-form-item label="发生地址">
              <el-input class="inline-input" v-model="dialog.form.fsdz" placeholder="点击地图自动获取" disabled></el-input>
            </el-form-item>
            <el-form-item label="经纬度">
              <el-input class="inline-input" v-model="dialog.form.jwdxx" placeholder="经纬度" disabled></el-input>
            </el-form-item>
            <el-form-item label="报警人">
              <el-input class="inline-input" v-model="dialog.form.bjr" placeholder="报警人"></el-input>
            </el-form-item>
            <el-form-item label="报警人电话">
              <el-input class="inline-input" v-model="dialog.form.bjdh" placeholder="报警人电话"></el-input>
            </el-form-item>
            <el-form-item label="接警人">
              <el-input class="inline-input" v-model="dialog.form.jjr" placeholder="接警人"></el-input>
            </el-form-item>
            <el-form-item label="事件级别">
              <el-select class="inline-input" v-model="dialog.form.sjjb" placeholder="事件级别">
                <el-option value="一级" label="一级"></el-option>
                <el-option value="二级" label="二级"></el-option>
                <el-option value="三级" label="三级"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接警方式">
              <el-select class="inline-input" v-model="dialog.form.bjfs" placeholder="接警方式">
                <el-option value="电话报警" label="电话报警"></el-option>
                <el-option value="短信报警" label="短信报警"></el-option>
                <el-option value="110联动" label="110联动"></el-option>
                <el-option value="12328转入" label="12328转入"></el-option>
                <el-option value="12345转入" label="12345转入"></el-option>
                <el-option value="领导指定" label="领导指定"></el-option>
                <el-option value="相关部门指定" label="相关部门指定"></el-option>
                <el-option value="系统预警" label="系统预警"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报警内容">
              <el-input class="inline-input" type="textarea" v-model="dialog.form.bjnr" placeholder="报警内容"></el-input>
            </el-form-item>
            <el-form-item label="事件记录">
              <el-input class="inline-input" type="textarea" v-model="dialog.form.sjjl" placeholder="事件记录"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tw-map" id="gaodeMap_dialog"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.display = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSaveClick">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import _ from 'underscore'
  import axios from 'axios'

export default {
  name: 'AbnormalDisposalProcess',
  data() {
    return {
      query: {
        title: ''
      },
      table: {
        selectItem: {},
        selectTableItem: {},
        loading: false,
        data: [],
        pageSize: 10,
        currentPage: 1
      },
      map: {
        amap: null,
        amap2: null,
        loading: false,
        center: [120.170076, 30.277559],
        mapMarker:null,
        mapMarker2:null,
        geocoder:null,
      },
      dialog: {
        title:'',
        display: false,
        form:{
          sjbh :'',
          sjzt :'',
          fsdz :'',
          jwdxx :'',
          bjr :'',
          bjdh :'',
          jjr :'',
          sjjb :'',
          bjfs :'',
          bjnr :'',
          sjjl :'',
        },
      }
    }
  },
  mounted() {
    this.findAbnormalDisposalProcess();
    this.$nextTick(() => {
      setTimeout(() => {
        this.initMap()
      }, 300)
    })
  },
  computed: {
    filterTableList() {
      const {data, pageSize, currentPage} = this.table;
      const pageIndex = currentPage - 1;
      return _.filter(data, (item, index) => {
        return  index >= pageIndex * pageSize && index < currentPage * pageSize;
      })
    }
  },
  methods: {
    findAbnormalDisposalProcess(){
      const {title}=this.query;
      this.table.loading = true;
      if(this.map.mapMarker!=null){
        this.map.mapMarker.setMap(null);
      }
      this.table.selectTableItem={};
      axios.get('keyArea/findAbnormalDisposalProcess', {
        baseURL: this.baseURL,
        params: {
          sjzt:title
        }
      }).then(res => {
        this.table.data = res.data||[];
        this.table.total = this.table.data.length;
        this.table.currentPage = 1;
        this.table.loading = false;
      }).catch(function (error) {
        console.log(error);
      });
    },
    addAbnormalDisposalProcess(){
      const {sjbh, sjzt, fsdz, jwdxx, bjr, bjdh, jjr, sjjb, bjfs, bjnr, sjjl} = this.dialog.form;
      if(sjbh===''||sjzt===''||fsdz===''||jwdxx===''||bjr===''||bjdh===''||jjr===''||sjjb===''||bjfs===''||bjnr===''||sjjl===''){
        this.$message.error('请填写完整信息！');
        return false;
      }
      let params = new URLSearchParams();
      params.append('sjbh', sjbh);
      params.append('sjzt', sjzt);
      params.append('fsdz', fsdz);
      params.append('jwdxx', jwdxx);
      params.append('bjr', bjr);
      params.append('bjdh', bjdh);
      params.append('jjr', jjr);
      params.append('sjjb', sjjb);
      params.append('bjfs', bjfs);
      params.append('bjnr', bjnr);
      params.append('sjjl', sjjl);
      axios.post(this.baseURL+'keyArea/addAbnormalDisposalProcess',params, {
        // baseURL: this.baseURL,
        // params: {sjbh, sjzt, fsdz, jwdxx, bjr, bjdh, jjr, sjjb, bjfs, bjnr, sjjl}
      }).then(res => {
        if(res.data>0){
          this.$message({message: "操作成功!", type: 'success'});
          this.dialog.display = false;
          this.findAbnormalDisposalProcess();
        }else if (res.data===0){
          this.$message.error('操作失败！');
        }else if (res.data===-1){
          this.$message.error('该已添加！');
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    updateAbnormalDisposalProcess(){
      const item =this.table.selectItem;
      const {sjbh, sjzt, fsdz, jwdxx, bjr, bjdh, jjr, sjjb, bjfs, bjnr, sjjl} = this.dialog.form;
      if(sjbh===''||sjzt===''||fsdz===''||jwdxx===''||bjr===''||bjdh===''||jjr===''||sjjb===''||bjfs===''||bjnr===''||sjjl===''){
        this.$message.error('请填写完整信息！');
        return false;
      }
      let params = new URLSearchParams();
      params.append('sjbh', sjbh);
      params.append('sjzt', sjzt);
      params.append('fsdz', fsdz);
      params.append('jwdxx', jwdxx);
      params.append('bjr', bjr);
      params.append('bjdh', bjdh);
      params.append('jjr', jjr);
      params.append('sjjb', sjjb);
      params.append('bjfs', bjfs);
      params.append('bjnr', bjnr);
      params.append('sjjl', sjjl);
      params.append('id', item.ID);
      axios.post(this.baseURL+'keyArea/updateAbnormalDisposalProcess',params, {
      }).then(res => {
        if(res.data>0){
          this.$message({message: "操作成功!", type: 'success'});
          this.dialog.display = false;
          this.findAbnormalDisposalProcess();
        }else if (res.data===0){
          this.$message.error('操作失败！');
        }else if (res.data===-1){
          this.$message.error('该已添加！');
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    addMapMarker(item){
      //点判断是否消失
      if(this.map.mapMarker!=null){
        this.map.mapMarker.setMap(null);
      }
      this.map.mapMarker = new AMap.Marker({
        map: this.map.amap,
        offset: new AMap.Pixel(-14,-18), //相对于基点的偏移位置
        position: new AMap.LngLat(item.PX,item.PY),
        draggable: false,  //是否可拖动
      });
      this.map.amap.setCenter([item.PX,item.PY]);
    },
    addMapMarker2(item){
      //点判断是否消失
      if(this.map.mapMarker2!=null){
        this.map.mapMarker2.setMap(null);
      }
      this.map.mapMarker2 = new AMap.Marker({
        map: this.map.amap2,
        offset: new AMap.Pixel(-14,-18), //相对于基点的偏移位置
        position: new AMap.LngLat(item.PX,item.PY),
        draggable: false,  //是否可拖动
      });
      this.map.amap2.setCenter([item.PX,item.PY]);
    },
    handleQueryClick() {
      this.findAbnormalDisposalProcess();
    },
    handleAddClick() {
      this.dialog.title='添加';
      this.dialog.display = true;
      setTimeout(() => {
        this.initDialogMap();
      }, 0)
    },
    handleDetailClick(item) {
      this.$confirm('确定审核吗?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        cancelButtonClass: 'el-button--danger',
        closeOnClickModal: false,
        type: 'info',
        center: true
      }).then(() => {
        axios.get('keyArea/auditAbnormalDisposalProcess', {
          baseURL: this.baseURL,
          params: {id:item.ID}
        }).then(res => {
          if(res.data>0){
            this.$message({message: "操作成功!", type: 'success'});
            this.findAbnormalDisposalProcess();
          }else{
            this.$message.error('操作失败！');
          }
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(() => {

      });
    },
    handleEditClick(item) {
      this.dialog.title='修改';
      this.table.selectItem = item;
      this.dialog.form.sjbh = item.SJBH;
      this.dialog.form.sjzt = item.SJZT;
      this.dialog.form.fsdz = item.ADDRESS;
      this.dialog.form.jwdxx = item.PX+","+ item.PY;
      this.dialog.form.bjr = item.BJR;
      this.dialog.form.bjdh = item.DJDH;
      this.dialog.form.jjr = item.JJR;
      this.dialog.form.sjjb = item.SJJB;
      this.dialog.form.bjfs = item.BJFS;
      this.dialog.form.bjnr = item.SJNR;
      this.dialog.form.sjjl = item.SJJL;
      this.dialog.display = true;
      setTimeout(() => {
        this.initDialogMap();
        this.addMapMarker2(this.table.selectItem);
      }, 0);
    },
    handleDialogSaveClick(){
      if(this.dialog.title === '修改'){
        this.updateAbnormalDisposalProcess();
      }else if(this.dialog.title === '添加'){
        this.addAbnormalDisposalProcess();
      }
    },
    handleDeleteClick(item) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        cancelButtonClass: 'el-button--danger',
        closeOnClickModal: false,
        type: 'info',
        center: true
      }).then(() => {
        axios.get('keyArea/deleteAbnormalDisposalProcess', {
          baseURL: this.baseURL,
          params: {id:item.ID}
        }).then(res => {
          if(res.data>0){
            this.$message({message: "操作成功!", type: 'success'});
            this.findAbnormalDisposalProcess();
          }else{
            this.$message.error('操作失败！');
          }
        }).catch(function (error) {
          console.error(error);
        });
      }).catch(() => {

      });
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    },
    handleTableRowClick(item){
      this.table.selectTableItem=item;
      this.addMapMarker(item);
    },
    handleDialogClosed() {
      this.dialog.title = '';
      this.dialog.form.sjbh = '';
      this.dialog.form.sjzt = '';
      this.dialog.form.fsdz = '';
      this.dialog.form.jwdxx = '';
      this.dialog.form.bjr = '';
      this.dialog.form.bjdh = '';
      this.dialog.form.jjr = '';
      this.dialog.form.sjjb = '';
      this.dialog.form.bjfs = '';
      this.dialog.form.bjnr = '';
      this.dialog.form.sjjl = '';
      this.table.selectItem = {};
    },
    initMap() {
      this.map.amap = new AMap.Map('gaodeMap', {
        center: this.map.center,
        resizeEnable: true,
        zoom: 13
      })
    },
    initDialogMap() {
      this.map.amap2 = new AMap.Map('gaodeMap_dialog', {
        center: this.map.center,
        resizeEnable: true,
        zoom: 13
      });
      let _this=this;
      this.map.amap2.on('click', function(e) {
        let itemXY={};
        _this.dialog.form.jwdxx = e.lnglat.getLng() + ',' + e.lnglat.getLat();
        itemXY.PX=e.lnglat.getLng();
        itemXY.PY=e.lnglat.getLat();
        _this.addMapMarker2(itemXY);
        _this.getRealAddress([itemXY.PX,itemXY.PY]);
      });
    },
    getRealAddress(lnglat) {
      if(!this.map.geocoder){
        this.map.amap2.plugin('AMap.Geocoder', function() {});
        this.map.geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
          radius: 1000 //范围，默认：500
        });
      }
      let _this=this;
      this.map.geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete'&&result.regeocode) {
          _this.dialog.form.fsdz = result.regeocode.formattedAddress;
        }else{
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/tongwoo-util';
$bottomHeight: 330px;
.tw-template-wrapper {
  overflow: auto;
}

.tw-query-panel {
  height: calc(100% - #{$bottomHeight} - 64px);
  min-height: 300px;
}

.tw-panel {
  $width: 500px;
  &-layout {
    height: $bottomHeight;
    padding-left: 10px;
    padding-right: 10px;

    @include clearfix;
  }

  &__left,
  &__right {
    float: left;
    box-sizing: border-box;
  }

  &__left {
    width: $width;
    height: 100%;
    padding-right: 10px;
  }

  &__right {
    width: calc(100% - #{$width});
    height: 100%;
  }

  &__title {
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
  &__body {
    padding: 10px;
    text-indent: 2em;
    font-size: 15px;
    line-height: initial;
    font-family: initial;
    height: inherit;
    overflow: auto;
  }
}
.tw-dialog {
  .tw-panel {
    $width: 300px;
    // position: relative;
    height: auto;

    &__left {
      width: $width;
    }

    &__right {
      width: calc(100% - #{$width});
    }
  }
  .tw-map {
    position: absolute;
    top: 50%;
    right: 20px;
    width: calc(100% - 360px);
    height: 440px;
    transform: translateY(-50%);
  }
}
</style>