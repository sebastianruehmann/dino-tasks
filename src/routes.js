import TasklistForm from './TasklistForm.vue'
import Dashboard from './Dashboard.vue'
import Scanner from './Scanner.vue'

export default [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/scanner', name: 'scanner', component: Scanner },
  { path: '/tasklist/add', name: 'tasklist.add', component: TasklistForm },
  { path: '/tasklist/:id', name: 'tasklist.edit', component: TasklistForm }
]
