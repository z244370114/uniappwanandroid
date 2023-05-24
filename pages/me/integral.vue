<template>
	<view>
		<view></view>
		<view class="item-view" v-for="(item,index) in list" :key="index">
			<view>
				<view class="txt-title">{{item.reason +" " +item.coinCount}}</view>
				<view class="txt-date">{{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}}</view>
			</view>
			<view style="color: #1296db; font-size: 28rpx; font-weight: 500;">
				{{item.coinCount}}
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import moment from 'moment'
	import apis from '../../service/api/index.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from "vue";

	onLoad(() => {
		getData()
	})

	const page = ref(0)
	const list = ref([])

	async function getData() {
		let data = await apis.myIntegralList(page.value)
		list.value = data.datas
	}
</script>

<style lang="scss" scoped>
	.item-view {
		flex-direction: row;
		display: flex;
		padding: 30rpx 30rpx;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;
	}

	.txt-title {
		font-size: 28rpx;
		color: #000000;
	}

	.txt-date {
		font-size: 24rpx;
		color: #666666;
	}
</style>