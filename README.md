# erhuo

## 功能

- [x] 登录/登出/注册/找回密码
- 首页
    - [x] 轮播
    - [x] 热搜/搜索
    - [x] 新用户/最近登录用户
- 用户
    - [x] 出售
    - [x] 收藏
    - [x] 关注
    - [x] 粉丝
    - [ ] 足迹（待完成）
- 商品
    - [x] 商品显示
    - [x] 发布商品
    - [x] 修改商品
    - [ ] 评论（待完成）
- [ ] 消息 (待完成)
## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── api  fetch 封装ajax
    ├── config 配置
    ├── libs  工具方法
    ├── router  路由配置
    ├── store  状态管理
    ├── style  样式文件(公共样式)
    ├── template  模板文件
    ├── theme  主题
    ├── vendors  公共库文件
    └── views
        ├── access  权限管理
        ├── advanced-router  高级路由
        ├── error_page  错误页面
        ├── form  表单编辑
        ├── home  首页
        │   ├── components  首页组件
        ├── international  多语言
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        │   ├── area-linkage  中国行政区级联选择器
        │   ├── count-to  数字渐变
        │   ├── draggable-list  可拖拽列表
        │   ├── file-upload  文件上传
        │   ├── image-editor  图片预览编辑
        │   ├── markdown-editor  Markdown编辑器
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        └── tables  综合表格
    
```
