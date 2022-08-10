// 公用方法

// 本地
import Storage from '../utils/storage'


// 添加购物车数据 到本地
const addCard = (data) => {
  // console.log(data);
  // 判断  没有 就直接存  有 就把数量++
  const dataArray = []
  console.log('111', hasLocalData());
  // hasLocalData() 返回值是false 
  // 来判断 hasLocalData() 返回值是否是正确的 
  // 就是验证 函数内的本地存储有没有数据 函数内的逻辑是否正确
  if (!hasLocalData()) {  //就是验证 函数内的本地存储有没有数据 函数内的逻辑是否正确

    data.num = 1 //添加数量
    dataArray.push(data)
    // 存本地
    Storage.set('carts', dataArray)
  } else {// false 就是说 函数内逻辑不正确 num++
    const localData = Storage.get('carts')
    console.log('本地1', localData);

    // 判断  添加的商品id 是否一样
    if (hasShopData(data, localData)) { // 一样加num

      localData.forEach(item => {
        console.log('item', item);
        if (item._id === data._id) {
          item.num += 1
        }
      })

    }else{ // 不一样加 商品规格
      data.num = 1
      localData.push(data)
    }
    Storage.set('carts', localData)

  }


}


// 本地里有没有数据
const hasLocalData = () => {
  // 获取 本地 的caets 购物车列表
  const carts = Storage.get('carts')
  // console.log('本地', carts);
  // 有 true  没有 false
  const status = carts ? true : false
  return status // false
}

// 本地多次添加数据
const hasShopData = (data, localData) => {
  const _data = localData.filter(item => {
    return item._id === data._id
  })
  return _data.length > 0 ? true : false
}

export default {
  addCard
}