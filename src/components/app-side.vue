<template>
  <v-menu
    class="side-menu"
    :collapse="collapse"
    :default-active="defaultActive"
    :menus="menus"
    router
    :background-color="theme.backgroundColor"
    :text-color="theme.textColor"
    :active-text-color="theme.activeTextColor"
  ></v-menu>
</template>
<script type="text/javascript">
import VMenu from "./vmenu";
import menus from "./menus";

export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  components: {
    VMenu
  },
  data() {
    return {
      menus: menus,
      defaultActive: "home",
      test: "asdfasdf"
    };
  },
  watch: {
    $route() {
      this.setCurrentRoute()
    },
    s(n, o) {
      console.log('n')
      console.log(n)
      var Menus = JSON.parse(sessionStorage.getItem("loginUser"))
      this.menus = Menus.menu.map((v, i) => {
        v.id = 'x' + i
        return v
      })
    }
  },
  computed: {
    s() {
      return this.$store.state.status.status
    }
  },
  methods: {
    setCurrentRoute() {
      this.defaultActive = this.$route.name;
    }
  },
  created() {
    console.log(this.s)
    this.setCurrentRoute()
    var Menus = JSON.parse(sessionStorage.getItem("loginUser"))
    this.menus = Menus.menu.map((v, i) => {
      v.id = 'x' + i
      return v
    })
    console.log(Menus.menu)
  }
}
</script>



<style type="text/css">
.el-menu.side-menu {
  border-right: none;
}
.el-menu .fa {
  font-size: 18px;
  margin-right: 7px;
  display: inline-block;
  width: 23px;
  text-align: center;
}
.el-menu.side-menu .el-menu-item.is-active {
  color: #409eff;
  border-right: solid 2px #36c1fa;
  background: #eef3f5;
}
</style>
