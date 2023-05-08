import MinRequest from '../request/MinRequest.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
    return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
    if (response.statusCode === 401) {
        uni.navigateTo({
            url: 'pages/login/login'
        });
    }
    if (response.cookies) {
        if (response.cookies.length != 0) {
            uni.setStorageSync('cookie', response.cookies.join(','));
        }
    }
    return response.data
})
// 设置默认配置
minRequest.setConfig((config) => {
    config.baseURL = 'https://www.wanandroid.com'
    return config
})

export default {
	// 登录
	Login(data) {
			return minRequest.post('/user/login', data,{
				header: {
			    'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				}
			})
	},
	// 首页
	homeList() {
		return minRequest.get('/article/list/0/json')
	},
	// 收藏文章列表
	collectionList() {
		return minRequest.get('/lg/collect/list/0/json')
	}
}