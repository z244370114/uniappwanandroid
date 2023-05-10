<template>
	<view class="bg-view">
		<u-toast :ref="uToast"></u-toast>
		<u--image class="uimage" width="100" height="100" src="https://wanandroid.com/resources/image/pc/logo.png" :fade="true" duration="450" shape="circle"></u--image>
		<u--input placeholder="请输入用户名" border="surround" v-model="username" @change="changeUser"></u--input>
		<view style="height: 20px;"></view>
		<u--input placeholder="请输入密码" type="password" border="surround" v-model="password" clearable
			@change="changePass"></u--input>
		<view class="text" @click="goRegist">没有账号？去注册</view>
		<view style="height: 20px;"></view>
		<u-button type="primary" size="small" text="登录" @click="login"></u-button>
	</view>

</template>

<script lang="ts" setup>
	import apis from '../../service/api/index.js'
	import { ref } from "vue"
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
	const res = await apis.Login({
		username: username.value,
		password: password.value
	})
	uni.setStorageSync('userInfo', JSON.stringify(res))
	uni.reLaunch({
		url: '/pages/home/index'
	});
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
	const goRegist = () => {
		uni.navigateTo({
			url: '/subPagesA/regist/index'
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
	.text {
		padding-top: 10px;
		text-align: right;
		font-size: 14px;
		color: #ccc;
	}
</style>
