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
						:src="item.zan == 0 ? '/static/ic_collect_no.png':'/static/ic_collect_yes.png'"
						@click="click"></u-image>
				</view>
			</u-col>
		</u-row>
		<u-line margin="10px 0 0 0"></u-line>
	</view>
</template>

<script setup>
	const pros = defineProps(['item'])

	function itemClick() {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + pros.item.link
		})
	}

	function click() {
		uni.showToast({
			title: '测试'
		})
	}
</script>

<style lang="scss" scoped>

</style>