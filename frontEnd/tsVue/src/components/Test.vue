<template>
  <div>
    <div>Count: {{ count }}</div>
    <button @click="inc(6)">+</button>
    <button @click="dec">-</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions} from 'vuex'
import Component from 'vue-class-component'
import {Getter, Action} from 'vuex-class'


@Component<Counter>({
    methods: {
        ...mapActions(['inc', 'dec'])
    }
})
export default class Counter extends Vue {
    @Getter count: number;
    // @Action('app/name') name: any;

    created() {
        // this.name({name: 'Counter'});
    }

}
</script>
<style scoped>
.demo{
  color:red;
}
</style>
