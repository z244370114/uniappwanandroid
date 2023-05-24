<template>
	<view v-for="(item,index) in list" :key="index" style="padding: 20rpx 20rpx; background: #FFFFFF;"
		@click="itemClick(item)">
		<view style="display: flex; flex-direction: row; justify-content: space-between; padding: 10rpx 0rpx;">
			<view style="color: #666666; font-size: 24rpx;">{{!!item.author ? item.author : "匿名" }}</view>
			<view style="color: #666666; font-size: 24rpx;">{{item.niceDate}}</view>
		</view>
		<view style="color: black; font-size: 28rpx;">{{item.title}}</view>
		<view><text class="txt_des">{{item.desc}}</text></view>
		<view
			style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 10rpx 0rpx;">
			<view style="color: #666666; font-size: 24rpx; margin-top: 20rpx;">{{item.chapterName}}</view>
			<view @click.stop>
				<u-image width="28px" height="28px"
					:src="item.zan != 0 ? '/static/ic_collect_no.png':'/static/ic_collect_yes.png'"
					@click="zanClick(index)"></u-image>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { onLoad } from '@dcloudio/uni-app'
	import apis from '@/service/api/index.js'

	const page = ref(0)
	const list = ref([])


	onLoad((options) => {
		loadData()
	})

	async function loadData() {
		let data = await apis.collectionList(page.value)
		list.value = data.datas
	}

	function itemClick(item) {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + item.link
		})
	}

	function zanClick(index) {
		let item = list.value[index]
		if (item.zan != 0) {
			apis.uncollect(item.id)
			item.zan = 1
		} else {
			apis.collect(item.id)
			item.zan = 0
		}
		item.collect = !item.collect
		list.value[index] = item
		uni.showToast({
			title: item.collect ? '收藏成功' : '取消收藏'
		})
	}
</script>

<style>
	.txt_des {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #666666;
		font-size: 24rpx;
	}
</style>