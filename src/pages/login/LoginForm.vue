<template>
  <!-- <div>1111123344555</div> -->
  <i-form
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
    class="login-form"
    ref="loginForm"
  >
    <i-form-item prop="username">
      <i-input placeholder="请输入用户名" v-model="form.username">
        <span slot="prefix">
          <i-icon :size="16" type="ios-person" />
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="password">
      <i-input placeholder="请输入密码" type="password" v-model="form.password">
        <span slot="prefix">
          <i-icon :size="14" type="md-lock" />
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="captchaCode">
      <i-row :gutter="16">
        <i-col span="16">
          <i-input placeholder="请输入验证码" v-model="form.captchaCode">
            <span slot="prefix">
              <i-icon :size="16" type="ios-image" />
            </span>
          </i-input>
        </i-col>
        <i-col span="8">
          <img
            :src="captchaUrl"
            @click="getCaptchaBS64('reload')"
            alt="验证码"
            class="login-form__captcha"
          />
        </i-col>
      </i-row>
    </i-form-item>
    <i-form-item>
      <i-button :loading="loading" @click="handleSubmit" long type="primary">登录</i-button>
    </i-form-item>
  </i-form>
</template>

<script>
// import { getCaptchaBase64, getCaptchaidApi } from '@/api/personal-center/user'

// export default {
//   name: 'LoginForm',

//   props: {
//     loading: {
//       type: Boolean,
//       default: false
//     },
//     userNameRules: {
//       type: Array,
//       default: () => {
//         return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
//       }
//     },
//     passwordRules: {
//       type: Array,
//       default: () => {
//         return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
//       }
//     },
//     reloadCaptcha: String
//   },

//   data() {
//     return {
//       captchaId: '',
//       captchaUrl: '',
//       form: {
//         username: 'admin',
//         password: '123456',
//         captchaCode: ''
//       }
//     }
//   },

//   computed: {
//     rules() {
//       return {
//         username: this.userNameRules,
//         password: this.passwordRules,
//         captchaCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
//       }
//     }
//   },

//   watch: {
//     reloadCaptcha(val) {
//       getCaptchaidApi().then(({ captchaId }) => {
//         this.captchaId = captchaId
//         this.getCaptchaBS64()
//       })
//     }
//   },

//   created() {
//     getCaptchaidApi().then(({ captchaId }) => {
//       this.captchaId = captchaId
//       this.getCaptchaBS64()
//     })
//   },

//   methods: {
//     getCaptchaBS64(reloadCaptcha) {
//       const { captchaId } = this
//       getCaptchaBase64(captchaId, reloadCaptcha)
//         .then(base64 => {
//           this.captchaUrl = base64
//         })
//         .catch(error => {
//           this.$Message.error(error.message)
//         })
//     },

//     handleSubmit() {
//       this.$refs.loginForm.validate(valid => {
//         if (valid) {
//           this.$emit('on-submit', {
//             username: this.form.username,
//             password: this.form.password,
//             captchaCode: this.form.captchaCode,
//             captchaId: this.captchaId
//           })
//         }
//       })
//     }
//   }
// }
//
</script>

//
<style lang="less">
// .login-form {
//   &-item {
//     margin-bottom: 40px;

//     &:last-child {
//       margin-bottom: 10px;
//     }
//   }

//   &__captcha {
//     height: 33px;
//   }
// }
//
</style>
