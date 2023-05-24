<template>
	<view style="padding: 10px; background: #fff;" @click="itemClick">
		<u-row justify="space-between">
			<u-col span="8">
				<u--text :text="item.author" color="#cccccc" align="left" mode="name" size="12"></u--text>
			</u-col>
			<u-col span="4">
				<u--text :text="item.niceShareDate" color="#cccccc" align="right" size="12"></u--text>
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
						:src="item.zan == 0 ? '/static/ic_collect_no.png':'/static/ic_collect_yes.png'"
						@click="zanClick"></u-image>
				</view>
			</u-col>
		</u-row>
		<u-line margin="10px 0 0 0"></u-line>
	</view>
</template>

<script setup>
	const pros = defineProps(['item'])
	import {
		onMounted
	} from "vue";

	onMounted(() => {

	})

	function itemClick() {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + pros.item.link
		})
	}

	function zanClick() {
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