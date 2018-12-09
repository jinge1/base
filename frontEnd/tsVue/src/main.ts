// import Vue from "vue";

import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Hel from './comps/Hel.vue'

// new Vue({
//     el: "#app",
//     template: `
//     <div>
//         <div>Hello {{name}}!</div>
//         Name: <input v-model="name" type="text">
//     </div>`,
//     data: {
//         name: "World"
//     }
// });

const app = new Vue({
    el: '#app',
    // router,
    render: h => h(Hel)
})
