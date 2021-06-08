<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/zucc2.jpg" alt="">
                <span class="el-header-write">学生社团管理系统2</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    unique-opened :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true">
                    <!-- 一级菜单(index只接受字符串，要把数值变为字符串在后面加一个''空字符串就好) -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                        <i :class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-opportunity',
        101: 'el-icon-s-order',
        102: 'el-icon-s-promotion',
        145: 'el-icon-s-home'
      },
      // 是否折叠
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.console.error(res.meta.status)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮， 切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #373d41;
    display: flex;// 弹性布局
    justify-content: space-between;// 左右贴边对齐
    padding-left: 0px;// 左内边距为0
    align-items: center;// 居中
    color: #fff;
    font-size: 20px;
    > div{// 文字部分
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
      border-right: none;
    }
}
.el-main{
    background-color: #EAEDF1;
}
.home-container{
    height: 100%;
}

.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
