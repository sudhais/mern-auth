import { Router } from 'express';
import { google, login, registerUser,} from '../Controllers/userController.js';

//router objetct
const router = Router();
// const router = express.Router();      //when we import express only

//routers
//LOGIN USER
router.route('/login').post(login);

//REGISTER USER
router.route('/register').post(registerUser);
// router.post('/register',registerUser)

router.route('/google').post(google)


export default router