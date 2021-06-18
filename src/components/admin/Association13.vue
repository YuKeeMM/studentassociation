<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
        <el-col :span="4">
          <el-button type="primary" @click="addAssDialogVisible = true">添加社团</el-button>
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
              <el-button type="success" icon="el-icon-s-claim" @click="lookNotic(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <!-- <el-tooltip effect="dark" content="报名" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="signAssociation(scope.row.assId)"></el-button>
            </el-tooltip> -->
            <el-tooltip effect="dark" content="查看社长" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="lookChief(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="设置社长" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="setChief1(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看成员" placement="top">
              <el-button type="primary" icon="el-icon-s-custom" @click="lookUser(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看待审核成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser2(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看审核未通过成员" placement="top">
              <el-button type="danger" icon="el-icon-s-custom" @click="lookUser3(scope.row.assId)" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除社团" placement="top">
              <el-button type="success" icon="el-icon-s-custom" @click="deleteAss(scope.row.assId)" size="mini"></el-button>
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
    <!-- 查看社长 -->
    <el-dialog
      title="查看社长"
      :visible.sync="lookChiefDialogVisible"
      width="50%">
      <el-table :data="lookchieflist1" border stripe>
        <el-table-column label="用户编号" prop="userId"></el-table-column>
        <el-table-column label="用户名称" prop="userName"></el-table-column>
        <el-table-column label="用户密码" prop="userPwd"></el-table-column>
        <el-table-column label="用户电话" prop="userPhone"></el-table-column>
        <el-table-column label="用户学分" prop="userCredit"></el-table-column>
        <el-table-column label="用户身份" prop="userRole"></el-table-column>
        <el-table-column label="用户创建时间" prop="userCreateTime"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookChiefDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 社长设置 -->
    <el-dialog
      title="社长设置"
      :visible.sync="setChiefDialogVisible"
      width="50%"
      @close="setChiefDialogClosed">
      <el-form :model="setChiefForm" :rules="setChiefRules" ref="setChiefRef" label-width="100px">
        <el-form-item label="用户编号" prop="userId">
          <el-input v-model="setChiefForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="社团编号" prop="assId">
          <el-input v-model="setChiefForm.assId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setchiefDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setChief()">确 定</el-button>
      </span>
    </el-dialog>
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
    <!-- 新建活动 -->
    <el-dialog
      title="新建社团"
      :visible.sync="addAssDialogVisible"
      width="80%"
      @close="addAssDialogClosed">
      <el-form :model="addForm" :rules="addAssRules" ref="addAssRef" label-width="100px">
        <el-form-item label="社团名称" prop="assName">
          <el-input v-model="addForm.assName"></el-input>
        </el-form-item>
        <el-form-item label="社团简介" prop="assBrief">
          <el-input v-model="addForm.assBrief"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAssDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAss()">确 定</el-button>
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
    <!-- 社团待审核成员栏 -->
    <el-dialog
      title="社团待审核成员"
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
    <!-- 社团审核未通过成员栏 -->
    <el-dialog
      title="社团审核未通过成员"
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
      associatelist: [],
      total: 0,
      signlist: [],
      noticeDialogVisible: false, // 公告界面的显示
      noticelist: [],
      lookChiefDialogVisible: false,
      lookchieflist1: [],
      setChiefDialogVisible: false, // 社长设置界面
      setChiefForm: {
        userId: '',
        assId: ''
      },
      setChiefRules: {
        userId: [
          { required: true, message: '请输入用户编号', trigger: 'blur' }
        ]
      },
      addAssDialogVisible: false, // 新建社团界面
      addForm: {
        assName: '',
        assBrief: ''
      },
      addAssRules: {
        assName: [
          { required: true, message: '请输入社团名称', trigger: 'blur' }
        ],
        assBrief: [
          { required: true, message: '请输入社团简介', trigger: 'blur' }
        ]
      },
      userDialogVisible: false, // 社团成员界面的显示
      userlist: [],
      userDialogVisible2: false, // 社团待审核成员界面的显示
      userlist2: [],
      userDialogVisible3: false, // 社团审核未通过成员界面的显示
      userlist3: []
    }
  },
  created() {
    this.getAssociateList()
  },
  methods: {
    // 只显示“审核通过的社团”
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
    // async signAssociation(assId) {
    //   const { data: res } = await this.$http.get('user/registerAssociation', { params: { assId: assId, userId: this.$root.USER.userId } })
    //   if (res.code === 201) return this.$message.error(res.data.提示)
    //   console.log(res)
    //   this.$message.success('社团报名成功！')
    // },
    async lookNotic(assId) {
      const { data: res } = await this.$http.get('notice/searchAllNotice', { params: { assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.noticelist = res.data.notices
      this.noticeDialogVisible = true
      this.$message.success('获取社团公告成功！')
    },
    // 监听注册对话框的关闭事件
    addAssDialogClosed () {
      this.$refs.addAssRef.resetFields()
    },
    addAss() {
      this.$refs.addAssRef.validate(async valid => {
        if (!valid) return
        console.log(this.addForm)
        const { data: res } = await this.$http.get('association/add', { params: this.addForm })
        if (res.code === 201) return this.$message.error(res.data.提示)
        this.addAssDialogVisible = false
        this.$message.success('新建社团成功！')
        console.log(res)
      })
    },
    async lookChief(assId) {
      const { data: res } = await this.$http.get('association/searchPresident', { params: { assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.lookchieflist1 = [res.data.President]
      this.lookChiefDialogVisible = true
      this.$message.success('获取社长成功！')
      console.log(this.lookchieflist1)
    },
    setChief1(assId) {
      this.setChiefForm.assId = assId
      this.setChiefDialogVisible = true
    },
    // 监听注册对话框的关闭事件
    setChiefDialogClosed () {
      this.$refs.setChiefRef.resetFields()
    },
    setChief() {
      this.$refs.setChiefRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('association/ModifyPresident', { params: this.setChiefForm })
        if (res.code === 201) return this.$message.error(res.data.提示)
        this.setChiefDialogVisible = false
        this.$message.success(res.data.提示)
        console.log(res)
      })
    },
    async lookUser(assId) {
      const { data: res } = await this.$http.get('user/searchManagementAssociationMember', { params: { query: '', current: 1, size: 5, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist = res.data.records
      this.userDialogVisible = true
      this.$message.success('获取社团成员成功！')
      console.log(this.userlist)
    },
    async lookUser2(assId) {
      const { data: res } = await this.$http.get('user/searchAssMemberWaitStatue', { params: { query: '', current: 1, size: 5, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist2 = res.data.records
      this.userDialogVisible2 = true
      this.$message.success('获取待审核社团成员成功！')
      console.log(this.userlist2)
    },
    async lookUser3(assId) {
      const { data: res } = await this.$http.get('user/searchAssMemberNotStatue', { params: { query: '', current: 1, size: 5, assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.userlist3 = res.data.records
      this.userDialogVisible3 = true
      this.$message.success('获取审核未通过社团成员成功！')
      console.log(this.userlist3)
    },
    async deleteAss(assId) {
      const { data: res } = await this.$http.get('association/RemoveAssociation', { params: { assId: assId } })
      if (res.code === 201) return this.$message.error(res.data.提示)
      this.$message.success(res.data.提示)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
