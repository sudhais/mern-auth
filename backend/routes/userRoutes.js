import { Router } from 'express';
import { deleteUser, google, login, registerUser,updateUser, signout} from '../Controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

//router objetct
const router = Router();
// const router = express.Router();      //when we import express only

//routers
//LOGIN USER
router.route('/login').post(login);

//REGISTER USER
router.route('/register').post(registerUser);
// router.post('/register',registerUser)

router.route('/google').post(google);

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/signout', signout);


export default router