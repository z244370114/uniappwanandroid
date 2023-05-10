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
		return minRequest.post('/user/login', data,{
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			}
		})
	},
	// 注册
	regist(data) {
		return minRequest.post('/user/register', data,{
			header: {
		    'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			}
		})
	},
	// 登出
	loginOut() {
		return minRequest.get('/user/logout/json')
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
	collectionList() {
		return minRequest.get('/lg/collect/list/0/json')
	}
}