<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动广场</el-breadcrumb-item>
      <el-breadcrumb-item>活动查看</el-breadcrumb-item>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-tooltip effect="dark" content="报名" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="signActivity(scope.row.activityId)"></el-button>
            </el-tooltip> -->
            <el-tooltip effect="dark" content="查看成员" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="lookUser(scope.row.activityId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看待审核成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser2(scope.row.activityId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看审核未通过成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser3(scope.row.assId)" size="mini"></el-button>
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
    <!-- 活动成员栏 -->
    <el-dialog
      title="活动成员"
      :visible.sync="userDialogVisible"
      width="80%">
      <el-table :data="userlist" border stripe>
        <el-table-column label="用户姓名" prop="userName"></el-table-column>
        <el-table-column label="用户电话" prop="userPhone"></el-table-column>
        <el-table-column label="用户二课分" prop="userCredit"></el-table-column>
        <el-table-column label="用户身份" prop="userRole"></el-table-column>
        <el-table-column label="创建时间" prop="userCreateTime"></el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-tooltip effect="dark" content="踢出社团" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="outUser(scope.row.userId)"></el-button>
            </el-tooltip>
          </template> -->
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 活动待审核成员栏 -->
    <el-dialog
      title="活动待审核成员"
      :visible.sync="userDialogVisible2"
      width="80%">
      <el-table :data="userlist2" border stripe>
        <el-table-column label="用户姓名" prop="userName"></el-table-column>
        <el-table-column label="用户电话" prop="userPhone"></el-table-column>
        <el-table-column label="用户二课分" prop="userCredit"></el-table-column>
        <el-table-column label="用户身份" prop="userRole"></el-table-column>
        <el-table-column label="创建时间" prop="userCreateTime"></el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-tooltip effect="dark" content="审核通过" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="agree(scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="审核未通过" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="disAgree(scope.row.userId)"></el-button>
            </el-tooltip>
          </template> -->
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible2 = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 活动审核未通过成员栏 -->
    <el-dialog
      title="活动审核未通过成员"
      :visible.sync="userDialogVisible3"
      width="80%">
      <el-table :data="userlist3" border stripe>
        <el-table-column label="用户姓名" prop="userName"></el-table-column>
        <el-table-column label="用户电话" prop="userPhone"></el-table-column>
        <el-table-column label="用户二课分" prop="userCredit"></el-table-column>
        <el-table-column label="用户身份" prop="userRole"></el-table-column>
        <el-table-column label="创建时间" prop="userCreateTime"></el-table-column>
        <el-table-column label="操作">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible3 = false">关 闭</el-button>
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
      activitylist: [],
      total: 0,
      signlist: [],
      userDialogVisible: false, // 活动成员界面的显示
      userlist: [],
      userDialogVisible2: false, // 活动待审核成员界面的显示
      userlist2: [],
      userDialogVisible3: false, // 活动审核未通过成员界面的显示
      userlist3: []
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
    async lookUser(activityId) {
      const { data: res } = await this.$http.get('user/searchManagementActivityMember', { params: { query: '', current: 1, size: 5, activityId: activityId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist = res.data.records
      this.userDialogVisible = true
      this.$message.success('获取活动成员成功！')
      this.activityId = activityId
      console.log(this.activityId)
      console.log(this.userlist)
    },
    async lookUser2(activityId) {
      const { data: res } = await this.$http.get('user/searchActivityMemberWaitStatue', { params: { query: '', current: 1, size: 5, activityId: activityId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist2 = res.data.records
      this.userDialogVisible2 = true
      this.$message.success('获取待审核活动成员成功！')
      this.activityId2 = activityId
      console.log(this.activityId2)
      console.log(this.userlist2)
    },
    async lookUser3(assId) {
      const { data: res } = await this.$http.get('', { params: { query: '', current: 1, size: 5, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist3 = res.data.records
      this.userDialogVisible3 = true
      this.$message.success('获取审核未通过活动成员成功！')
      console.log(this.userlist3)
    }
    // async signActivity(activityId) {
    //   const { data: res } = await this.$http.get('user/registerActivity', { params: { activityId: activityId, userId: this.$root.USER.userId } })
    //   if (res.code === 201) return this.$message.error(res.data.提示)
    //   console.log(res)
    //   this.$message.success('活动报名成功！')
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
