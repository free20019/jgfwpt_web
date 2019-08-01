<!--登陆-->
<template>
  <div class="tw-template-wrapper">
    <img class="tw-bg-img" src="../assets/backgroundImg.svg">
    <div class="tw-login-title">杭州出租汽车监管服务平台</div>
    <div class="tw-login-box">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.username" prefix-icon="iconfont icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" prefix-icon="iconfont icon-key" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button
            type="primary"
            style="display: block; width: 100%;"
            @click="handleSubmitClick"
          >登&emsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmitClick() {}
  }
};
</script>

<style lang="scss" scoped>
.tw-template-wrapper {
  background-color: #408ab4;
}
.tw-bg-img {
  position: absolute;
  right: 15px;
  bottom: 15px;
  height: calc(100% + 50px);
}
.tw-login {
  &-title {
    position: absolute;
    top: 10%;
    left: 50%;
    text-shadow: 2px 2px 12px #000000;
    font-size: 48px;
    color: #ffffff;
    transform: translateX(-50%);
  }
  &-box {
    position: relative;
    top: calc(50% - 40px);
    left: 50%;
    width: 320px;
    /*height: 220px;*/
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 28px #000000;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
  }
}
</style>