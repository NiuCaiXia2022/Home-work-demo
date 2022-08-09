// 公用方法

// 本地
import Storage from '../utils/storage'


// 添加购物车数据 到本地
const addCard=(data)=>{
  console.log(data);
  // 判断  没有 就直接存  有 就把数量++
  const dataArray=[]
  if(hasLocalData){
    data.num=1 //添加数量
    dataArray.push(data)
    // 存本地
    Storage.set('carts',dataArray)
  }else{
    const localData=Storage.get('carts')
    hasShopData(data,localData)
  }

  
}


// 本地里有没有数据
const hasLocalData=()=>{
  // 获取 本地 的caets 购物车列表
  const carts=Storage.get('carts')
  const status=carts? true:false
  return status
}

// 本地多次添加数据
const hasShopData=(data,localData)=>{
  console.log('本地多次添加数据',data,localData);
 const _data= localData.filter(item=>{
    return item._id===data._id
  })

}

export default {
  addCard
}