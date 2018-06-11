/**
 * 合成后的所有 API 集合
 */
const ApiConf = {
  user: {
    // getway 网关子系统名称
    $getway: 'user',

    // --------------------------------------------------
    // 菜单相关
    // --------------------------------------------------
    menuAll: '/menu/all', // get
    menuLoadMenusByUser: '/menu/loadMenusByUser', // post

    // --------------------------------------------------
    // 登录接口
    // --------------------------------------------------
    login: '/login' // post
  },
  shop: {
    // getway 网关子系统名称
    $getway: ''
  },
  report: {
    // getway 网关子系统名称
    $getway: 'report',

    // --------------------------------------------------
    // 报表相关接口
    // --------------------------------------------------
    getUserInfo: '/user/getMenu.htm',
    getIncomeLedgerList: '/incomeStatistics/findIncomeStatistics',
    getStoreIncomeList: '/incomeStatistics/findShopIncomeStatistics', // 门店收入统计
    getShopTimeIncomeList: '/incomeStatistics/findShopTimeslotIncomeStatistics', // 查询门店收入统计按时间段汇总
    getRevenueList: '/revenueStatistics/findRevenueStatistics', // 营收统计
    getRevenueShopList: '/revenueStatistics/findShopRevenueStatistics', // 门店营收统计
    getRevenueTimeList: '/revenueStatistics/findShopTimeslotRevenueStatistics' // 门店时间段营收统计
  },
  config: {
    $getway: 'config',
    upload: '/img/uploadImgFile' // 文件上传: post
  }
};

// 调用范例
// post({ getway: ApiConf.user.$getway, api: ApiConf.user.login }, {username:'', password:''});

export default ApiConf;
