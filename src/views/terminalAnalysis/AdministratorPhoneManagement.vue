<!--公司管理员手机号管理-->
<template>
    <div class="tw-template-wrapper">
        <el-form :inline="true" :model="query" size="small" class="tw-query-bar">
            <el-form-item>
                <el-input v-model="query.filter" placeholder="filter" @input="handleFilterClick()"></el-input>
            </el-form-item>
        </el-form>
        <div class="tw-query-panel">
            <el-table :data="filterTableList" v-loading="table.loading" border size="small" height="calc(100% - 42px)" style="width: 100%; margin-bottom: 10px;">
                <el-table-column type="index" label="序号" width="60" :resizable="false" fixed></el-table-column>
                <el-table-column prop="COMPANY_NAME" label="公司名称" width="280" fixed show-overflow-tooltip></el-table-column>
                <el-table-column prop="MANAGE_PERSON" label="管理员" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="MANAGE_PHONE" label="联系电话" width="150"></el-table-column>
                <el-table-column prop="REMARKS" label="备注" min-width="160" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column :resizable="false" width="100" align="center">
                    <template slot="header" slot-scope="scope">
                        <el-button size="mini" icon="el-icon-plus" @click="handleTableAddClick"></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" type="text" @click="handleTableEditClick(scope.row)"></el-button>
                        <el-button size="mini" icon="el-icon-delete" type="text" @click="handleTableDeleteClick(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :page-size="table.pageSize" :current-page="table.currentPage" :total="table.total" layout="prev, pager, next, total" @current-change="handleTablePageCurrentChange"></el-pagination>
        </div>
        <el-dialog :title="dialog.title" :visible.sync="dialog.display" width="400px" @closed="handleDialogClosed">
            <el-form ref="form" :model="dialog.form" size="small" label-width="80px">
                <el-form-item label="公司名称">
                    <tree-select class="tw-tree-select tw-line" v-model="dialog.form.companyName" :multiple="true" :options="filterCompanyName" placeholder="公司名称" style="width: 260px;"/>
                    <!--<el-autocomplete class="inline-input" v-model="dialog.form.companyName" placeholder="公司名称"-->
                                     <!--:fetch-suggestions="queryDialogCompanyNameSearch" :trigger-on-focus="false" style="width: 260px;"></el-autocomplete>-->
                </el-form-item>
                <el-form-item label="管理员">
                    <el-input v-model="dialog.form.manager" placeholder="管理员,管理员,管理员..." style="width: 260px;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="dialog.form.phone" placeholder="联系电话,联系电话,联系电话..." style="width: 260px;"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="dialog.form.remarks" placeholder="备注" style="width: 260px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.display = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogSaveClick">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'underscore'
    import axios from 'axios'
    import TreeSelect from '@riophae/vue-treeselect'
    import {mapGetters} from 'vuex'

    export default {
        name: "AdministratorPhoneManagement.vue",
        data() {
            return {
                query:{
                    filter: ''
                },
                table: {
                    loading: false,
                    selectItem: {},
                    data: [],
                    all: [],
                    pageSize: 20,
                    currentPage: 1,
                    total: 0
                },
                dialog: {
                    title: '',
                    display: false,
                    form: {
                        companyName: [],
                        manager: '',
                        phone: '',
                        remarks: ''
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getAdministratorPhoneManagement();
            });
        },
        computed: {
            ...mapGetters(['getAllCompanyName']),
            filterTableList() {
                const {data, pageSize, currentPage} = this.table;
                const pageIndex = currentPage - 1;
                return _.filter(data, (item, index) => {
                    return  index >= pageIndex * pageSize && index < currentPage * pageSize;
                })
            },
            filterCompanyName() {
                return _.map(_.filter(this.getAllCompanyName, item => item.label), item => {
                    return {id: item.label, label: item.label}
                })
            }
        },
        methods: {
            /*接口*/
            // queryDialogCompanyNameSearch(query, cb){
            //     cb(_.filter(this.getAllCompanyName, item => item.label.indexOf(query) > -1));
            // },
            getAdministratorPhoneManagement(){
                this.table.loading = true;
                axios.get('terminal/administratorPhoneManagement', {
                    baseURL: this.baseURL,
                    params: {}
                }).then(res => {
                    console.log(res.data);
                    this.table.data = res.data||[];
                    this.table.all = res.data||[];
                    this.table.total = this.table.data.length;
                    this.table.currentPage = 1;
                    this.table.loading = false;
                    this.handleFilterClick();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getAddAdministratorPhoneManagement(){
                const {companyName, manager, phone, remarks} = this.dialog.form;
                if(companyName.toString()===''||manager===''||phone===''){
                    this.$message.error('请填写完整信息（公司，管理员，联系电话）！');
                    return false;
                }
                if(manager.replace(/，/g,',').split(',').length !== phone.replace(/，/g,',').split(',').length){
                    this.$message.error('管理员和联系电话数量需一致(逗号分割)！');
                    return false;
                }
                let mobile =  /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
                let phones=phone.replace(/，/g,',').split(',');
                for (let i = 0; i <phones.length ; i++) {
                    if (!mobile.test(phones[i])){
                        this.$message.error('请填写正确手机号码！');
                        return false;
                    }
                }
                axios.get('terminal/addAdministratorPhoneManagement', {
                    baseURL: this.baseURL,
                    params: {
                        company:companyName.toString(),
                        manager: manager.replace(/，/g,','),
                        phone: phone.replace(/，/g,','),
                        remarks
                    }
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "操作成功!", type: 'success'});
                        this.dialog.display = false;
                        this.getAdministratorPhoneManagement();
                    }else{
                        this.$message.error('操作失败！');
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            getUpdateAdministratorPhoneManagement(){
                const {companyName, manager, phone, remarks} = this.dialog.form;
                if(companyName.toString()===''||manager===''||phone===''){
                    this.$message.error('请填写完整信息（公司，管理员，联系电话）！');
                    return false;
                }
                if((manager.replace(/，/g,',').split(',').length) !== (phone.replace(/，/g,',').split(',').length)){
                    this.$message.error('管理员和联系电话数量需一致！');
                    return false;
                }
                let mobile =  /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
                let phones=phone.replace(/，/g,',').split(',');
                for (let i = 0; i <phones.length ; i++) {
                    if (!mobile.test(phones[i])){
                        this.$message.error('请填写正确手机号码！');
                        return false;
                    }
                }
                const item =this.table.selectItem;
                axios.get('terminal/updateAdministratorPhoneManagement', {
                    baseURL: this.baseURL,
                    params: {
                        id:item.ID,
                        company:companyName.toString(),
                        manager: manager.replace(/，/g,','),
                        phone: phone.replace(/，/g,','),
                        remarks
                    }
                }).then(res => {
                    if(res.data>0){
                        this.$message({message: "操作成功!", type: 'success'});
                        this.dialog.display = false;
                        this.getAdministratorPhoneManagement();
                    }else{
                        this.$message.error('操作失败！');
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            /*事件*/
            handleFilterClick() {
                const { filter } = this.query;
                this.table.data = _.filter(this.table.all, item => {
                    return (
                        item.COMPANY_NAME.indexOf(filter) > -1 ||
                        item.MANAGE_PERSON.indexOf(filter) > -1 ||
                        item.MANAGE_PHONE.indexOf(filter) > -1 ||
                        item.REMARKS.indexOf(filter) > -1
                    )
                })
                this.table.total = this.table.data.length;
                this.table.currentPage = 1;
            },
            handleTableAddClick() {
                this.dialog.title = '添加';
                this.dialog.display = true;
            },
            handleTableEditClick(item) {
                this.dialog.title = '修改';
                this.dialog.display = true;
                this.table.selectItem = item;
                this.dialog.form.companyName = item.COMPANY_NAME.split(',');
                this.dialog.form.manager = item.MANAGE_PERSON;
                this.dialog.form.phone = item.MANAGE_PHONE;
                this.dialog.form.remarks = item.REMARKS;
            },
            handleTableDeleteClick(item) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    cancelButtonClass: 'el-button--danger',
                    closeOnClickModal: false,
                    type: 'info',
                    center: true
                }).then(() => {
                    axios.get('terminal/deleteAdministratorPhoneManagement', {
                        baseURL: this.baseURL,
                        params: {id:item.ID}
                    }).then(res => {
                        if(res.data>0){
                            this.$message({message: "操作成功!", type: 'success'});
                            this.getAdministratorPhoneManagement();
                        }else{
                            this.$message.error('操作失败！');
                        }
                    }).catch(function (error) {
                        console.error(error);
                    });
                });
            },
            handleDialogSaveClick() {
                if(this.dialog.title === '修改'){
                    this.getUpdateAdministratorPhoneManagement();
                }else if(this.dialog.title === '添加'){
                    this.getAddAdministratorPhoneManagement();
                }
            },
            handleDialogClosed() {
                this.dialog.title = '';
                this.dialog.form.companyName = [];
                this.dialog.form.manager = '';
                this.dialog.form.phone = '';
                this.dialog.form.remarks = '';
                this.table.selectItem={};
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

<style scoped>

</style>