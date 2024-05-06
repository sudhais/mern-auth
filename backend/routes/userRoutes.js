import { Router } from 'express';
import { login, registerUser,} from '../Controllers/userController.js';

//router objetct
const router = Router()

//routers
//LOGIN USER
router.route('/login').post(login);

//REGISTER USER
router.route('/register').post(registerUser);
// router.post('/register',registerUser)


export default router