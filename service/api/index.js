import MinRequest from '../request/MinRequest.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	if (response.data.errorCode === 401) {
		uni.navigateTo({
			url: 'subPagesA/login/login'
		});
	}
	console.log(response)
	if (response.data.errorCode === -1) {
		uni.showToast({
			title: response.data.errorMsg,
			icon: 'none'
		});
		return
	}
	if (response.cookies) {
		if (response.cookies.length != 0) {
			uni.setStorageSync('cookie', response.cookies.join(','));
		}
	}
	return response.data.data
})
// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = 'https://www.wanandroid.com'
	return config
})

export default {
	// 登录
	Login(data) {
		return minRequest.post('/user/login', data, {
			header: {
				'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
			}
		})
	},
	// 注册
	regist(data) {
		return minRequest.post('/user/register', data, {
			header: {
				'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
			}
		})
	},
	// 登出
	loginOut() {
		return minRequest.get('/user/logout/json')
	},
	// 首页广告
	bannerList() {
		return minRequest.get(`/banner/json`)
	},
	// 首页
	homeList(page) {
		return minRequest.get(`/article/list/${page}/json`)
	},

	// 收藏站内文章
	collect(id) {
		return minRequest.post(`/lg/collect/${id}/json`)
	},
	// 取消收藏 (文章列表)
	uncollect(id) {
		return minRequest.post(`/lg/uncollect_originId/${id}/json`)
	},
	// 收藏文章列表
	collectionList(page) {
		return minRequest.get(`/lg/collect/list/${page}/json`)
	},
	// 我的积分列表
	myIntegralList(page) {
		return minRequest.get(`/lg/coin/list/${page}/json`)
	},
	// 自己分享的文章
	mySelfEssayList(page) {
		return minRequest.get(`/user/lg/private_articles/${page}/json`)
	},
	// 获取体系信息
	treeList() {
		return minRequest.get(`/tree/json`)
	},
	// 获取导航信息
	naviList() {
		return minRequest.get(`/navi/json`)
	},
}