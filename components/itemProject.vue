<template>
	<view style="padding: 10px; background: #fff;" @click="itemClick">
		<u-row justify="space-between">
			<u-col span="8">
				<u--text :text="item.author" color="#cccccc" align="left" mode="name" size="12"></u--text>
			</u-col>
			<u-col span="3">
				<u--text :text="item.shareDate" color="#cccccc" mode="date" size="12"></u--text>
			</u-col>
		</u-row>
		<u-row>
			<u--image :showLoading="true" :src="item.envelopePic" width="100px" height="80px"></u--image>
			<view>
				<u-text :text="item.title" :lines="2" margin="5px"></u-text>
				<u-text :text="item.desc" :lines="2" color="#cccccc" margin="5px"></u-text>
			</view>
		</u-row>
		<u-row justify="space-between">
			<u-col span="11" justify="start" textAlign="center">
				<u--text :text="item.superChapterName" color="#cccccc" size="12"></u--text>
			</u-col>
			<u-col span="1">
				<u-image width="28px" height="28px"
					:src="item.zan == 0 ? '/static/ic_collect_no.png':'/static/ic_collect_yes.png'"
					@click="zanClick"></u-image>
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
</script>

<style lang="scss" scoped>

</style>