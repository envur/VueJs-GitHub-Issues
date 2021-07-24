import Vue from 'vue'
import VueRouter from 'vue-router'
import * as bootstrap from 'bootstrap'
import GitHubIssues from '../components/GitHubIssues.vue'
import GitHubIssue from '../components/GitHubIssue.vue'

Vue.use(VueRouter)
Vue.use(bootstrap)

const routes = [
  {
    path: '/',
    name: 'GitHubIssues',
    component: GitHubIssues
  },
  {
    path: '/:name/:repo/:issue',
    name: 'GitHubIssue',
    component: GitHubIssue
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
