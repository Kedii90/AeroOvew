import { createRouter, createWebHashHistory } from 'vue-router'
import overView from "../views/tripOverView.vue"
import analyse from "../views/tripAnalyse.vue"

const routes = [{
          path:"/tripOverView",
          component:overView,
      },{
          path:"/tripAnalyse",
          component:analyse
      }
    
];
const router = createRouter({
    history:createWebHashHistory(),
    routes   
})

export default router;