<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home3' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团广场</el-breadcrumb-item>
      <el-breadcrumb-item>我参加的社团</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入社团名称" v-model="queryInfo.query" clearable @clear="getAssociateListMy">
            <el-button slot="append" icon="el-icon-search" @click="getAssociateListMy"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="associatelistmy" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="社团名称" prop="assName"></el-table-column>
        <el-table-column label="社团简介" prop="assBrief"></el-table-column>
        <el-table-column label="社团总人数" prop="assTotal"></el-table-column>
        <el-table-column label="社团审核状态" prop="assStatus"></el-table-column>
        <el-table-column label="社团创建时间" prop="assCreateTime"></el-table-column>
        <el-table-column label="用户社团身份" prop="userAssRole"></el-table-column>
        <el-table-column label="审核状态" prop="userAssStatus"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="退出社团" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="quitAssociation(scope.row.assId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '', // 查询参数
        current: 1,
        size: 2,
        userId: this.$root.USER.userId
      },
      associatelistmy: [],
      total: 0
    }
  },
  created() {
    this.getAssociateListMy()
  },
  methods: {
    async getAssociateListMy() {
      const { data: res } = await this.$http.get('user/searchMyAssociation', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('您还' + res.data.提示)
      this.associatelistmy = res.data.records
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getAssociateListMy()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getAssociateListMy()
    },
    async quitAssociation(assId) {
      const { data: res } = await this.$http.get('user/quitAssociation', { params: { assId: assId, userId: this.$root.USER.userId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      console.log(res)
      this.$message.success(res.data.提示)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
