import crypto from 'crypto';

export default class BaseComponent {
  constructor() {}

  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 5) + this.Md5(password));
    return newpassword;
  }

  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
}
