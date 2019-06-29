<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style type="text/css">
	.el-menu-item-group__title {
		padding: 0;
	}
	.el-submenu .el-menu-item {
		padding-left: 48px!important;
		font-size: 12px;
	}
	.el-submenu__title {
		background: #f8f8f8;
	}
	.el-col-22 {
		width: auto;
	}
	.el-tabs__header {
		margin: 0;
	}
</style>
