<template>
	<Card :padding="8" dis-hover>
        <Row>
	        <Col span="12">热搜：
	          <Button type="text" v-for="item in hot">{{item.title}}</Button>
	        </Col>
	        <Col span="12">
	        	<Input v-model="search">
			        <Button slot="append" icon="ios-search"></Button>
			    </Input>
	        </Col>
	    </Row>
    </Card>
</template>
<script>
  export default{
  	data () {
  		return {
  			hot: [{
  				title: '英语'
  			}, {
  				title: '四级'
  			}, {
  				title: 'javascript'
  			}],
  			search: ''
  		}
  	}
  }
</script>