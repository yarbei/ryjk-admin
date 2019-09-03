const menus = [
  { id: '0',
    label: '控制面板',
    path: '/',
    icon: 'fa fa-dashboard'
  },
  { id: '1',
    icon: 'fa fa-hospital-o',
    label: '医院管理',
    path: '/hospitalManagement',
    name: 'hospitalManagement'
  },
  { id: 'hzgl',
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
  { id: 'myGroup',
    icon: 'fa fa-circle-o',
    label: '我的工作组',
    path: '/myGroup',
    name: 'myGroup'
  },
  { id: 'gggl',
    icon: 'fa fa-bell-o',
    label: '公告管理',
    path: '/noticeManagement',
    name: 'noticeManagement' },
  { id: 'ggtgl',
    icon: 'fa fa-file-photo-o',
    label: '广告管理',
    path: '/posterManagement',
    name: 'posterManagement'
  },
  {
    id: '2',
    icon: 'fa fa-microchip',
    label: '账号/角色管理',
    submenu: [
      { id: 'accountManagement', path: '/accountManagement', label: '账号管理' },
      { id: 'role', path: '/role', label: '角色管理' },
      { id: 'account', path: '/account', label: '分配账号' }
    ]
  },
  {
    id: '3',
    icon: 'fa fa-bar-chart-o',
    label: '统计分析',
    submenu: [
      { id: 'tjfx1', path: '/jobAccount', label: '工作统计与分析' },
      { id: 'tjfx2', path: '/effect', label: '效果统计与分析' },
      { id: 'tjfx3', path: '/diseaseRisk', label: '疾病风险筛查统计与分析' }
    ]
  },
  { id: 'hygl',
    icon: 'el-icon-user-solid',
    label: '会员管理',
    path: '/member',
    name: 'member'
  },
  { id: 'ysgl',
    icon: 'el-icon-first-aid-kit',
    label: '医生管理',
    path: '/doctor',
    name: 'doctor'
  },
  { id: 'zzzz',
    icon: 'fa fa-circle-o',
    label: '资质证照',
    path: '/qualificationCertificate',
    name: 'qualificationCertificate'
  }
]
export default menus
