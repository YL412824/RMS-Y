export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './Login/Login' },
      { path: '/user/register', component: './Login/Register' },
      { path: '/user/register-result', component: './Login/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['administrator', 'admin', 'user', 'test', 'guest'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/workplace' },
      {
        path: '/result',
        routes: [
          // result
          { path: '/result/success', component: './Result/Success' },
          { path: '/result/fail', component: './Result/Error' },
        ],
      },
      {
        path: '/exception',
        routes: [
          // exception
          { path: '/exception/403', component: './Exception/403' },
          { path: '/exception/404', component: './Exception/404' },
          { path: '/exception/500', component: './Exception/500' },
          { path: '/exception/trigger', component: './Exception/TriggerException' },
        ],
      },
      {
        path: '/account',
        routes: [
          {
            path: '/account/center',
            component: './Account/Center/Center',
            routes: [
              { path: '/account/center', redirect: '/account/center/articles' },
              { path: '/account/center/articles', component: './Account/Center/Articles' },
              { path: '/account/center/applications', component: './Account/Center/Applications' },
              { path: '/account/center/projects', component: './Account/Center/Projects' },
            ],
          },
          {
            path: '/account/settings',
            //component: './Account/Settings/Info',
            routes: [
              { path: '/account/settings', redirect: '/account/settings/base' },
              { path: '/account/settings/base', component: './Account/Settings/BaseView' },
              { path: '/account/settings/password', component: './Account/Settings/PasswordView' },
              //{ path: '/account/settings/security', component: './Account/Settings/SecurityView' },
              //{ path: '/account/settings/binding', component: './Account/Settings/BindingView' },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: './Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: './Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: './Dashboard/Workplace' },
        ],
      },
      {
        path: '/desk',
        routes: [
          {
            path: '/desk/notice',
            routes: [
              { path: '/desk/notice', redirect: '/desk/notice/list' },
              { path: '/desk/notice/list', component: './Desk/Notice/Notice' },
              { path: '/desk/notice/add', component: './Desk/Notice/NoticeAdd' },
              { path: '/desk/notice/edit/:id', component: './Desk/Notice/NoticeEdit' },
              { path: '/desk/notice/view/:id', component: './Desk/Notice/NoticeView' },
            ],
          },
          {
            path: '/desk/activity',
            routes: [
              { path: '/desk/activity', redirect: '/desk/activity/list' },
              { path: '/desk/activity/list', component: './Desk/Activity/Activity' },
              { path: '/desk/activity/add', component: './Desk/Activity/ActivityAdd' },
              { path: '/desk/activity/edit/:id', component: './Desk/Activity/ActivityEdit' },
              { path: '/desk/activity/view/:id', component: './Desk/Activity/ActivityView' },
            ],
          },
        ],
      },
      {
        path: '/base',
        routes: [
          {
            path: '/base/region',
            routes: [
              { path: '/base/region', redirect: '/base/region/detail' },
              { path: '/base/region/detail', component: './Base/Region/Region' },
            ],
          },
          {
            path: '/base/order',
            routes: [
              { path: '/base/order', redirect: '/base/order/list' },
              { path: '/base/order/list', component: './Base/Order/Order' },
              { path: '/base/order/add', component: './Base/Order/OrderAdd' },
              { path: '/base/order/edit/:id', component: './Base/Order/OrderEdit' },
              { path: '/base/order/view/:id', component: './Base/Order/OrderView' },
            ],
          },
        ],
      },
      {
        path: '/system',
        routes: [
          {
            path: '/system/user',
            routes: [
              { path: '/system/user', redirect: '/system/user/list' },
              { path: '/system/user/list', component: './System/User/User' },
              { path: '/system/user/add', component: './System/User/UserAdd' },
              { path: '/system/user/edit/:id', component: './System/User/UserEdit' },
              { path: '/system/user/view/:id', component: './System/User/UserView' },
            ],
          },
          {
            path: '/system/dict',
            routes: [
              { path: '/system/dict', redirect: '/system/dict/list' },
              { path: '/system/dict/list', component: './System/Dict/Dict' },
              { path: '/system/dict/add', component: './System/Dict/DictAdd' },
              { path: '/system/dict/add/:id', component: './System/Dict/DictAdd' },
              { path: '/system/dict/edit/:id', component: './System/Dict/DictEdit' },
              { path: '/system/dict/view/:id', component: './System/Dict/DictView' },
            ],
          },
          {
            path: '/system/dept',
            routes: [
              { path: '/system/dept', redirect: '/system/dept/list' },
              { path: '/system/dept/list', component: './System/Dept/Dept' },
              { path: '/system/dept/add', component: './System/Dept/DeptAdd' },
              { path: '/system/dept/add/:id', component: './System/Dept/DeptAdd' },
              { path: '/system/dept/edit/:id', component: './System/Dept/DeptEdit' },
              { path: '/system/dept/view/:id', component: './System/Dept/DeptView' },
            ],
          },
          {
            path: '/system/post',
            routes: [
              { path: '/system/post', redirect: '/system/post/list' },
              { path: '/system/post/list', component: './System/Post/Post' },
              { path: '/system/post/add', component: './System/Post/PostAdd' },
              { path: '/system/post/add/:id', component: './System/Post/PostAdd' },
              { path: '/system/post/edit/:id', component: './System/Post/PostEdit' },
              { path: '/system/post/view/:id', component: './System/Post/PostView' },
            ],
          },
          {
            path: '/system/role',
            routes: [
              { path: '/system/role', redirect: '/system/role/list' },
              { path: '/system/role/list', component: './System/Role/Role' },
              { path: '/system/role/add', component: './System/Role/RoleAdd' },
              { path: '/system/role/add/:id', component: './System/Role/RoleAdd' },
              { path: '/system/role/edit/:id', component: './System/Role/RoleEdit' },
              { path: '/system/role/view/:id', component: './System/Role/RoleView' },
            ],
          },
          {
            path: '/system/menu',
            routes: [
              { path: '/system/menu', redirect: '/system/menu/list' },
              { path: '/system/menu/list', component: './System/Menu/Menu' },
              { path: '/system/menu/add', component: './System/Menu/MenuAdd' },
              { path: '/system/menu/add/:id', component: './System/Menu/MenuAdd' },
              { path: '/system/menu/edit/:id', component: './System/Menu/MenuEdit' },
              { path: '/system/menu/view/:id', component: './System/Menu/MenuView' },
            ],
          },
          {
            path: '/system/param',
            routes: [
              { path: '/system/param', redirect: '/system/param/list' },
              { path: '/system/param/list', component: './System/Param/Param' },
              { path: '/system/param/add', component: './System/Param/ParamAdd' },
              { path: '/system/param/edit/:id', component: './System/Param/ParamEdit' },
              { path: '/system/param/view/:id', component: './System/Param/ParamView' },
            ],
          },
          {
            path: '/system/tenant',
            routes: [
              { path: '/system/tenant', redirect: '/system/tenant/list' },
              { path: '/system/tenant/list', component: './System/Tenant/Tenant' },
              { path: '/system/tenant/add', component: './System/Tenant/TenantAdd' },
              { path: '/system/tenant/edit/:id', component: './System/Tenant/TenantEdit' },
              { path: '/system/tenant/view/:id', component: './System/Tenant/TenantView' },
            ],
          },
          {
            path: '/system/client',
            routes: [
              { path: '/system/client', redirect: '/system/client/list' },
              { path: '/system/client/list', component: './System/Client/Client' },
              { path: '/system/client/add', component: './System/Client/ClientAdd' },
              { path: '/system/client/edit/:id', component: './System/Client/ClientEdit' },
              { path: '/system/client/view/:id', component: './System/Client/ClientView' },
            ],
          },
        ],
      },
      {
        path: '/monitor',
        routes: [
          {
            path: '/monitor/log',
            routes: [
              {
                path: '/monitor/log/usual',
                routes: [
                  { path: '/monitor/log/usual', redirect: '/monitor/log/usual/list' },
                  { path: '/monitor/log/usual/list', component: './Monitor/Log/LogUsual' },
                  { path: '/monitor/log/usual/view/:id', component: './Monitor/Log/LogUsualView' },
                ],
              },
              {
                path: '/monitor/log/api',
                routes: [
                  { path: '/monitor/log/api', redirect: '/monitor/log/api/list' },
                  { path: '/monitor/log/api/list', component: './Monitor/Log/LogApi' },
                  { path: '/monitor/log/api/view/:id', component: './Monitor/Log/LogApiView' },
                ],
              },
              {
                path: '/monitor/log/error',
                routes: [
                  { path: '/monitor/log/error', redirect: '/monitor/log/error/list' },
                  { path: '/monitor/log/error/list', component: './Monitor/Log/LogError' },
                  { path: '/monitor/log/error/view/:id', component: './Monitor/Log/LogErrorView' },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/report',
        routes: [
          {
            path: '/report/reportlist',
            routes: [{ path: '/report/reportlist', component: './Report/Report' }],
          },
        ],
      },
      {
        path: '/tool',
        routes: [
          {
            path: '/tool/code',
            routes: [
              { path: '/tool/code', redirect: '/tool/code/list' },
              { path: '/tool/code/list', component: './System/Code/Code' },
              { path: '/tool/code/add', component: './System/Code/CodeAdd' },
              { path: '/tool/code/add/:id', component: './System/Code/CodeAdd' },
              { path: '/tool/code/edit/:id', component: './System/Code/CodeEdit' },
              { path: '/tool/code/view/:id', component: './System/Code/CodeView' },
            ],
          },
          {
            path: '/tool/datasource',
            routes: [
              { path: '/tool/datasource', redirect: '/tool/datasource/list' },
              { path: '/tool/datasource/list', component: './System/DataSource/DataSource' },
              { path: '/tool/datasource/add', component: './System/DataSource/DataSourceAdd' },
              { path: '/tool/datasource/add/:id', component: './System/DataSource/DataSourceAdd' },
              {
                path: '/tool/datasource/edit/:id',
                component: './System/DataSource/DataSourceEdit',
              },
              {
                path: '/tool/datasource/view/:id',
                component: './System/DataSource/DataSourceView',
              },
            ],
          },
          // 新增
          {
            path: '/rms',
            routes: [
              {
                path: '/rms/user',
                routes: [
                  { path: '/rms/user', redirect: '/rms/user/list' },
                  { path: '/rms/user/list', component: './Rms/User/User' },
                  { path: '/rms/user/add', component: './Rms/User/UserAdd' },
                  { path: '/rms/user/edit/:id', component: './Rms/User/UserEdit' },
                  { path: '/rms/user/view/:id', component: './Rms/User/UserView' },
                ],
              },
              {
                path: '/rms/dict',
                routes: [
                  { path: '/rms/dict', redirect: '/rms/dict/list' },
                  { path: '/rms/dict/list', component: './Rms/Dict/Dict' },
                  { path: '/rms/dict/add', component: './Rms/Dict/DictAdd' },
                  { path: '/rms/dict/add/:id', component: './Rms/Dict/DictAdd' },
                  { path: '/rms/dict/edit/:id', component: './Rms/Dict/DictEdit' },
                  { path: '/rms/dict/view/:id', component: './Rms/Dict/DictView' },
                ],
              },
              {
                path: '/rms/dept',
                routes: [
                  { path: '/rms/dept', redirect: '/rms/dept/list' },
                  { path: '/rms/dept/list', component: './Rms/Dept/Dept' },
                  { path: '/rms/dept/add', component: './Rms/Dept/DeptAdd' },
                  { path: '/rms/dept/add/:id', component: './Rms/Dept/DeptAdd' },
                  { path: '/rms/dept/edit/:id', component: './Rms/Dept/DeptEdit' },
                  { path: '/rms/dept/view/:id', component: './Rms/Dept/DeptView' },
                ],
              },
              {
                path: '/rms/post',
                routes: [
                  { path: '/rms/post', redirect: '/rms/post/list' },
                  { path: '/rms/post/list', component: './Rms/Post/Post' },
                  { path: '/rms/post/add', component: './Rms/Post/PostAdd' },
                  { path: '/rms/post/add/:id', component: './Rms/Post/PostAdd' },
                  { path: '/rms/post/edit/:id', component: './Rms/Post/PostEdit' },
                  { path: '/rms/post/view/:id', component: './Rms/Post/PostView' },
                ],
              },
              {
                path: '/rms/role',
                routes: [
                  { path: '/rms/role', redirect: '/rms/role/list' },
                  { path: '/rms/role/list', component: './Rms/Role/Role' },
                  { path: '/rms/role/add', component: './Rms/Role/RoleAdd' },
                  { path: '/rms/role/add/:id', component: './Rms/Role/RoleAdd' },
                  { path: '/rms/role/edit/:id', component: './Rms/Role/RoleEdit' },
                  { path: '/rms/role/view/:id', component: './Rms/Role/RoleView' },
                ],
              },
              {
                path: '/rms/menu',
                routes: [
                  { path: '/rms/menu', redirect: '/rms/menu/list' },
                  { path: '/rms/menu/list', component: './Rms/Menu/Menu' },
                  { path: '/rms/menu/add', component: './Rms/Menu/MenuAdd' },
                  { path: '/rms/menu/add/:id', component: './Rms/Menu/MenuAdd' },
                  { path: '/rms/menu/edit/:id', component: './Rms/Menu/MenuEdit' },
                  { path: '/rms/menu/view/:id', component: './Rms/Menu/MenuView' },
                ],
              },
              {
                path: '/rms/param',
                routes: [
                  { path: '/rms/param', redirect: '/rms/param/list' },
                  { path: '/rms/param/list', component: './Rms/Param/Param' },
                  { path: '/rms/param/add', component: './Rms/Param/ParamAdd' },
                  { path: '/rms/param/edit/:id', component: './Rms/Param/ParamEdit' },
                  { path: '/rms/param/view/:id', component: './Rms/Param/ParamView' },
                ],
              },
              {
                path: '/rms/tenant',
                routes: [
                  { path: '/rms/tenant', redirect: '/rms/tenant/list' },
                  { path: '/rms/tenant/list', component: './Rms/Tenant/Tenant' },
                  { path: '/rms/tenant/add', component: './Rms/Tenant/TenantAdd' },
                  { path: '/rms/tenant/edit/:id', component: './Rms/Tenant/TenantEdit' },
                  { path: '/rms/tenant/view/:id', component: './Rms/Tenant/TenantView' },
                ],
              },
              {
                path: '/rms/client',
                routes: [
                  { path: '/rms/client', redirect: '/rms/client/list' },
                  { path: '/rms/client/list', component: './Rms/Client/Client' },
                  { path: '/rms/client/add', component: './Rms/Client/ClientAdd' },
                  { path: '/rms/client/edit/:id', component: './Rms/Client/ClientEdit' },
                  { path: '/rms/client/view/:id', component: './Rms/Client/ClientView' },
                ],
              },
            ],
          },
        ],
      },
      //会员志愿者信息化管理平台
      {
        path: '/vipsystem',
        routes: [
          {
            path: '/vipsystem/volunteer',
            routes: [
              { path: '/vipsystem/volunteer', redirect: '/vipsystem/volunteer/detail' },
              { path: '/vipsystem/volunteer/detail', component: './Vipsystem/Volunteer/Volunteer' },
            ],
          },
        ],
      },
      //客流统计与预警平台
      {
        path: '/flowinfoandwarning',
        routes: [
          {
            path: '/flowinfoandwarning/datashow',
            routes: [
              { path: '/flowinfoandwarning/datashow', redirect: '/flowinfoandwarning/datashow/list' },
              { path: '/flowinfoandwarning/datashow/list', component: './Flowinfoandwarning/Datashow/Datashow' },
              { path: '/flowinfoandwarning/datashow/add', component: './Flowinfoandwarning/Datashow/DatashowAdd' },
              { path: '/flowinfoandwarning/datashow/edit/:id', component: './Flowinfoandwarning/Datashow/DatashowEdit' },
              { path: '/flowinfoandwarning/datashow/view/:id', component: './Flowinfoandwarning/Datashow/DatashowView' },
            ],
          },
          {
            path: '/flowinfoandwarning/staffdispatch',
            routes: [
              { path: '/flowinfoandwarning/staffdispatch', redirect: '/flowinfoandwarning/staffdispatch/list' },
              { path: '/flowinfoandwarning/staffdispatch/list', component: './Flowinfoandwarning/StaffDispatch/StaffDispatch' },
              { path: '/flowinfoandwarning/staffdispatch/add', component: './Flowinfoandwarning/StaffDispatch/StaffDispatchAdd' },
              { path: '/flowinfoandwarning/staffdispatch/add/:id', component: './Flowinfoandwarning/StaffDispatch/StaffDispatchAdd' },
              { path: '/flowinfoandwarning/staffdispatch/edit/:id', component: './Flowinfoandwarning/StaffDispatch/StaffDispatchEdit' },
              { path: '/flowinfoandwarning/staffdispatch/view/:id', component: './Flowinfoandwarning/StaffDispatch/StaffDispatchView' },
            ],
          },
          {
            path: '/flowinfoandwarning/audience',
            routes: [
              { path: '/flowinfoandwarning/audience', redirect: '/flowinfoandwarning/audience/list' },
              { path: '/flowinfoandwarning/audience/list', component: './Flowinfoandwarning/Audience/Audience' },
              { path: '/flowinfoandwarning/audience/add', component: './Flowinfoandwarning/Audience/AudienceAdd' },
              { path: '/flowinfoandwarning/audience/add/:id', component: './Flowinfoandwarning/Audience/AudienceAdd' },
              { path: '/flowinfoandwarning/audience/edit/:id', component: './Flowinfoandwarning/Audience/AudienceEdit' },
              { path: '/flowinfoandwarning/audience/view/:id', component: './Flowinfoandwarning/Audience/AudienceView' },
            ],
          },
          {
            path: '/flowinfoandwarning/tourroutes',
            routes: [
              { path: '/flowinfoandwarning/tourroutes', redirect: '/flowinfoandwarning/tourroutes/list' },
              { path: '/flowinfoandwarning/tourroutes/list', component: './Flowinfoandwarning/Tourroutes/Tourroutes' },
              { path: '/flowinfoandwarning/tourroutes/add', component: './Flowinfoandwarning/Tourroutes/TourroutesAdd' },
              { path: '/flowinfoandwarning/tourroutes/add/:id', component: './Flowinfoandwarning/Tourroutes/TourroutesAdd' },
              { path: '/flowinfoandwarning/tourroutes/edit/:id', component: './Flowinfoandwarning/Tourroutes/TourroutesEdit' },
              { path: '/flowinfoandwarning/tourroutes/view/:id', component: './Flowinfoandwarning/Tourroutes/TourroutesView' },
            ],
          },
          {
            path: '/flowinfoandwarning/contingencyplan',
            routes: [
              { path: '/flowinfoandwarning/contingencyplan', redirect: '/flowinfoandwarning/contingencyplan/list' },
              { path: '/flowinfoandwarning/contingencyplan/list', component: './Flowinfoandwarning/ContingencyPlan/ContingencyPlan' },
              { path: '/flowinfoandwarning/contingencyplan/add', component: './Flowinfoandwarning/ContingencyPlan/ContingencyPlanAdd' },
              { path: '/flowinfoandwarning/contingencyplan/add/:id', component: './Flowinfoandwarning/ContingencyPlan/ContingencyPlanAdd' },
              { path: '/flowinfoandwarning/contingencyplan/edit/:id', component: './Flowinfoandwarning/ContingencyPlan/ContingencyPlanEdit' },
              { path: '/flowinfoandwarning/contingencyplan/view/:id', component: './Flowinfoandwarning/ContingencyPlan/ContingencyPlanView' },
            ],
          },
          {
            path: '/flowinfoandwarning/commonresource',
            routes: [
              { path: '/flowinfoandwarning/commonresource', redirect: '/flowinfoandwarning/commonresource/list' },
              { path: '/flowinfoandwarning/commonresource/list', component: './Flowinfoandwarning/CommonResource/CommonResource' },
              { path: '/flowinfoandwarning/commonresource/add', component: './Flowinfoandwarning/CommonResource/CommonResourceAdd' },
              { path: '/flowinfoandwarning/commonresource/add/:id', component: './Flowinfoandwarning/CommonResource/CommonResourceAdd' },
              { path: '/flowinfoandwarning/commonresource/edit/:id', component: './Flowinfoandwarning/CommonResource/CommonResourceEdit' },
              { path: '/flowinfoandwarning/commonresource/view/:id', component: './Flowinfoandwarning/CommonResource/CommonResourceView' },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
