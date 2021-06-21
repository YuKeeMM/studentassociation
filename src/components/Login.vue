// 模板区
<template>
  <div class="login_container">
    <img class="background_picture" src="../assets/school1.jpg" />
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/mmd.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success" class="register" @click="addDialogVisible = true">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="注册用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户身份" prop="userRole">
          <el-radio v-model="addForm.userRole" label="普通用户">普通用户</el-radio>
          <el-radio v-model="addForm.userRole" label="管理员">管理员</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

// 行为
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        phone: '13588386674',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        phone: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      addDialogVisible: false,
      addForm: {
        phone: '',
        password: '',
        userName: '',
        userRole: ''
      },
      addFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 11, message: '用户的长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userRole: [
          { required: true, message: '请选择用户身份', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录前表单数据预验证
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('user/login', { params: this.loginForm })
        if (res.code === 201) return this.$message.error('用户或密码错误！')
        else if (res.code !== 201 && res.code !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        window.sessionStorage.setItem('token', res.data.token)
        console.log(res)
        this.$root.USER.userId = res.data.user.userId
        this.$root.USER.userName = res.data.user.userName
        this.$root.USER.userPwd = res.data.user.userPwd
        this.$root.USER.userPhone = res.data.user.userPhone
        this.$root.USER.userCredit = res.data.user.userCredit
        this.$root.USER.userRole = res.data.user.userRole
        this.$root.USER.userCreateTime = res.data.user.userCreateTime
        console.log(this.$root.USER.userName)
        // 根据后端返回的userRole值进入不同的界面
        if (res.data.user.userRole === '管理员') this.$router.push('/home3')// 进入管理员界面
        else if (res.data.userAssRole === '社长') this.$router.push('/home2')// 进入社长界面
        else this.$router.push('/home')// 进入普通用户界面
        // if (res.data.user.userRole === '普通用户') this.$router.push('/home')// 进入普通用户界面
        // else if (res.data.user.userRole === '社长') this.$router.push('/home2')// 进入社长界面
        // else this.$router.push('/home3')// 进入管理员界面
      })
    },
    register () {
    },
    // 监听注册对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 注册函数
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('user/register', { params: this.addForm })
        if (res.code === 201) return this.$message.error('该手机号码已存在！')
        else if (res.code !== 201 && res.code !== 200) return this.$message.error('注册失败！')
        this.$message.success('注册成功！')
        this.addDialogVisible = false
      })
    }
  }
}
</script>

// 样式区
// lang="less"(支持less语法格式)
// scoped(加上表示只在当前组件内生效，去掉就会在全局生效)
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.background_picture {
  height: 100%;
  width: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    background-color: #fff;
    height: 130px;
    width: 130px;
    border: 3px solid #eee;
    border-radius: 50%; // 圆角
    padding: 10px; // 内边距
    box-shadow: 0 0 10px #ddd; // 阴影
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      background-color: #eee;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex; // 横向
  justify-content: flex-end; // 尾对齐
}
.register{
  margin-right: 180px;
}
</style>
