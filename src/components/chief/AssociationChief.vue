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
      <!-- <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入社团名称" v-model="queryInfo.query" clearable @clear="getAssociateListChief">
            <el-button slot="append" icon="el-icon-search" @click="getAssociateListChief"></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <!-- 用户列表区域 -->
      <el-table :data="associatelistchief" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="社团名称" prop="assName"></el-table-column>
        <el-table-column label="社团简介" prop="assBrief"></el-table-column>
        <el-table-column label="社团总人数" prop="assTotal"></el-table-column>
        <el-table-column label="社团审核状态" prop="assStatus"></el-table-column>
        <el-table-column label="社团创建时间" prop="assCreateTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="新建公告" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="addNoticeDialogVisible = true" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看公告" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="lookNotic(scope.row.assId)" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看成员" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="lookUser(scope.row.assId)" size="small"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看待审核成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser2(scope.row.assId)" size="small"></el-button>
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
    <!-- 新建公告 -->
    <el-dialog
      title="新建公告"
      :visible.sync="addNoticeDialogVisible"
      width="50%"
      @close="addNoticeDialogClosed">
      <el-form :model="addForm" :rules="addNoticeRules" ref="addNoticeRef" label-width="100px">
        <el-form-item label="公告名称" prop="noticeName">
          <el-input v-model="addForm.noticeName"></el-input>
        </el-form-item>
        <el-form-item label="公告简介" prop="noticeBrief">
          <el-input v-model="addForm.noticeBrief"></el-input>
        </el-form-item>
        <el-form-item label="公告图片" prop="noticePicture">
          <el-input v-model="addForm.noticePicture"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNoticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看公告 -->
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
        <el-button @click="modifyNoticeDialogVisible = true">修改公告</el-button>
        <el-button @click="deleteNotice()">删除公告</el-button>
        <el-button @click="noticeDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 修改公告 -->
    <el-dialog
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
    </el-dialog>
    <!-- 社团成员栏 -->
    <el-dialog
      title="社团成员"
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
    <!-- 社团待审核成员栏 -->
    <el-dialog
      title="待审核成员"
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
        userId: this.$root.USER.userId
      },
      associatelistchief: [],
      total: 0,
      addNoticeDialogVisible: false, // 新建公告界面
      addForm: {
        noticeName: '',
        noticeBrief: '',
        noticePicture: '',
        assId: ''
      },
      addNoticeRules: {
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
      addnoticelist: [],
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
      userDialogVisible: false, // 社团成员界面的显示
      userlist: [],
      userDialogVisible2: false, // 社团待审核成员界面的显示
      userlist2: []
    }
  },
  created() {
    this.getAssociateListChief()
  },
  methods: {
    async getAssociateListChief() {
      const { data: res } = await this.$http.get('user/searchManagementAssociation', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('您还' + res.data.提示)
      this.associatelistchief = res.data.records
      this.$root.ASSOCIATION.assId = res.data.records[0].assId
      this.addForm.assId = res.data.records[0].assId
      this.total = res.data.total
      this.$message.success('获取我管理的社团成功！')
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      // 重新获取数据
      this.getAssociateListChief()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.current = newPage
      this.getAssociateListChief()
    },
    async quitAssociation(assId) {
      const { data: res } = await this.$http.get('', { params: { assId: assId, userId: this.$root.USER.userId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      console.log(res)
      this.$message.success(res.data.提示)
    },
    async lookNotic(assId) {
      const { data: res } = await this.$http.get('notice/searchAllNotice', { params: { assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.noticelist = res.data.notices
      this.modifyForm.noticeId = res.data.notices[0].noticeId
      this.noticeDialogVisible = true
      this.$message.success('获取社团公告成功！')
    },
    async lookUser(assId) {
      const { data: res } = await this.$http.get('user/searchManagementAssociationMember', { params: { query: '', current: 1, size: 2, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist = res.data.records
      this.userDialogVisible = true
      this.$message.success('获取社团成员成功！')
      console.log(this.userlist)
    },
    async lookUser2(assId) {
      const { data: res } = await this.$http.get('user/searchAssMemberWaitStatue', { params: { query: '', current: 1, size: 2, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist2 = res.data.records
      this.userDialogVisible2 = true
      this.$message.success('获取待审核社团成员成功！')
      console.log(this.userlist2)
    },
    // 监听注册对话框的关闭事件
    addNoticeDialogClosed () {
      this.$refs.addNoticeRef.resetFields()
    },
    addNotice() {
      this.$refs.addNoticeRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('notice/addNotice', { params: this.addForm })
        if (res.code === 201) return this.$message.error(res.data.提示)
        this.addNoticeDialogVisible = false
        this.$message.success('新建社团公告成功！')
        console.log(res)
      })
    },
    modifyNoticeDialogClosed () {
      this.$refs.modifyNoticeRef.resetFields()
    },
    modifyNotice() {
      this.$refs.modifyNoticeRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('notice/modifyNotice', { params: this.modifyForm })
        if (res.code === 201) return this.$message.error(res.data.提示)
        this.modifyNoticeDialogVisible = false
        this.$message.success('修改社团公告成功！')
        console.log(res)
      })
    },
    async deleteNotice() {
      console.log(this.modifyForm.noticeId)
      const { data: res } = await this.$http.get('notice/deleteNotice', { params: { noticeId: this.modifyForm.noticeId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.noticelist = res.data.notices
      this.noticeDialogVisible = true
      this.$message.success('删除社团公告成功！')
    },
    async outUser(userId) {
      const { data: res } = await this.$http.get('user/deleteAssMember', { params: { userId: userId, assId: this.addForm.assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    },
    async agree(userId) {
      const { data: res } = await this.$http.get('user/agreeAssMember', { params: { userId: userId, assId: this.addForm.assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    },
    async disAgree(userId) {
      const { data: res } = await this.$http.get('user/disAgreeAssMember', { params: { userId: userId, assId: this.addForm.assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
