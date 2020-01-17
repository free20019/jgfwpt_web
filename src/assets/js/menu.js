export function systemMenuList() {
  return [
    { id: 'zdfx', title: '终端分析系统', icon: 'icon-kefu', href: '' },
    // {
    //   id: "qyhj",
    //   title: "企业函件管理",
    //   icon: "icon-peoplelist",
    //   href: ""
    // },
    // { id: "gdxt", title: "工单管理系统", icon: "icon-mail", href: "" },
    { id: 'wxgl', title: '维修管理系统', icon: 'icon-label', href: '' },
    { id: 'dldd', title: '运力调度管理', icon: 'icon-find', href: '' },
    { id: 'fwpt', title: '服务平台管理', icon: 'icon-monitor', href: '' },
    { id: 'hyyx', title: '行业运行情况', icon: 'icon-taxi', href: '' },
    { id: 'sjdj', title: '运政数据接入', icon: 'icon-report', href: '' },
    { id: 'zffw', title: '支付服务', icon: 'icon-form', href: '' }
    // {id:'swxc', title:'导航屏升级', icon: 'icon-consultation', href: ''}
  ]
}

export function childrenMenuList() {
  return {
    zdfx: [
      { id: 'zjgz', title: '主机故障', icon: 'icon-gzxx', href: '/zdfx/zjgz' },
      {
        id: 'zdyc',
        title: '终端异常告警',
        icon: 'icon-zdxx',
        href: '/zdfx/zdyc'
      },
      {
        id: 'whltj',
        title: '完好率统计',
        icon: 'icon-tjxx',
        href: '/zdfx/whltj'
      },
      {
        id: 'clgl',
        title: '车辆管理',
        icon: 'icon-manage',
        fullPath: '/zdfx/clgl',
        children: [
          {
            id: 'zxcltj',
            title: '在线车辆统计',
            icon: 'icon-tjxx',
            href: '/zdfx/clgl/zxcltj'
          },
          {
            id: 'wsxclcx',
            title: '未上线车辆查询',
            icon: 'icon-cxxx',
            href: '/zdfx/clgl/wsxclcx'
          },
          {
            id: 'wyysjcl',
            title: '无营运数据车辆',
            icon: 'icon-cxxx',
            href: '/zdfx/clgl/wyysjcl'
          },
          {
            id: 'wqdqt',
            title: '无签到签退',
            icon: 'icon-cxxx',
            href: '/zdfx/clgl/wqdqt'
          }
        ]
      },
      {
        id: 'gsglysjhgl',
        title: '公司管理员手机号管理',
        icon: 'icon-wxxx',
        href: '/zdfx/gsglysjhgl'
      },
      // {
      //   id: "spyc",
      //   title: "视频异常",
      //   icon: "icon-ycxx",
      //   href: "/zdfx/spyc"
      // },
      {
        id: 'spyw',
        title: '视频异常巡检',
        icon: 'icon-xcxx',
        href: '/zdfx/spyw'
      },
      {
        id: 'wxgdcx',
        title: '维修工单',
        icon: 'icon-wxxx',
        href: '/zdfx/wxgdcx'
      },
      {
        id: 'zjgzlsjl',
        title: '主机故障历史记录',
        icon: 'icon-lsxx',
        href: '/zdfx/zjgzlsjl'
      },
      {
        id: 'ofdxcl',
        title: '偶发掉线车辆',
        icon: 'icon-manage',
        fullPath: '/zdfx/ofdxcl',
        children: [
          {
            id: 'ofdxclcx',
            title: '偶发掉线车辆查询',
            icon: 'icon-cxxx',
            href: '/zdfx/ofdxcl/ofdxclcx'
          },
          {
            id: 'ofdxcltj',
            title: '偶发掉线车辆统计',
            icon: 'icon-tjxx',
            href: '/zdfx/ofdxcl/ofdxcltj'
          }
        ]
      },
      {
        id: 'zdqy',
        title: '重点区域',
        icon: 'icon-manage',
        fullPath: '/zdfx/zdqy',
        children: [
          {
            id: 'zdqygl',
            title: '重点区域管理',
            icon: 'icon-manage',
            href: '/zdfx/zdqy/zdqygl'
          },

          {
            id: 'zdqyclslssfx',
            title: '区域车辆数量实时分析',
            icon: 'icon-cxxx',
            href: '/zdfx/zdqy/zdqyclslssfx'
          },
          {
            id: 'zdqyclslybb',
            title: '区域车辆数量月报表',
            icon: 'icon-cxxx',
            href: '/zdfx/zdqy/zdqyclslybb'
          },
          {
            id: 'zdqyclslbnbb',
            title: '区域车辆数量半年报表',
            icon: 'icon-cxxx',
            href: '/zdfx/zdqy/zdqyclslbnbb'
          },
          {
            id: 'zdqyclslnbb',
            title: '区域车辆数量年报表',
            icon: 'icon-cxxx',
            href: '/zdfx/zdqy/zdqyclslnbb'
          },
          {
            id: 'zdjkqyczcslyj',
            title: '监控区域出租车数量预警',
            icon: 'icon-manage',
            href: '/zdfx/zdqy/zdjkqyczcslyj'
          },
          {
            id: 'ycczgctjcl',
            title: '异常处置过程添加处理',
            icon: 'icon-manage',
            href: '/zdfx/zdqy/ycczgctjcl'
          },
          {
            id: 'ycczbg',
            title: '异常处置报告',
            icon: 'icon-manage',
            href: '/zdfx/zdqy/ycczbg'
          }
        ]
      },
      {
        id: 'ycfx',
        title: '异常分析',
        icon: 'icon-manage',
        fullPath: '/zdfx/ycfx',
        children: [
          {
            id: 'ycsjbj',
            title: '异常数据查询',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/ycsjbj'
          },
          {
            id: 'nczcbylfx',
            title: '年出租车保有量分析',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/nczcbylfx'
          },
          {
            id: 'jjqycyyfx',
            title: '计价器异常营运分析',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/jjqycyyfx'
          },
          {
            id: 'yylcycfx',
            title: '营运里程异常分析',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/yylcycfx'
          },
          {
            id: 'yydcycfx',
            title: '营运单次异常分析',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/yydcycfx'
          },
          {
            id: 'ystp',
            title: '疑似套牌',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/ystp'
          },
          {
            id: 'yshc',
            title: '疑似黑车',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/yshc'
          },
          {
            id: 'zdclyywzsjts',
            title: '车辆营运违章数据推送',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/zdclyywzsjts'
          },
          {
            id: 'sjycgd',
            title: '数据异常工单',
            icon: 'icon-cxxx',
            href: '/zdfx/ycfx/sjycgd'
          },
          {
            id: 'zdclyywzjc',
            title: '重点车辆营运违章稽查',
            icon: 'icon-manage',
            href: '/zdfx/ycfx/zdclyywzjc'
          }
        ]
      },
      {
        id: 'sjzl',
        title: '数据质量',
        icon: 'icon-manage',
        fullPath: '/zdfx/sjzl',
        children: [
          {
            id: 'ycsjbjzgbb',
            title: '异常数据报警整改报表',
            icon: 'icon-cxxx',
            href: '/zdfx/sjzl/ycsjbjzgbb'
          },
          {
            id: 'sjzlzb',
            title: '数据质量周报',
            icon: 'icon-tjxx',
            href: '/zdfx/sjzl/sjzlzb'
          },
          {
            id: 'sjzlyb',
            title: '数据质量月报',
            icon: 'icon-tjxx',
            href: '/zdfx/sjzl/sjzlyb'
          },
          {
            id: 'sjzlbnb',
            title: '数据质量半年报',
            icon: 'icon-tjxx',
            href: '/zdfx/sjzl/sjzlbnb'
          },
          {
            id: 'sjzlnb',
            title: '数据质量年报',
            icon: 'icon-tjxx',
            href: '/zdfx/sjzl/sjzlnb'
          }
        ]
      }
    ],
    qyhj: [
      {
        id: 'hjtj',
        title: '函件添加',
        icon: 'el-icon-plus',
        href: '/qyhj/hjtj'
      },
      { id: 'hjfs', title: '函件发送', icon: 'icon-fsxx', href: '/qyhj/hjfs' },
      { id: 'hjcx', title: '函件查询', icon: 'icon-cxxx', href: '/qyhj/hjcx' },
      { id: 'hjsh', title: '函件审核', icon: 'icon-shxx', href: '/qyhj/hjsh' },
      { id: 'hjfw', title: '函件服务', icon: 'icon-kefu', href: '/qyhj/hjfw' },
      {
        id: 'hjfwtj',
        title: '函件服务统计',
        icon: 'icon-tjxx',
        href: '/qyhj/hjfwtj'
      },
      {
        id: 'btclgl',
        title: '报停车辆管理',
        icon: 'icon-manage',
        href: '/qyhj/btclgl'
      },
      {
        id: 'btcltj',
        title: '报停车辆统计',
        icon: 'icon-tjxx',
        href: '/qyhj/btcltj'
      }
    ],
    gdxt: [
      { id: 'gdpf', title: '工单派发', icon: 'icon-pfxx', href: '/gdxt/gdpf' },
      {
        id: 'gdgl',
        title: '工单管理',
        icon: 'icon-manage',
        href: '/gdxt/gdgl'
      },
      { id: 'gdtj', title: '工单统计', icon: 'icon-tjxx', href: '/gdxt/gdtj' }
    ],
    wxgl: [
      {
        id: 'wxzlbg',
        title: '维修质量报告',
        icon: 'icon-form',
        href: '/wxgl/wxzlbg'
      },
      {
        id: 'wxjlcx',
        title: '维修记录查询',
        icon: 'icon-cxxx',
        href: '/wxgl/wxjlcx'
      },
      {
        id: 'wxjltj',
        title: '维修记录统计',
        icon: 'icon-tjxx',
        href: '/wxgl/wxjltj'
      }
    ],
    dldd: [
      {
        id: 'dlddcx',
        title: '运力调度查询',
        icon: 'icon-cxxx',
        href: '/dldd/dlddcx'
      },
      {
        id: 'dlddtj',
        title: '运力调度统计',
        icon: 'icon-tjxx',
        href: '/dldd/dlddtj'
      }
    ],
    fwpt: [
      {
        id: 'qyfzxcx',
        title: '企业分中心查询',
        icon: 'icon-cxxx',
        href: '/fwpt/qyfzxcx'
      },
      {
        id: 'qyfzxtj',
        title: '企业分中心统计',
        icon: 'icon-tjxx',
        href: '/fwpt/qyfzxtj'
      },
      {
        id: 'scfzxcx',
        title: '手持分中心查询',
        icon: 'icon-cxxx',
        href: '/fwpt/scfzxcx'
      },
      {
        id: 'scfzxtj',
        title: '手持分中心统计',
        icon: 'icon-tjxx',
        href: '/fwpt/scfzxtj'
      },
      {
        id: 'wxglcx',
        title: '维修管理查询',
        icon: 'icon-cxxx',
        href: '/fwpt/wxglcx'
      },
      {
        id: 'wxgltj',
        title: '维修管理统计',
        icon: 'icon-tjxx',
        href: '/fwpt/wxgltj'
      },
      {
        id: 'wazcx',
        title: '终端未安装查询',
        icon: 'icon-cxxx',
        href: '/fwpt/wazcx'
      },
      {
        id: 'aztj',
        title: '安装情况统计',
        icon: 'icon-tjxx',
        href: '/fwpt/aztj'
      },
      {
        id: 'ydaz',
        title: '月度安装分析',
        icon: 'icon-fxxx',
        href: '/fwpt/ydaz'
      },
      {
        id: 'spgl',
        title: '审批管理',
        icon: 'icon-manage',
        fullPath: '/fwpt/spgl',
        children: [
          {
            id: 'clzrsp',
            title: '车辆转入审批',
            icon: 'icon-shxx',
            href: '/fwpt/spgl/clzrsp'
          },
          {
            id: 'cpbgsp',
            title: '车牌号变更审批',
            icon: 'icon-shxx',
            href: '/fwpt/spgl/cpbgsp'
          },
          {
            id: 'cpbtsp',
            title: '车辆报停审批',
            icon: 'icon-shxx',
            href: '/fwpt/spgl/cpbtsp'
          },
          {
            id: 'clzcsp',
            title: '车辆转出审批',
            icon: 'icon-shxx',
            href: '/fwpt/spgl/clzcsp'
          },
          {
            id: 'sjjrsp',
            title: '数据接入审批',
            icon: 'icon-shxx',
            href: '/fwpt/spgl/sjjrsp'
          },
          {
            id: 'clzrtj',
            title: '车辆转入统计',
            icon: 'icon-tjxx',
            href: '/fwpt/spgl/clzrtj'
          },
          {
            id: 'cphbgtj',
            title: '车牌号变更统计',
            icon: 'icon-tjxx',
            href: '/fwpt/spgl/cphbgtj'
          },
          {
            id: 'btcltj',
            title: '报停车辆统计',
            icon: 'icon-tjxx',
            href: '/fwpt/spgl/btcltj'
          },
          {
            id: 'clzctj',
            title: '车辆转出统计',
            icon: 'icon-tjxx',
            href: '/fwpt/spgl/clzctj'
          }
        ]
      },
      {
        id: 'hcgl',
        title: '回场管理',
        icon: 'icon-manage',
        fullPath: '/fwpt/hcgl',
        children: [
          {
            id: 'hcclcx',
            title: '回场车辆查询',
            icon: 'icon-cxxx',
            href: '/fwpt/hcgl/hcclcx'
          },
          {
            id: 'hcbbtj',
            title: '回场报表统计',
            icon: 'icon-tjxx',
            href: '/fwpt/hcgl/hcbbtj'
          },
          {
            id: 'washcclcx',
            title: '未按时回场车辆查询',
            icon: 'icon-cxxx',
            href: '/fwpt/hcgl/washcclcx'
          },
          {
            id: 'hcgssz',
            title: '回场公司设置',
            icon: 'icon-wxxx',
            href: '/fwpt/hcgl/hcgssz'
          },
          {
            id: 'hcqysz',
            title: '回场区域设置',
            icon: 'icon-wxxx',
            href: '/fwpt/hcgl/hcqysz'
          }
        ]
      }
    ],
    hyyx: [
      {
        id: 'dcyyqk',
        title: '单车营运情况',
        icon: 'icon-qkxx',
        href: '/hyyx/dcyyqk'
      },
      {
        id: 'hyyyqk',
        title: '行业营运情况',
        icon: 'icon-qkxx',
        href: '/hyyx/hyyyqk'
      },
      {
        id: 'hypjyxqk',
        title: '行业平均运行情况',
        icon: 'icon-qkxx',
        href: '/hyyx/hypjyxqk'
      },
      {
        id: 'qyclyyqk',
        title: '企业车辆营运情况',
        icon: 'icon-qkxx',
        href: '/hyyx/qyclyyqk'
      },
      {
        id: 'jsysrqk',
        title: '驾驶员收入情况',
        icon: 'icon-qkxx',
        href: '/hyyx/jsysrqk'
      },
      {
        id: 'clyxph',
        title: '车辆运行排行',
        icon: 'icon-phxx',
        href: '/hyyx/clyxph'
      },
      {
        id: 'ylxqrd',
        title: '运力需求热点',
        icon: 'icon-rdxx',
        href: '/hyyx/ylxqrd'
      },
      {
        id: 'dcrdod',
        title: '打车热点OD分析',
        icon: 'icon-fxxx',
        fullPath: '/hyyx/dcrdod',
        children: [
          {
            id: 'odyysj',
            title: 'OD营运数据分析',
            icon: 'icon-fxxx',
            href: '/hyyx/dcrdod/odyysj'
          },
          {
            id: 'odlxtj',
            title: 'OD流向统计',
            icon: 'icon-tjxx',
            href: '/hyyx/dcrdod/odlxtj'
          },
          {
            id: 'odlxt',
            title: 'OD流向图',
            icon: 'icon-kefu',
            href: '/hyyx/dcrdod/odlxt'
          }
        ]
      },
      {
        id: 'yjtfwz',
        title: '夜间停放位置分析',
        icon: 'icon-fxxx',
        href: '/hyyx/yjtfwz'
      },
      {
        id: 'dcxqrdwz',
        title: '打车需求热点位置分析',
        icon: 'icon-fxxx',
        href: '/hyyx/dcxqrdwz'
      },
      {
        id: 'cllxwz',
        title: '车辆流向位置分析',
        icon: 'icon-fxxx',
        href: '/hyyx/cllxwz'
      },
      {
        id: 'jsywftj',
        title: '驾驶员违法统计',
        icon: 'icon-tjxx',
        href: '/hyyx/jsywftj'
      },
      { id: 'tscx', title: '投诉查询', icon: 'icon-cxxx', href: '/hyyx/tscx' },
      {
        id: 'yxzbzxcl',
        title: '运行中不在线车辆',
        icon: 'icon-cxxx',
        href: '/hyyx/yxzbzxcl'
      },
      {
        id: 'yxzbzxcltj',
        title: '运行中不在线车辆统计',
        icon: 'icon-tjxx',
        href: '/hyyx/yxzbzxcltj'
      },
      {
        id: 'sjqdqtcx',
        title: '司机签到签退查询',
        icon: 'icon-cxxx',
        href: '/hyyx/sjqdqtcx'
      },
      {
        id: 'zpsj',
        title: '抓拍数据',
        icon: 'icon-sjxx',
        fullPath: '/hyyx/zpsj',
        children: [
          {
            id: 'zpsjcx',
            title: '抓拍数据查询',
            icon: 'icon-cxxx',
            href: '/hyyx/zpsj/zpsjcx'
          },
          {
            id: 'calltj',
            title: '场站流量统计',
            icon: 'icon-tjxx',
            href: '/hyyx/zpsj/calltj'
          },
          {
            id: 'rlltj',
            title: '日流量统计',
            icon: 'icon-tjxx',
            href: '/hyyx/zpsj/rlltj'
          },
          {
            id: 'fdlltj',
            title: '分段流量统计',
            icon: 'icon-tjxx',
            href: '/hyyx/zpsj/fdlltj'
          }
        ]
      }
    ],
    sjdj: [
      { id: 'clxx', title: '车辆信息', icon: 'icon-taxi', href: '/sjdj/clxx' },
      {
        id: 'jsyxx',
        title: '驾驶员信息',
        icon: 'icon-user',
        href: '/sjdj/jsyxx'
      },
      { id: 'gsxx', title: '公司信息', icon: 'icon-gsxx', href: '/sjdj/gsxx' },
      { id: 'jbxx', title: '交班信息', icon: 'icon-jbxx', href: '/sjdj/jbxx' },
      {
        id: 'fwzlpt',
        title: '服务质量平台',
        icon: 'icon-kefu',
        href: '/sjdj/fwzlpt'
      }
    ],
    zffw: [
      {
        id: 'zfmxcx',
        title: '支付明细查询',
        icon: 'icon-cxxx',
        href: '/zffw/zfmxcx'
      },
      {
        id: 'zfzdtf',
        title: '支付账单统计',
        icon: 'icon-tjxx',
        href: '/zffw/zfzdtf'
      }
    ]
  }
}
