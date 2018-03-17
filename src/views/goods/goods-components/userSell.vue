<style scoped>
.goods_icon{
	width: 100%;
	height: 100px;
}
</style>
<template>
	<Card :dis-hover="true">
		<p slot="title">
			<router-link :to="{ name: 'sell', params: { uid }}">
	            <Icon type="android-playstore"></Icon>
	            TA 的出售
	            <Badge :count="total" class-name="bd-disabled"></Badge>
	        </router-link>
        </p>
        <span slot="extra" @click="changeData" class="btn">
        	换一波
            <Icon type="ios-loop-strong"></Icon>
        </span>
        <Row :gutter="15">
        	<Spin fix v-if="loading"></Spin>
        	<Col span="12" v-for="(item, index) in randomData" class="mt10" :key="index">
	        	<router-link :to="{ name: 'goods', params: { gid: item.goods_id }}">
	        		<img class="goods_icon" :src="item.goods_icon[0].url" alt="">
	        	</router-link>
        	</Col>
        </Row>
	</Card>
</template>
<script>
	export default{
		props: ['uid'],
		data () {
			return {
				data: [],
				randomData: [],
				loading: false,
				total: 0
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.goods.get({
					uid: this.uid,
					num: 8
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
						this.total = res.total;
						this.changeData();
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			changeData () {
				let _this = this;
				function getArrayItems(arr, num) {
					_this.loading = true;
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    setTimeout(function () {
						_this.loading = false;
					}, 0);
                    return return_array;
                }
                this.randomData = getArrayItems(this.data, 4);
            }
		}
	}
</script>