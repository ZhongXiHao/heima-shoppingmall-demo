<script>

import { getPicCodeApi, getMsgVerifyCodeApi } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // User's input picture code
      picKey: '', // Picture unique key
      picUrl: '', // Picture URL
      totalSecond: 60, // Countdown seconds
      currentSecond: 60, // Current countdown seconds
      timer: null, // Timer
      phoneNumber: '' // User's input mobile number
    }
  },
  async created () {
    await this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const res = await getPicCodeApi()
      this.picUrl = res.data.base64 // Picture URL
      this.picKey = res.data.key // Picture unique key

      // Toast('点击图片可更换验证码')
      // this.$toast('hi')
    },
    async getMsgVerifyCode () {
      if (!this.verifyPhoneNumberPattern() || !this.verifyPicCode()) {
        return
      }
      if (!this.timer && this.currentSecond === this.totalSecond) {
        // Request to send SMS verification code would go here
        const res = await getMsgVerifyCodeApi({
          captchaCode: this.picCode,
          captchaKey: this.picKey,
          mobile: this.phoneNumber
        })
        console.log({
          captchaCode: this.picCode,
          captchaKey: this.picKey,
          mobile: this.phoneNumber
        })
        console.log(res)

        // Start countdown
        this.currentSecond--
        this.$toast('短信验证码已发送，请注意查收')
        this.timer = setInterval(() => {
          this.currentSecond--
          if (this.currentSecond <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.currentSecond = this.totalSecond
          }
        }, 1000)
      }
    },
    // Validate picture code format
    verifyPicCode () {
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // Validate phone number format
    verifyPhoneNumberPattern () {
      if (!/^1[3-9]\d{9}/.test(this.phoneNumber)) {
        this.$toast('手机号格式不正确')
        return false
      }
      return true
    }
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<template>
  <div class="login">
    <!--    Header, using NavBar in Vant2-->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)">
      <!-- $router.go(-1) goes back one step in history -->
    </van-nav-bar>
    <!--    Main-->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phoneNumber" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text">
          <button class="getSmgCodeBtn" @click="getMsgVerifyCode" :disabled="currentSecond !== totalSecond">
            {{ currentSecond === totalSecond ? '获取验证码' : currentSecond + 's后重发' }}
          </button>

        </div>
      </div>

      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
