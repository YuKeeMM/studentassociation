<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/zucc2.jpg" alt="">
                <span class="el-header-write">学生社团系统（你好，管理员！）</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <!-- <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true">
                    <el-menu-item index="first">
                      <i class="el-icon-s-home"></i>
                      <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="association">
                        <template slot="title">
                        <i class="el-icon-trophy"></i>
                        <span>社团广场</span>
                        </template>
                        <el-menu-item index="association1">
                          <i class="el-icon-menu"></i>
                          <span>社团报名</span>
                        </el-menu-item>
                        <el-menu-item index="associationmy">
                          <i class="el-icon-menu"></i>
                          <span>我参加的社团</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="activity">
                        <template slot="title">
                        <i class="el-icon-ship"></i>
                        <span>活动广场</span>
                        </template>
                        <el-menu-item index="activity1">
                          <i class="el-icon-menu"></i>
                          <span>活动报名</span>
                        </el-menu-item>
                        <el-menu-item index="activitymy">
                          <i class="el-icon-menu"></i>
                          <span>我参加的活动</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="user">
                      <i class="el-icon-user"></i>
                      <span slot="title">个人信息</span>
                    </el-menu-item>
                </el-menu>
            </el-aside> -->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
