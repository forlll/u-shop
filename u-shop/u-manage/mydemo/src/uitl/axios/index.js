import http from './axios'

/* ===========菜单列表============== */

// 封装一个菜单列表接口
export function getMenuList(){
    return http.get('/api/menulist?istree=true')
}

// 封装一个菜单添加接口
export function addMenu(data){
    return http.post('/api/menuadd',data)
}

// 封装一个删除菜单接口
export function delMenu(data){
    return http.post('/api/menudelete',data)
}

// 封装一条修改一条菜单接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}

// 封装查看一条菜单数据接口
export function lookOneMenu(params){
    return http.get('/api/menuinfo',{
        params
    })
}

/* ===========角色列表============== */

// 封装一个角色列表接口
export function getRoleList(){
    return http.get('/api/rolelist')
}

// 封装一个角色添加接口
export function addRole(data){
    return http.post('/api/roleadd',data)
}

// 封装一个删除角色接口
export function delRole(data){
    return http.post('/api/roledelete',data)
}

// 封装一条修改一条角色接口
export function editRole(data){
    return http.post('/api/roleedit',data)
}

// 封装查看一条角色数据接口
export function lookOneRole(params){
    return http.get('/api/roleinfo',{
        params
    })
}

/* ===========管理员列表============== */

// 封装一个管理员列表分页接口
export function getUserList(params){
    return http.get('/api/userlist',{params})
}

//封装管理员总条数
export function getUserCount(){
    return http.get('/api/usercount')
}

// 封装一个管理员添加接口
export function addUser(data){
    return http.post('/api/useradd',data)
}

// 封装一个删除管理员角色接口
export function delUser(data){
    return http.post('/api/userdelete',data)
}

// 封装一条修改一条管理员接口
export function editUser(data){
    return http.post('/api/useredit',data)
}

// 封装查看一条管理员数据接口
export function lookOneUser(params){
    return http.get('/api/userinfo',{
        params
    })
}

export function userLogin(data){
    return http.post('/api/userlogin',data)
}

/* ===========商品分类列表============== */

// 封装一个商品分类列表接口
export function getCateList(){
    return http.get('/api/catelist?istree=true')
}

// 封装一个商品分类添加接口
export function addCate(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
      file.append(i, data[i]);
    }
    return http.post('/api/cateadd',file)
}

// 封装一个删除商品分类接口
export function delCate(data){
    return http.post('/api/catedelete',data)
}

// 封装一条修改一条商品分类接口
export function editCate(data){
    return http.post('/api/cateedit',data)
}

// 封装查看一条商品分类数据接口
export function lookOneCate(params){
    return http.get('/api/cateinfo',{
        params
    })
}

/* ===========商品规格列表============== */

// 封装一个商品规格列表分页接口
export function getSpecsList(params){
    return http.get('/api/specslist',{params})
}

//封装商品规格总条数
export function getSpecsCount(){
    return http.get('/api/specscount')
}

// 封装一个商品规格添加接口
export function addSpecs(data){
    return http.post('/api/specsadd',data)
}

// 封装一个删除商品规格角色接口
export function delSpecs(data){
    return http.post('/api/specsdelete',data)
}

// 封装一条修改一条商品规格接口
export function editSpecs(data){
    return http.post('/api/specsedit',data)
}

// 封装查看一条商品规格数据接口
export function lookOneSpecs(params){
    return http.get('/api/specsinfo',{
        params
    })
}

/* ===========商品管理列表============== */

// 封装一个商品列表分页接口
export function getGoodsList(params){
    return http.get('/api/goodslist',{params})
}

//封装商品总条数
export function getGoodsCount(){
    return http.get('/api/goodscount')
}

// 封装一个商品添加接口
export function addGoods(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
      file.append(i, data[i]);
    }
    return http.post('/api/goodsadd',file)
}

// 封装一个删除商品接口
export function delGoods(data){
    return http.post('/api/goodsdelete',data)
}

// 封装一条修改一条商品接口
export function editGoods(data){
    return http.post('/api/goodsedit',data)
}

// 封装查看一条商品数据接口
export function lookOneGoods(params){
    return http.get('/api/goodsinfo',{
        params
    })
}

/* ===========会员列表============== */

// 封装一个会员列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}

// 封装一个会员添加接口
export function addMember(data){
    return http.post('/api/memberadd',data)
}

// 封装一条修改一条会员接口
export function editMember(data){
    return http.post('/api/memberedit',data)
}

/* ===========轮播图列表============== */

// 封装一个轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}

// 封装一个轮播图添加接口
export function addBanner(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
      file.append(i, data[i]);
    }
    return http.post('/api/banneradd',file)
}

// 封装一个删除轮播图接口
export function delBanner(data){
    return http.post('/api/bannerdelete',data)
}

// 封装一条修改一条轮播图接口
export function editBanner(data){
    return http.post('/api/banneredit',data)
}

// 封装查看一条轮播图数据接口
export function lookOneBanner(params){
    return http.get('/api/bannerinfo',{
        params
    })
}

/* ===========秒杀列表============== */

// 封装一个秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}

// 封装一个秒杀添加接口
export function addSeck(data){
    return http.post('/api/seckadd',data)
}

// 封装一个删除秒杀接口
export function delSeck(data){
    return http.post('/api/seckdelete',data)
}

// 封装一条修改一条秒杀接口
export function editSeck(data){
    return http.post('/api/seckedit',data)
}

// 封装查看一条秒杀数据接口
export function lookOneSeck(params){
    return http.get('/api/seckinfo',{
        params
    })
}