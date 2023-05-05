import service from '@/service/index'

// json形式
const options = {
	header: {
		contentType: 'application/json'
	}
}

export function homeBanner() {
	return service.get('/banner/json')
}

export function httpPost(data: any) {
	return service.post('/testPost', data, options)
}

export function httpPut(data: any) {
	return service.post('/testPut', data)
}

export function httpDelete(data: any) {
	return service.delete('/testDelete', data)
}