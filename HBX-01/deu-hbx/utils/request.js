// 请求

const baseURL = "http://demonuxtapi.dishait.cn"


const http = (data) => {
	return new Promise((resolve, reject) => {
		const appid = "bd9d01ecc75dbbaaefce"
		uni.request({
			url: baseURL + data.url,
			method: data.method || 'GET',
			data: data.data || '',
			header: {
				appid
			},
			success: (res) => {
				// console.log('请求1',res);
				resolve(res)
			},
			fail: (err) => {
				console.log('请求2',err);
				reject(err)
			}
		})
	})
}


export default http