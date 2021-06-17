<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动广场</el-breadcrumb-item>
      <el-breadcrumb-item>审核未通过活动查看</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入活动名称" v-model="queryInfo.query" clearable @clear="getActivityListMy">
            <el-button slot="append" icon="el-icon-search" @click="getActivityListMy"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="activitylistmy" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="活动名称" prop="activityName"></el-table-column>
        <el-table-column label="所属社团" prop="assName"></el-table-column>
        <el-table-column label="活动简介" prop="activityBrief"></el-table-column>
        <el-table-column label="活动主题" prop="activityType"></el-table-column>
        <el-table-column label="活动是否可以请假">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.activityLeave"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="活动审核状态" prop="activityStatus"></el-table-column>
        <el-table-column label="活动报名限制人数" prop="activityPeople"></el-table-column>
        <el-table-column label="活动学分" prop="activityCredit"></el-table-column>
        <el-table-column label="活动评分" prop="activityScore"></el-table-column>
        <el-table-column label="活动创建时间" prop="activityCreateTime"></el-table-column>
        <el-table-column label="活动报名开始时间" prop="activitySignBeginTime"></el-table-column>
        <el-table-column label="活动报名结束时间" prop="activitySignEndTime"></el-table-column>
        <el-table-column label="活动开始时间" prop="activityBeginTime"></el-table-column>
        <el-table-column label="活动结束时间" prop="activityEndTime"></el-table-column>
        <el-table-column label="审核状态" prop="userActivityStatus"></el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-tooltip effect="dark" content="退出活动" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="quitActivity(scope.row.activityId)"></el-button>
            </el-tooltip>
          </template> -->
          <!-- <el-tooltip effect="dark" content="审核通过" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="agree(scope.row.activityId)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="审核未通过" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="disAgree(scope.row.activityId)"></el-button>
            </el-tooltip> -->
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
      queryInfo: {
        query: '',
        current: 1,
        size: 2
        // userId: this.$root.USER.userId
      },
      activitylistmy: [],
      total: 0,
      signlist: []
    }
  },
  created() {
    this.getActivityListMy()
  },
  methods: {
    async getActivityListMy() {
      const { data: res } = await this.$http.get('', { params: this.queryInfo })
      if (res.code === 201) return this.$message.error('您还' + res.data.提示)
      this.activitylistmy = res.data.records
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getActivityListMy()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getActivityListMy()
    }
    // async agree(activityId) {
    //   const { data: res } = await this.$http.get('', { params: { } })
    //   if (res.code === 201) return this.$message.error(res.data.提示)
    //   this.$message.success(res.data.提示)
    // },
    // async disAgree(activityId) {
    //   const { data: res } = await this.$http.get('', { params: { } })
    //   if (res.code === 201) return this.$message.error(res.data.提示)
    //   this.$message.success(res.data.提示)
    // }
    // async quitActivity(activityId) {
    //   const { data: res } = await this.$http.get('user/quitActivity', { params: { activityId: activityId, userId: this.$root.USER.userId } })
    //   if (res.code === 201) return this.$message.error(res.data.提示)
    //   console.log(res)
    //   this.$message.success(res.data.提示)
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
