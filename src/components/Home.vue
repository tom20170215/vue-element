<template>
    <el-row class="container">
        <!-- 头部 -->
        <el-col :span="24" class="topbar-wrap">
            <div class="topbar-logo topbar-btn">
                <a href="/"><img src="../assets/logo.png" alt=""></a>
            </div>
            <div class="topbar-logos">
                <a href="/"><img src="../assets/logotxt.png" alt=""></a>
            </div>
            <div class="topbar-title">
                <span>后台管理系统</span>
            </div>
            <div class="topbar-account">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo-inner">
                        <i class="iconfont icon-user"></i>{{nickname}}
                        <i class="iconfont icon-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div @click="jumpTo('/user/profile')"><span style="font-size:14px;color:#555;">个人信息</span></div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div @click="jumpTo('/user/changepwd')"><span style="font-size:14px;color:#555;">修改密码</span></div>
                        </el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
        <!-- 中间 -->
        <el-col :span="24" class="main">
            <!-- 左侧导航栏 -->
            <aside :class="{showSidebar: !collapsed}">
                <div @click.prevent="collapse" class="menu-toggle">
                    <i class="iconfont icon-menufold" v-show="!collapsed"></i>
                    <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
                </div>
                <!-- 导航菜单 -->
                <el-menu :default-active='defaultActiveIndex' router :collapse="collapsed" @select="handleSelect">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
                        <el-submenu v-if="!item.leaf" :index="index+''" :key="item.name">
                            <template slot="title">
                              <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>  
                            </template>
                            <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow">
                                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else-if="item.leaf && item.children && item.children.length" :index="item.children[0].path" :key="item.children[0].name">
                            <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>

            <!-- 右侧内容区 -->
            <section class="content-container">
                <div>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import bus from "../bus";
import API from "../api/api_user";
export default {
  name: "home",
  created() {
    bus.$on("setNickName", text => {
      this.nickname = text;
    });
    bus.$on('goto', url => {
      if (url === '/login') {
        localStorage.removeItem('access-user');
      }
      this.$router.push(url);
    });
    bus.$on('backIndex', url => {
      this.defaultActiveIndex = url;
    })
  },
  data() {
    return {
      defaultActiveIndex: "/dashboard",
      nickname: "",
      collapsed: false // 是否折叠
    };
  },
  methods: {
    handleSelect(index,indexPath) {
      this.defaultActiveIndex = index;

    },
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url);
    },
    logout() {
      let that = this;
      this.$confirm("确认退出吗", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          // 确认
          that.loading = true;
          API.logout()
            .then(
              function(result) {
                that.loading = false;
                localStorage.removeItem("access-user");
                that.$router.push("/login");
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 2000
              });
            });
        })
        .catch(() => {});
    },
    collapse() {
      this.collapsed = !this.collapsed;
    }
  },
  mounted() {
    let user = localStorage.getItem("access-user");
    if (user) {
      user = JSON.parse(user);
      this.nickname = user.nickname || "";
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0;
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logo img,
    .topbar-logos img {
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }
    .topbar-logos {
      float: left;
      width: 120px;
      line-height: 26px;
    }
    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      border-left: 1px solid #000;
      padding-left: 10px;
      span {
        font-size: 18px;
        color: #fff;
      }
    }
    .topbar-account {
      float: right;
      padding-right: 12px;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
    .menu-toggle {
      background: #4a5064;
      color: #fff;
      text-align: center;
      height: 26px;
      line-height: 30px;
    }
    aside {
      min-width: 50px;
      background: #333744;
      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .el-menu {
        width: 180px;
        height: 100%;
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-right: 0px;
        background-color: #333744;
        .el-submenu .el-submenu__title,
        .el-menu-item, {
          min-width: 60px;
          height: 46px;
          line-height: 46px;
          &:hover {
            background-color: #7ed2df;
          }
        }
      }
      .el-menu--collapse{
        width: 60px;
      }
    }
    .content-container{
        background: #fff;
        overflow-y: auto;
        padding: 10px;
        flex: 1;
        .content-wrapper{
            background-color: #fff;
            box-sizing: border-box;
        }
    }
  }
}
</style>
