<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            block
            v-if="iaShowCodeBtn"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            @finish="iaShowCodeBtn = true"
            :time="3 * 1000"
            format="ss秒"
          ></van-count-down>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/* eslint-disable */
import { mobileRules, codeRules } from '@/views/Login/rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
//token身份证标识用户
//用处：标识用户是否登陆了
//token
//存放vuex
//toekn存在vuex
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      iaShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      //submit事件只有表单校验通过以后会被触发
      //loading
      //message:提示文案
      //forbidclick禁止点击
      //duration展示的时长.为0,一直展示
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/my')
        this.$toast.success('登陆成功')
      } catch (error) {
        //细分一下失败：提示用户手机号和验证码
        //如果是手机号或者验证码错了，用户能知道
        //error:1.js抛的错2.axios封装的error对象

        //axios封装的error对象
        //error.response.data后端返回的数据
        //error.response.status后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      //0.验证用户是否输入了有效的手机号
      //-1form绑定ref
      //$refs.form.validate(name)
      await this.$refs.form.validate('mobile')
      this.loading()
      // 发送请求
      console.log('发送请求')
      try {
        await sendCodeAPI(this.mobile)
        // 显示倒计时组件
        this.iaShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
//scoped样式作用于当前的组件
//vue-cli提供了语法：deep()深度选择器
.nav-bar {
  background-color: hotpink;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-button {
  background-color: hotpink;
  border-color: hotpink;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    color: #fff;
  }
}
</style>
