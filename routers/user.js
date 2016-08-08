import Router from 'koa-router'
import {register} from '../controllers/user'
import {home} from '../controllers/home'

const router = new Router()
router.post('/register', register)
router.get('/',home)
router.get('/home',home)
export default router
