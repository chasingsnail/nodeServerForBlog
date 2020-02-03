# 前置知识

## Nodejs、JS、ES区别

ES为语法规范，定义了语法、循环、判断、原型、闭包等等。nodejs与js遵循该规范。

js结合了ES与web API（操作DOM、ajax请求等），由此具备了在浏览器中进行操作的能力。

nodejs结合了ES与Node API（处理文件、处理http等），由此可以完成server端的操作。

## server端开发中的注意点

### 考虑内存与CPU优化与扩展

cpu与内存为稀缺资源。使用stream写日志，redis来存储session。

### 日志记录

记录、存储、分析

### 安全

### 集群与服务拆分

流量增大后，需要扩展以及拆分服务来承载

# MySQL

## 数据类型

+ int 数字类型，如id
+ varchar(xx) 有限文本(xx不区分中文英文数字，长度统一化)，如用户名
+ bigint 较大的数值，如时间戳
+ longtext 长文本，如文章内容

## 配置列

+ pk 主键
+ nn 不为空
+ AI 自动增加
+ default 默认值

## 常用sql语句

假设有一张user表，列项为id、username、password、realname。

tip: 等于 =  | 不等于 <>

### 增加

```mysql
use myblog

-- 插入行数据(password为关键词，遂用引号包裹)
insert into users(username,`password`,realname) values('zhangsan','123','张三')
```

### 查询

```mysql
use myblog

-- 查询user表所有列
select * from users;

-- 查询user表指定列
select id,username from users;

-- 查询user指定行(与、或、模糊搜索)
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';
select * from users where username like '%zhang%';

-- 查询user表按id正、倒叙排列
select * from users order by id;
select * from users where username='zhangsan' order by id desc;

```

### 更新

```mysql
use myblog

-- 更新数据
-- safe mode fix
SET SQL_SAFE_UPDATES = 0;

-- 更新指定行数据
update users set realname='李四2' where username='lisi';


```

### 删除

```mysql
use myblog

-- 删除
-- 删除所有(better not)
delete from user;

-- 删除指定条件行 (实际应用中利用额外字段例如state来控制,利用update去更新该字段)
delete from user where username='zhangsan';


```



# 原生代码开发



# 框架代码开发

# 线上部署