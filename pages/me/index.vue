<template>
	<view>
		<view class="bg-view">
			<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" :lazy-load="true" :fade="true"
				duration="450" width="80px" height="80px"></u--image>
			<u--text align="center" color="#fff" margin="10px" text="玩Android"></u--text>
			<view>
				<u-text v-if="!isLogin" align="center" color="#fff" text="去登录" @click="goLogin"></u-text>
				<u-text v-else align="center" color="#fff" :text="userInfo.value.username"></u-text>
				<!-- <u-text v-else align="center" color="#fff" :text="userInfo.value.username"></u-text> -->
			</view>
		</view>
		<u-cell-group border="false">
			<view v-for="(item, index) in itemList" :key="index">
				<u-cell :icon="item.icon" size="mini" :title="item.title" isLink :url="item.pageUrl" @click="cellClick"
					:name="item.name"></u-cell>
			</view>
		</u-cell-group>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import apis from '../../service/api/index.js'
	import {
		computed,
		reactive,
		ref
	} from "vue";

	const itemList = ref([{
		"title": "我的积分",
		"icon": "/static/ic_integral.png",
		"pageUrl": "pages/me/integral",
	}, {
		"title": "我的分享",
		"icon": "/static/ic_share.png",
		"pageUrl": "pages/me/share",
	}, {
		"title": "我的收藏",
		"icon": "/static/ic_collect.png",
		"pageUrl": "pages/me/collect",
	}, {
		"title": "阅读历史",
		"icon": "/static/ic_history.png",
		"pageUrl": "pages/me/history",
	}, {
		"title": "关于作者",
		"icon": "/static/ic_author.png",
		"pageUrl": "pages/me/author",
	}])

	const userInfo = reactive({})

	const isLogin = computed(() => {
		return !userInfo.value || Object.keys(userInfo.value).length === 0 ? false : true
	})
	onLoad((option) => {
		const info = JSON.parse(uni.getStorageSync('userInfo') || '{}') || {}
		userInfo.value = info
		if (Object.keys(userInfo.value).length) {
			itemList.value.push({
				"title": "退出登录",
				"icon": "/static/ic_logut.png",
				"pageUrl": "",
				"name": 'loginOut'
			})
		}
	})

	function goLogin() {
		uni.navigateTo({
			url: '/subPagesA/login/login'
		})
	}

	const cellClick = async (params) => {
		if (params.name === 'loginOut') {
			const res = await apis.loginOut()
			uni.removeStorageSync('userInfo')
			uni.reLaunch({
				url: '/pages/me/index'
			})
		}
	}
</script>


<style lang="scss" scoped>
	.bg-view {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		background: $u-primary;
		padding: 30px 30px;
		align-items: center;
		justify-content: center;
	}
</style>