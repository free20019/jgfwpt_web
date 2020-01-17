<!-- 异常处置报告 -->
<template>
  <div class="tw-template-wrapper">
    <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
      <el-form-item>
        <el-input class="inline-input" v-model="query.title" placeholder="主题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tw-query-panel">
      <el-table class="tw-table" :data="filterTableList" v-loading="table.loading" border size="small"  @row-click="handleTableRowClick" height="calc(100% - 42px)">
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
        <div style="margin-left: 20%;height: 85%">
          <el-tree class="tw-tree" :data="tree.data" show-checkbox node-key="id" ref="tree" :props="tree.props"  :default-expanded-keys="[3]" :default-checked-keys="[3]"></el-tree>
        </div>
        <div style="text-align: center;">
          <el-checkbox v-model="select.message">短信</el-checkbox>
          <el-checkbox v-model="select.email">邮件</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button size="mini" type="primary"  @click="handleSendClick">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore'
  import axios from 'axios'

export default {
  name: 'AbnormalDisposalReport',
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
      select:{
        email: '',
        message: '',
      },
      tree: {
        data: [{
          id: 1,
          label: '运管局',
          children: [{
            id: 2,
            label: '指挥中心',
            children: [{
              id: 3,
              label: '金俊'
            }]
          }]
        }],
        props: {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  mounted() {
    this.findAbnormalDisposalProcess();
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
    handleQueryClick() {
      this.findAbnormalDisposalProcess();
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
    handleSendClick() {
      if(this.$refs.tree.getCheckedNodes().length===0){
        this.$message.error('请选择接收人！');
      }else{
        if(this.select.email||this.select.message){
          this.$message.success('发送成功！');
        }else{
          this.$message.error('请勾选发送短信或邮箱！');
        }
      }

    },
    handleTableRowClick(item){
      this.table.selectTableItem=item;
    },
    handleTablePageCurrentChange(index) {
      this.table.currentPage = index
    }
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
    padding-left: 10px;
    border-left: 1px solid #eeeeee;
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
</style>