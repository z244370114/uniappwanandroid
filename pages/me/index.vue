<template>
	<view>
		<view class="bg-view">
			<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" :lazy-load="true" :fade="true"
				duration="450" width="80px" height="80px"></u--image>
			<u--text align="center" color="#fff" margin="10px" text="玩Android"></u--text>
			<u--text align="center" color="#fff" text="id"></u--text>
			<u-text align="center" color="#fff" text="去登录" @click="goLogin"></u-text>
		</view>
		<u-cell-group border="false">
			<view v-for="(item, index) in itemList" :key="index">
				<u-cell icon="setting-fill" size="mini" :title="item.title" isLink :url="item.pageUrl"></u-cell>
			</view>
		</u-cell-group>
	</view>
</template>

<script lang="ts" setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import { ref } from "vue";

	const itemList = ref([
		{
			"title": "我的积分",
			"icon": "",
			"pageUrl": "pages/me/integral",

		}, {
			"title": "我的分享",
			"icon": "",
			"pageUrl": "pages/me/share",
		}, {
			"title": "我的收藏",
			"icon": "",
			"pageUrl": "pages/me/collect",
		}, {
			"title": "阅读历史",
			"icon": "",
			"pageUrl": "pages/me/history",
		}, {
			"title": "关于作者",
			"icon": "",
			"pageUrl": "pages/me/author",
		},
	])


	onLoad((option) => {

	})

	function goLogin() {
		uni.navigateTo({
			url: '/pages/login/login'
		})
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