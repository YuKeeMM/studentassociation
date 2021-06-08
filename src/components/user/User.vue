<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="密码" prop="userPwd"></el-table-column>
        <el-table-column label="电话" prop="userPhone"></el-table-column>
        <el-table-column label="学分" prop="userCredit"></el-table-column>
        <el-table-column label="用户身份" prop="userRole"></el-table-column>
        <el-table-column label="操作">
          <template></template>
          <el-tooltip effect="dark" content="修改" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" @click="changeDialogVisible = true"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改用户信息的对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="changeDialogVisible"
      width="50%"
      @close="changeDialogClosed">
      <el-form :model="changeForm" :rules="changeFormRules" ref="changeFormRef" label-width="100px">
        <el-form-item label="修改手机号" prop="modifyPhone">
          <el-input v-model="changeForm.modifyPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="changeForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="changeForm.userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 把全局变量中的内容赋值给userlist
      userlist: [{
        userId: this.$root.USER.userId,
        userName: this.$root.USER.userName,
        userPwd: this.$root.USER.userPwd,
        userPhone: this.$root.USER.userPhone,
        userCredit: this.$root.USER.userCredit,
        userRole: this.$root.USER.userRole,
        userCreateTime: this.$root.USER.userCreateTime
      }],
      changeDialogVisible: false,
      changeForm: {
        modifyPhone: '',
        password: '',
        userName: '',
        phone: this.$root.USER.userPhone
      },
      changeFormRules: {
        modifyPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 11, message: '用户的长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    // 监听注册对话框的关闭事件
    changeDialogClosed () {
      this.$refs.changeFormRef.resetFields()
    },
    // 注册函数
    changeUser () {
      this.$refs.changeFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('user/modify', { params: this.changeForm })
        if (res.code === 201) return this.$message.error('该手机号码已存在！')
        else if (res.code !== 201 && res.code !== 200) return this.$message.error('修改失败！')
        this.$message.success('修改成功！')
        this.$root.USER.userName = res.data.modifyUser.userName
        this.$root.USER.userPwd = res.data.modifyUser.userPwd
        this.$root.USER.userPhone = res.data.modifyUser.userPhone
        this.changeDialogVisible = false
      })
    }
  }
}
</script>
