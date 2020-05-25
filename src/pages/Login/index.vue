<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">专业基本状态数据库</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'"></i>
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <!-- <span style="margin-right:20px;">username: brx</span> -->
        <!-- <span> password: 123456</span> -->
      </div>

    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import {login} from '../../api/user'
// console.log(process.env)
export default {
    data(){
        return{
            loginForm: {
                username: 'brx',
                password: '123456'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: null }],
                password: [{ required: true, trigger: 'blur', validator: null }]
            },
            loading: false,
            passwordType: 'password',
            // bgStyle:{
            //     height: '100vh',
            //     width: '100%',
            //     backgroundImage: 'url('+require('@/assets/laptop.jpeg')+')',
            //     backgroundRepeat: "no-repeat",
            //     backgroundSize: "100% auto",
            // }
        }
    },
    methods: {
        showPwd() {
        if (this.passwordType === 'password') {
            this.passwordType = ''
        } else {
            this.passwordType = 'password'
        }
        this.$nextTick(() => {
            this.$refs.password.focus()
        })
        },
        handleLogin(){
            // TODO
            // axios.post(process.env.VUE_APP_APIURL + '/users/login',this.loginForm).then(res=>{               
            //     if (res.data.code === 0){
            //         // 1.将当前登录的用户信息给保存起来
            //         sessionStorage.setItem("userInfo",JSON.stringify(res.data.data.userInfo))
            //         // 2.将 token 保存
            //         sessionStorage.setItem("jwctoken",res.data.data.token)
            //         this.$router.push('/')
            //     }else{
            //         this.$message({
            //             message: res.data.msg,
            //             type: 'error'       
            //         });
            //     }
            // }).catch((err)=>{
            //   this.$message({
            //       message: err.message,
            //       type: 'error'       
            //   });              
            // });     
            login(this.loginForm).then(res=>{    
              console.log(res)           
                if (res.code === 90000){
                    // 1.将当前登录的用户信息给保存起来
                    sessionStorage.setItem("userInfo",JSON.stringify(res.result.userInfo))
                    // 2.将 token 保存
                    sessionStorage.setItem("jwctoken",res.result.token)
                    this.$router.push('/')
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'       
                    });
                }
            }).catch((err)=>{
              console.log(err)
              this.$message({
                  message: err.message,
                  type: 'error'       
              });              
            });
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
// body{
//   background-color: #283443;
// }
.login-container {
  height: 100vh;
  width: 100vw;
  background: url('~@/assets/laptop.jpeg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>