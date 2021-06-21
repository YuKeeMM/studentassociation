<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home2' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团广场</el-breadcrumb-item>
      <el-breadcrumb-item>社团查看</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入社团名称" v-model="queryInfo.query" clearable @clear="getAssociateList">
            <el-button slot="append" icon="el-icon-search" @click="getAssociateList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="associatelist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="社团名称" prop="assName"></el-table-column>
        <el-table-column label="社团简介" prop="assBrief"></el-table-column>
        <el-table-column label="社团总人数" prop="assTotal"></el-table-column>
        <el-table-column label="社团审核状态" prop="assStatus"></el-table-column>
        <el-table-column label="社团创建时间" prop="assCreateTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="查看公告" placement="top">
              <el-button type="success" icon="el-icon-s-claim" @click="lookNotic(scope.row.assId)"></el-button>
            </el-tooltip>
            <!-- <el-tooltip effect="dark" content="报名" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="signAssociation(scope.row.assId)"></el-button>
            </el-tooltip> -->
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
    <!-- 公告栏 -->
    <el-dialog
      title="公告"
      :visible.sync="noticeDialogVisible"
      width="50%">
      <el-table :data="noticelist" border stripe>
        <el-table-column label="公告名称" prop="noticeName"></el-table-column>
        <el-table-column label="公告简介" prop="noticeBrief"></el-table-column>
        <el-table-column label="社团名字" prop="assName"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
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
        size: 2
      },
      associatelist: [],
      total: 0,
      signlist: [],
      noticeDialogVisible: false, // 公告界面的显示
      noticelist: []
    }
  },
  created() {
    this.getAssociateList()
  },
  methods: {
    async getAssociateList() {
      const { data: res } = await this.$http.get('association/list', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取社团列表失败！')
      this.associatelist = res.data.records
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getAssociateList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getAssociateList()
    },
    async signAssociation(assId) {
      const { data: res } = await this.$http.get('user/registerAssociation', { params: { assId: assId, userId: this.$root.USER.userId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      console.log(res)
      this.$message.success('社团报名成功！')
    },
    async lookNotic(assId) {
      const { data: res } = await this.$http.get('notice/searchAllNotice', { params: { assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.noticelist = res.data.notices
      this.noticeDialogVisible = true
      this.$message.success('获取社团公告成功！')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
