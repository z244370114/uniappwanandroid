<template>
	<view class="bg-view">
		<u-toast :ref="uToast"></u-toast>
		<u--image class="uimage" width="80" height="80" src="https://wanandroid.com/resources/image/pc/logo.png" :fade="true" duration="450" shape="circle"></u--image>
		<u--input placeholder="请输入用户名" border="surround" v-model="username" @change="changeUser"></u--input>
		<view style="height: 20px;"></view>
		<u--input placeholder="请输入密码" type="password" border="surround" v-model="password" clearable
			@change="changePass"></u--input>
		<view style="height: 20px;"></view>
		<u-button type="primary" size="small" text="登录" @click="login"></u-button>
	</view>

</template>

<script lang="ts" setup>
	import apis from '../../service/api/index.js'
	import { ref } from "vue"
	import api from '../../service/api/index.js';
	const uToast = ref()

	const username = ref('')
	const password = ref('')

	function changeUser(values) {
		username.value = values
	}

	function changePass(values) {
		password.value = values
	}

	function showToast(params) {
		uToast.value.show({
			...params,
			complete() {
			}
		})
	}

const login = async () => {
	console.log('------')
	const res = await apis.Login({
		username: username.value,
		password: password.value
	})
	console.log(res)
	console.log('------')
	const a = await apis.collectionList()
	await apis.homeList()
	console.log(a)
}
	function logi2n() {
		uni.request({
			url: 'https://www.wanandroid.com/user/login',
			method: "POST",
			header: {
			        'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			    },
			data: {
				"username": username.value,
				"password": password.value
			},
			success: (res => {
				if (res.data.errorCode == 0) {
					console.log(res)
					uni.setStorageSync('token',JSON.stringify(res.cookies))
					// uni.navigateBack()
				} else if (res.data.errorCode == -1) {
					uni.showToast({
						title: res.data.errorMsg
					})
				}
			}),
		})
	}
</script>

<style lang="scss" scoped>
	.bg-view {
		flex-direction: column;
		display: flex;
		padding: 50px 30px;
		::v-deep .u-transition {
			margin-bottom: 20px;
			display: flex;
			align-items: center;
		}
	}
</style>
