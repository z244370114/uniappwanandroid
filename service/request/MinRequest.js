const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
var type = 0;

// let data = uni.getStorageSync('token') ? uni.getStorageSync('token'): ''
class MinRequest {
    [config] = {
        baseURL: '',
        header: {
            'content-type': 'application/json',
            'Authorization': uni.getStorageSync('token'),
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
    }

    interceptors = {
        request: (func) => {
            if (func) {
                MinRequest[requestBefore] = func
            } else {
                MinRequest[requestBefore] = (request) => request
            }

        },
        response: (func) => {
            if (func) {
                MinRequest[requestAfter] = func
            } else {
                MinRequest[requestAfter] = (response) => response
            }
        }
    }

    static[requestBefore](config) {
        return config
    }

    static[requestAfter](response) {
        console.log(response)
        return response
    }

    static[isCompleteURL](url) {
        return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
    }

    setConfig(func) {
        this[config] = func(this[config])
    }

    request(options = {}) {
        options.baseURL = options.baseURL || this[config].baseURL
        options.dataType = options.dataType || this[config].dataType
        options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
        options.data = options.data
        options.header = { 
            ...this[config].header,
						...options.header,
        }

        options.header['Authorization'] = uni.getStorageSync('token');
        options.method = options.method || this[config].method

        options = { ...options,
            ...MinRequest[requestBefore](options)
        }

        return new Promise((resolve, reject) => {
            options.success = function(res) {
                resolve(MinRequest[requestAfter](res))
            }
            options.fail = function(err) {
                reject(MinRequest[requestAfter](err))
            }
            uni.request(options)
        })
    }

    get(url, data = {}, options = {}) {
        options.url = url
        options.data = data
        options.method = 'GET'
        let cookie = uni.getStorageSync('cookie');
        options.header = {
            'content-type': 'application/json',
            'Authorization': uni.getStorageSync('token'),
            cookie: cookie
        }
        return this.request(options)
    }

    post(url, data = {}, options = {}) {
			const cloneObj = JSON.parse(JSON.stringify(options))
        options.url = url
        options.data = data
        options.method = 'POST'
        let cookie = uni.getStorageSync('cookie');
        options.header = {
            'content-type': 'application/json',
            'Authorization': uni.getStorageSync('token'),
            cookie: cookie,
						...cloneObj.header
        }
        return this.request(options)
    }
    delete(url, data, options = {}) {
        options.url = url
        options.data = data
        options.method = 'DELETE'
        let cookie = uni.getStorageSync('cookie');
        options.header = {
            'content-type': 'application/json',
            'Authorization': uni.getStorageSync('token'),
            cookie: cookie
        }
        return this.request(options)
    }

    put(url, data, options = {}) {
        options.url = url
        options.data = data
        options.method = 'PUT'
        let cookie = uni.getStorageSync('cookie');
        options.header = {
            'content-type': 'application/json',
            'Authorization': uni.getStorageSync('token'),
            cookie: cookie
        }
        return this.request(options)
    }
}

export default MinRequest