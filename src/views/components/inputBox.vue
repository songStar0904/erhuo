<style scoped>
	.emoji{
		font-size: 24px;
		color: #999;
	}
	.emoji-page{
		position: relative;
		height: 200px;
		overflow-y: scroll;
	}
	.emoji-page ul{
		display: inline-block;
	}
	.emoji-item{
	    margin: 0;
	    padding: 0;
	    width: 38px;
	    height: 38px;
	    padding: 3px;
	    margin-right: 12px;
	    margin-bottom: 12px;
	    line-height: 38px;
	    float: left;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    cursor: pointer;
	    font-size: 12px;
	    background-color: #fff;
	    -webkit-transition: background-color 0.2s ease;
	    transition: background-color 0.2s ease;
	}
	.ps__rail-y{
		display: none;
	    opacity: 0;
	    transition: background-color .2s linear, opacity .2s linear;
	    -webkit-transition: background-color .2s linear, opacity .2s linear;
	    width: 15px;
	    right: 0;
	    position: absolute;
	}
	.ps__thumb-y{
		background-color: #aaa;
		height: 100px;
	    border-radius: 6px;
	    transition: background-color .2s linear, width .2s ease-in-out;
	    -webkit-transition: background-color .2s linear, width .2s ease-in-out;
	    width: 6px;
	    right: 2px;
	    position: absolute;
	}
</style>
<template>
	<div>
		<Input type="textarea" :rows="rows" :placeholder="placeholder" v-model="value" :maxlength="max"></Input>
		<div class="mt10 clearfix">
			<span class="fl bp-icon-font">
				<Poptip width="382" placement="bottom-start">
			        <span class="emoji icon-emoji-btn btn"></span>
			        <div slot="title">表情</div>
			        <div class="api" slot="content">
			        	<div class="emoji-page">
				            <ul>
				            	<li v-for="item in emoji" class="emoji-item" @click="choseEmoji(item)">
				            		<img :src="item.src | filterSrc" alt="">
				            	</li>
				            </ul>
				            <div class="ps__rail-y">
				            	<div class="ps__thumb-y" :style="{top: thumbTop}"></div>
				            </div>
			            </div>

			        </div>
			    </Poptip>
			</span>
			<span class="fr">
				<span :class="{'text-error': hint <= 0}" class="mr20 text-sub">{{hint}}</span>
				<Button type="primary" style="width:100px;" @click="submit">发 布</Button>
				<slot name="cancel" class="ml20"></slot>
		    </span>
		</div>
		
	</div>
</template>
<script>
    import emoji from '../../libs/emoji.js';
	export default {
		props: ['content', 'rows', 'placeholder'],
		data () {
			return {
				max: 233,
				hint: 233,
				value: '',
				emoji,
				thumbTop: 0
			}
		},
		mounted () {
			this.hint = this.max;
		},
		watch: {
			value (val) {
				this.hint = this.max - this.value.replace(/[^\x00-\xff]/g, "x").length;
			},
			content (val) {
				this.value = val;
			}
		},
		filters: {
			filterSrc (val) {
				return `https://s1.hdslb.com/bfs/seed/bplus-common/emoji-assets/xiaodianshi1/${val}.png`;
			}
		},
		methods: {
			submit () {
				if (this.value === '') {
					this.$Message.error('内容不能为空');
				} else {
					this.$emit('submit', this.value);
				}
			},
			choseEmoji (item) {
				this.value += `[${item.name}]`;
			}
		}
	}
</script>