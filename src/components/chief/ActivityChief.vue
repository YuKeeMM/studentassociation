<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团广场</el-breadcrumb-item>
      <el-breadcrumb-item>我管理的社团</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入活动名称" v-model="queryInfo.query" clearable @clear="getActivityListChief">
            <el-button slot="append" icon="el-icon-search" @click="getActivityListChief"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addActivityDialogVisible = true">添加活动</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="activitylistchief" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="活动名称" prop="activityName"></el-table-column>
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
            <el-tooltip effect="dark" content="查看成员" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="lookUser(scope.row.activityId)" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看待审核成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser2(scope.row.activityId)" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除活动" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="deleteActivity(scope.row.activityId)" size="small"></el-button>
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
    <!-- 新建活动 -->
    <el-dialog
      title="新建活动"
      :visible.sync="addActivityDialogVisible"
      width="80%"
      @close="addActivityDialogClosed">
      <el-form :model="addForm" :rules="addActivityRules" ref="addActivityRef" label-width="100px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="addForm.activityName"></el-input>
        </el-form-item>
        <el-form-item label="活动简介" prop="activityBrief">
          <el-input v-model="addForm.activityBrief"></el-input>
        </el-form-item>
        <el-form-item label="活动主题" prop="activityType">
          <el-input v-model="addForm.activityType"></el-input>
        </el-form-item>
        <el-form-item label="活动是否可以请假" prop="activityLeave">
          <el-input v-model="addForm.activityLeave"></el-input>
        </el-form-item>
        <el-form-item label="活动报名限制人数" prop="activityPeople">
          <el-input v-model="addForm.activityPeople"></el-input>
        </el-form-item>
        <el-form-item label="活动学分" prop="activityCredit">
          <el-input v-model="addForm.activityCredit"></el-input>
        </el-form-item>
        <el-form-item label='活动报名开始时间'>
          <el-date-picker  type="datetime" v-model="addForm.activitySignBeginTime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label='活动报名结束时间'>
          <el-date-picker  type="datetime" v-model="addForm.activitySignEndTime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label='活动开始时间'>
          <el-date-picker  type="datetime" v-model="addForm.activityBeginTime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label='活动结束时间'>
          <el-date-picker  type="datetime" v-model="addForm.activityEndTime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addActivityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addActivity()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看公告 -->
    <!-- <el-dialog
      title="公告"
      :visible.sync="noticeDialogVisible"
      width="50%">
      <el-table :data="noticelist" border stripe>
        <el-table-column label="公告名称" prop="noticeName"></el-table-column>
        <el-table-column label="公告简介" prop="noticeBrief"></el-table-column>
        <el-table-column label="社团名字" prop="assName"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyNoticeDialogVisible = true">修改公告</el-button>
        <el-button @click="deleteNotice()">删除公告</el-button>
        <el-button @click="noticeDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog> -->
    <!-- 修改公告 -->
    <!-- <el-dialog
      title="新修改公告"
      :visible.sync="modifyNoticeDialogVisible"
      width="40%"
      @close="modifyNoticeDialogClosed">
      <el-form :model="modifyForm" :rules="modifyNoticeRules" ref="modifyNoticeRef" label-width="100px">
        <el-form-item label="公告名称" prop="noticeName">
          <el-input v-model="modifyForm.noticeName"></el-input>
        </el-form-item>
        <el-form-item label="公告简介" prop="noticeBrief">
          <el-input v-model="modifyForm.noticeBrief"></el-input>
        </el-form-item>
        <el-form-item label="公告图片" prop="noticePicture">
          <el-input v-model="modifyForm.noticePicture"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyNoticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyNotice()">确 定</el-button>
      </span>
    </el-dialog> -->
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
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="踢出社团" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="outUser(scope.row.userId)"></el-button>
            </el-tooltip>
          </template>
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
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="审核通过" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="agree(scope.row.userId)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="审核未通过" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="disAgree(scope.row.userId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible2 = false">关 闭</el-button>
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
        size: 2,
        assId: this.$root.ASSOCIATION.assId
      },
      activitylistchief: [],
      total: 0,
      addActivityDialogVisible: false, // 新建活动界面
      addForm: {
        assId: this.$root.ASSOCIATION.assId,
        activityName: '',
        activityBrief: '',
        activityType: '',
        activityLeave: '',
        activityPeople: '',
        activityCredit: '',
        activitySignBeginTime: '',
        activitySignEndTime: '',
        activityBeginTime: '',
        activityEndTime: ''
      },
      addActivityRules: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        activityBrief: [
          { required: true, message: '请输入活动简介', trigger: 'blur' }
        ],
        activityType: [
          { required: true, message: '请输入活动主题', trigger: 'blur' }
        ],
        activityLeave: [
          { required: true, message: '请输入活动是否可以请假', trigger: 'blur' }
        ],
        activityPeople: [
          { required: true, message: '请输入活动报名限制人数', trigger: 'blur' }
        ],
        activityCredit: [
          { required: true, message: '请输入活动学分', trigger: 'blur' }
        ]
      },
      addActivitylist: [],
      noticeDialogVisible: false, // 公告界面的显示
      noticelist: [],
      modifyNoticeDialogVisible: false, // 修改公告界面
      modifyForm: {
        noticeName: '',
        noticeBrief: '',
        noticePicture: '',
        noticeId: ''
      },
      modifyNoticeRules: {
        noticeName: [
          { required: true, message: '请输入公告名称', trigger: 'blur' }
        ],
        noticeBrief: [
          { required: true, message: '请输入公告简介', trigger: 'blur' }
        ],
        noticePicture: [
          { required: true, message: '请输入公告图片', trigger: 'blur' }
        ]
      },
      userDialogVisible: false, // 活动成员界面的显示
      userlist: [],
      userDialogVisible2: false, // 活动待审核成员界面的显示
      userlist2: [],
      activityId: 0,
      activityId2: 0
    }
  },
  created() {
    this.getActivityListChief()
  },
  methods: {
    async getActivityListChief() {
      const { data: res } = await this.$http.get('user/searchManagementActivity', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.activitylistchief = res.data.records
      this.total = res.data.total
      this.$message.success('获取我管理的社团成功！')
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getActivityListChief()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getActivityListChief()
    },
    // 监听注册对话框的关闭事件
    addActivityDialogClosed () {
      this.$refs.addActivityRef.resetFields()
    },
    addActivity() {
      this.$refs.addActivityRef.validate(async valid => {
        if (!valid) return
        console.log(this.addForm)
        const { data: res } = await this.$http.get('activity/addActivity', { params: this.addForm })
        if (res.code === 201) return this.$message.error(res.data.提示)
        this.addActivityDialogVisible = false
        this.$message.success('新建活动成功！')
        console.log(res)
      })
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
    async outUser(userId) {
      const { data: res } = await this.$http.get('user/deleteActivityMember', { params: { userId: userId, activityId: this.activityId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    },
    async agree(userId) {
      const { data: res } = await this.$http.get('user/agreeActivityMember', { params: { userId: userId, activityId: this.activityId2 } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    },
    async disAgree(userId) {
      const { data: res } = await this.$http.get('user/disAgreeActivityMember', { params: { userId: userId, activityId: this.activityId2 } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    },
    async deleteActivity(activityId) {
      const { data: res } = await this.$http.get('activity/deleteActivity', { params: { activityId: activityId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
