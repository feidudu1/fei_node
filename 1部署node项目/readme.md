关于慕课网《node建站攻略(二期)——网站升级》视频教程的实战练习

# 准备
安装node，grunt，mongodb

# npm install

# 启动本地mongodb

# grunt命令启动项目

# 其他
先注册一个账号，这时候的账号是低权限的，需要登陆数据库修改
## 切换到imooc-movie
use imooc-movie
## 查看数据
db.users.find({})
可以看到role为0，我们要手动改为51
## 改动权限
db.users.update({name: 'admin'},{$set: {role: 51}})

