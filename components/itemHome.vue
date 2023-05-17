<template>
	<view style="padding: 10px; background: #fff;" @click="itemClick">
		<u-row justify="space-between">
			<u-col span="1" justify="start" textAlign="center">
				<u--text v-if="item.fresh" type="primary" text="置顶:" size="12"></u--text>
				<u--text v-else type="primary" text="" size="12"></u--text>
			</u-col>
			<u-col span="6">
				<u--text :text="item.shareUser" color="#cccccc" align="left" mode="name" size="12"></u--text>
			</u-col>
			<u-col span="5">
				<u--text :text="item.shareDate" color="#cccccc" mode="date" size="12"
					format="yyyy-MM-dd hh:mm:ss"></u--text>
			</u-col>
		</u-row>
		<u-text class="title" :text="item.title" :lines="2" margin="5px"></u-text>
		<u-row justify="space-between">
			<u-col span="11" justify="start" textAlign="center">
				<u--text :text="item.superChapterName" color="#cccccc" size="12"></u--text>
			</u-col>
			<u-col span="1">
				<view @click.stop>
					<u-image width="28px" height="28px"
						:src="!item.collect ? '/static/ic_collect_no.png':'/static/ic_collect_yes.png'"
						@click="click"></u-image>
				</view>
			</u-col>
		</u-row>
		<u-line margin="10px 0 0 0"></u-line>
	</view>
</template>

<script setup>
	import apis from '../service/api/index.js'

	const props = defineProps(['item'])

	function itemClick() {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + props.item.link
		})
	}

	function click() {
		if (props.item.collect) {
			apis.uncollect(props.item.id)
		}else {
			apis.collect(props.item.id)
		}
		props.item.collect = !props.item.collect
		uni.showToast({
			title: props.item.collect ? '收藏成功' : '取消收藏'
		})
	}
</script>

<style lang="scss" scoped>

</style>