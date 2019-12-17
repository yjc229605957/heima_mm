// 定义常量的key
// 用作key的常量 一般会写成全部大写
const KEY = 'mmtoken'

// 暴露的 保存token的语法
export function setToken(token){
    window.localStorage.setItem(KEY,token)
}

// 暴露的 获取token的语法
export function getToken(){
    return window.localStorage.getItem(KEY)
}

// 暴露的 删除token的语法
export function removeToken(){
    window.localStorage.removeItem(KEY)
}