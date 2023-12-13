const { body} = require("express-validator");
const User = require("./../../Models/UserModel");

exports.UserValidPOST = [
  body('name').isString().withMessage('Please enter your name'),
  body('email')
  .isEmail().withMessage('enter valid email - يجب ادخال الايميل الصحيح')
  .custom(async (value) => {
if(value){
    const user = await User.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject('Email already in use - هذا الايميل مستخدم');
      }
    }
    }),
      body('password').isStrongPassword().withMessage('enter strong password include numbers and signs - يجب أن تكون كلمة المرور قوية. يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز.')

];

exports.UserValidPATCH = [
    body('name').isString().optional().withMessage('Please enter your name'),
    body('email')
    .isEmail().optional().withMessage('enter valid email - يجب ادخال الايميل الصحيح')
    .custom(async (value) => {
  
      const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject('Email already in use - هذا الايميل مستخدم');
        }
      }),
        body('password').isStrongPassword().optional().withMessage('enter strong password include numbers and signs - يجب أن تكون كلمة المرور قوية. يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز.')
  
  ];