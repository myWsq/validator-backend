# Lanternfish 前端测试项目

根据要求实现一个简单的系统,  要求:

1. 使用最新版本的Vue.js；
2. 可以使用任何库；
3. 尽可能规范。
4. 项目完成后源码上传至Github并将页面部署在公网上（Pages或自行部署）

## 项目说明

总的来说是一个备忘录管理系统，逻辑非常简单。

**注册页面**

1. 主体为一个表单，表单项为：用户名，密码，确认密码；
2. 需要做表单验证，验证规则在下面给出；
3. 注册成功后跳转至登录页面。

**登录页面**

1. 主体为一个表单，表单项为：用户名，密码；
2. 需要表单验证；
3. 登录成功后跳转至主页。

**主页**

1. 显示用户的所有备忘录；
2. 可新增，删除，修改某条记录。

**管理页面**（暂不实现）

1. 只有管理员能进入；
2. 显示所有用户的备忘录；
3. 可以修改，删除某条记录。

## 接口说明

已开启CORS；

标准Restful接口；

接口地址： https://todo.lanternfish.ai

测试：https://todo.lanternfish.ai/todo

### 鉴权

使用JWT， 调用**登录**接口获得token。

`curl -H "Authorization: JWT <TOKEN>" https://todo.lanternfish.ai`

`Hello world`

**下面带「\*」的接口需携带有效token,否则将出现下面的错误。**

```json
{
    "statusCode": 403,
    "error": "Forbidden",
    "message": "Forbidden resource"
}
```

### 登录

**POST**

[/auth](/auth)

**Body**

```json
{
    "username":"lanternfish",
    "password":"lanternfish"
}
```

**Response**

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI"
}
```

验证规则：

* username 非空；
* password 非空。

### 获取用户信息 *

**GET**

[/auth](/auth)

**Response**

```json
{
    "username": "lanternfish",
    "id": "f9f5c710-403f-4e8d-9099-e85f63a22e03",
    "name": ""
}
```

### 注册

**POST**

[/user](/user)

**Body**

```json
{
    "username":"lanternfish",
    "password":"lanternfish",
    "name":"lantern"
}
```

**Response**

```json
{
    "username": "lanternfish",
    "id": "f9f5c710-403f-4e8d-9099-e85f63a22e03",
    "name": "lantern"
}
```

验证规则： 

* username 非空 5-12位；
* password 非空 8-20位；
* name 可选 1-12位；

### 获取用户备忘录列表 *

**GET**

[/user/todo](/user/todo)

**Response**

```json
[
    {
        "id": "dccc78ec-1e36-4dbd-b4d3-89840b49adf5",
        "title": "todo1"
    },
    {
        "id": "dccc78ec-1e36-4dbd-b4d3-89840b49adf6",
        "title": "todo2"
    }
]
```

### 新增备忘录 *

**POST**

[/todo](/todo)

**Body**

```json
{
    "title":"todo"
}
```

**Response**

```json
{
    "id": "dccc78ec-1e36-4dbd-b4d3-89840b49adf6",
    "title": "todo2"
}
```

验证规则：

title 非空 1-20位。

### 删除备忘录 *

**DELETE**

[/todo/:id](/todo/:id)

**Response**

```json
{
    "title":"todo2"
}
```

### 修改备忘录 *

**PUT**

[/todo/:id](/todo/:id)

**Body**

```json
{
    "title":"todo3"
}
```

**Response**

```json
{
    "id": "dccc78ec-1e36-4dbd-b4d3-89840b49adf6",
    "title": "todo3"
}
```

验证规则同新增备忘录。

