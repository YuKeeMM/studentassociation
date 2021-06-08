<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动广场</el-breadcrumb-item>
      <el-breadcrumb-item>活动报名</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入活动名称" v-model="queryInfo.query" clearable @clear="getActivityList">
            <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="activitylist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="活动名称" prop="activityName"></el-table-column>
        <el-table-column label="活动简介" prop="activityBrief"></el-table-column>
        <el-table-column label="活动主题" prop="activityType"></el-table-column>
        <el-table-column label="活动是否可以请假" prop="activityLeave"></el-table-column>
        <el-table-column label="活动审核状态" prop="activityStatus"></el-table-column>
        <el-table-column label="活动报名限制人数" prop="activityPeople"></el-table-column>
        <el-table-column label="活动学分" prop="activityCredit"></el-table-column>
        <el-table-column label="活动评分" prop="activityScore"></el-table-column>
        <el-table-column label="活动创建时间" prop="activityCreateTime"></el-table-column>
        <el-table-column label="活动报名开始时间" prop="activitySignBeginTime"></el-table-column>
        <el-table-column label="活动报名结束时间" prop="activitySignEndTime"></el-table-column>
        <el-table-column label="活动开始时间" prop="activityBeginTime"></el-table-column>
        <el-table-column label="活动结束时间" prop="activityEndTime"></el-table-column>
        <el-table-column label="操作">
          <el-tooltip effect="dark" content="报名" placement="top">
            <el-button type="primary" icon="el-icon-s-custom" @click="sign"></el-button>
          </el-tooltip>
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
        size: 2
      },
      activitylist: [],
      total: 0,
      signlist: []
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    async getActivityList() {
      const { data: res } = await this.$http.get('activity/searchAllActivity', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取活动列表失败！')
      this.activitylist = res.data.records
      this.total = res.data.total
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getActivityList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getActivityList()
    },
    sign() {
      // 社团编号
      // this.activitylist.  ass
    }
  }
}
</script>

<style lang="less" scoped>
</style>
