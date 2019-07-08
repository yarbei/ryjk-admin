import Vue from 'vue'

const menus = [
  { id: '0', label: '控制面板', path: '/', icon: 'fa fa-dashboard' },
  {
    id: 'hzgl',
    icon: 'fa fa-circle-o',
    label: '患者管理',
    path: '/p-data-table',
    name: 'p-data-table'
  },
  {
    id: 'dbsx',
    icon: 'fa fa-paper-plane',
    label: '待办事项',
    submenu: [
      { id: 'dbsx1', path: '/waitVisit', name: 'waitVisit', label: '待随访', count: 4 },
      { id: 'dbsx2', path: '/earlyWarning', name: 'earlyWarning', label: '体征预警提醒', count: 3 },
      { id: 'dbsx3', path: '/userException', name: 'userException', label: '用户行为异常' }
    ]
  },
  {
    id: 'tjfx',
    icon: 'fa fa-bar-chart-o',
    label: '统计分析',
    submenu: [
      { id: 'tjfx1', path: '/jobAccount', label: '工作统计与分析' },
      { id: 'tjfx2', path: '/effect', label: '效果统计与分析' },
      { id: 'tjfx3', path: '/diseaseRisk', label: '疾病风险筛查统计与分析' }
    ]
  },
  {
    id: 'qxgl',
    icon: 'fa fa-microchip',
    label: '权限管理',
    submenu: [
      { id: 'qxgl1', path: '/404', label: '添加/删除账号' },
      { id: 'qxgl2', path: '/authManagement', label: '账号权限管理' }
    ]
  },
  {
    id: 'yygl',
    icon: 'fa fa-hospital-o',
    label: '医院管理',
    submenu: [
      { id: 'yygl1', path: '/hospitalManagement', label: '全部医院列表' },
      { id: 'ksgl1', path: '/departManagement', label: '科室管理' }
    ]
  },
  { id: 'gggl', icon: 'fa fa-bell-o', label: '公告管理', path: '/noticeManagement', name: 'noticeManagement' },
  { id: 'ggtgl', icon: 'fa fa-file-photo-o', label: '广告管理', path: '/posterManagement', name: 'posterManagement' }
]
export default menus
