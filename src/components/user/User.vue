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
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlist: [{
        userId: this.$root.USER.userId,
        userName: this.$root.USER.userName,
        userPwd: this.$root.USER.userPwd,
        userPhone: this.$root.USER.userPhone,
        userCredit: this.$root.USER.userCredit,
        userRole: this.$root.USER.userRole,
        userCreateTime: this.$root.USER.userCreateTime
      }]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
