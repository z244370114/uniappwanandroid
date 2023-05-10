<template>
	<view class="regist">
		<u-toast ref="uToast"></u-toast>
		<view class="title">
			<view>注册用户</view>
			<view>用户注册后才可登录</view>
		</view>
		<u-input placeholder="用户名" border="bottom" v-model.trim="obj.username"></u-input>
		<u-input type="password" placeholder="密码" border="bottom" v-model.trim="obj.password"></u-input>
		<u-input type="password" placeholder="再输入一次密码" border="bottom" v-model.trim="obj.repassword"></u-input>
		<u-button type="primary" size="small" text="注册" @click="regist"></u-button>
		<view class="text" @click="goLogin">已有账户，去登录</view>
	</view>
</template>

<script>
import apis from '../../service/api/index.js'
	export default {
		data() {
			return {
				obj: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			goLogin() {
				uni.navigateBack()
			},
			async regist() {
				if (!this.obj.username) {
					return this.$refs.uToast.show({
						message: '请输入用户名',
						duration: 700
					})
				}
				if (!this.obj.password) {
					return this.$refs.uToast.show({
						message: '请输入密码',
						duration: 700
					})
				}
				if (!this.obj.repassword) {
					return this.$refs.uToast.show({
						message: '请再次输入密码',
						duration: 700
					})
				}
				if (this.obj.password !== this.obj.repassword) {
					return this.$refs.uToast.show({
						message: '两次输入的密码不一致',
						duration: 700
					})
				}
				const res = await apis.regist(this.obj)
				console.log(res,11)
				if (res) {
					await this.$refs.uToast.show({
						message: '注册成功！即将跳转到首页',
						complete() {
							uni.reLaunch({
								url: '/pages/home/index'
							})
						}
					})
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	.regist {
		width: 100%;
		height: 100%;
		padding: 50px 30px 0;
		box-sizing: border-box;

		.title {
			:first-child {
				font-size: 16px;
				color: black;
				margin-bottom: 5px;
			}

			:last-child {
				font-size: 12px;
				color: #ccc;
			}

			margin-bottom: 20px;
		}

		::v-deep .u-input {
			margin-bottom: 30px;
			padding-left: 0 !important;
		}

		::v-deep .u-button {
			margin-bottom: 15px;
		}

		.text {
			font-size: 14px;
			color: #ccc;
			text-align: right;
		}
	}
</style>