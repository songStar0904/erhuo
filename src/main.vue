<style lang="less" scoped>
@import "./style/common.css";
  @import "./main.less";
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <meau-header></meau-header>
            </Header>
            <router-view></router-view>
            <Footer class="layout-footer-center">2017-2018 &copy; Songstar</Footer>
        </Layout>
    </div>
</template>
<script>
import {meauHeader} from './views/main-components';
    export default {
        components: {
            meauHeader
        },
        created () {
            this.init()
        },
        methods: {
            init () {
                this.$store.commit('getUser');
                this.getClassify();
            },
            getClassify () {
                this.$fetch.classify.get({
                    type: 'gclassify'
                }).then(res => {
                    if (res.code === 200) {
                        this.$store.commit('setClassify', res.data);
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        }
    }
</script>