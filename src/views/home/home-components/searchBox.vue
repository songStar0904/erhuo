<template>
  <Card :padding="8" dis-hover>
        <Row>
          <Col span="12">热搜：
            <Button type="text" v-for="item in hot">{{item.search_name}}</Button>
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
          search_name: '英语'
        }, {
          search_name: '四级'
        }, {
          search_name: 'javascript'
        }],
        search: ''
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        this.get_hot();
      },
      get_hot () {
        this.$fetch.main.get_hot({
          num: 5
        }).then(res => {
          if (res.code === 200) {
            this.hot = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        })
      }
    }
  }
</script>