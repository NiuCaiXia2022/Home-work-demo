// 本地存储



// 存
const setItem = (key, value) => {
	if (typeof value === 'object') {
		uni.setStorageSynckey(key, JSON.stringify(value))
	} else {
		uni.setStorageSync(key, value)
	}
}

// 取
const getItem = (key) => {
	const data = uni.getStorageSync(key)
	try {
		return JSON.parse(data)
	} catch {
		return data
	}
}

// 删
const remoteItem = (key) => {
	uni.removeStorageSync(key)

}

// 清空
const clearAll = () => {
	uni.clearStorageSync();
}


export default {
	setItem,
	getItem,
	clearAll,
	remoteItem
}
