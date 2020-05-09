// import packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class BaseHelper {
  /**
   * @desc To compare password using bcrypt
   * @param password posted password
   * @param userPassword db password
   *
   * @return true/false
   */
  comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }

  /**
   * @desc To generate error object
   * @param message contains error message
   *
   * @return object
   */
  error(message) {
    return  {
      status: 'error',
      error : message,
      data  : null,
    };
  }

  /**
   * @desc To generate access token using jwt for current user
   * @param user contains user object
   */
  generateToken(user) {
    const token  = jwt.sign({
      email: user.email.address,
      _id: user.id,
    }, "crownstack");
    return token;
  }

  /**
   * @desc To get the token data
   * @param user object
   *
   * @return tokenData
   */
  getTokenData(user) {
    if (!user) {
      return false;
    }

    const tokenData = {
      userId: user.id,
      token : this.generateToken(user),
    };

    return tokenData;
  }

  /**
   * @desc To log messages
   * @param value - string or object
   *
   * @return
   */
  log(...args) {
    args.map(value => console.log(value));
  }

  /**
   * @desc To validate required fields
   * @param {Object} data
   * @param {Object} fields Response
   *
   * @return {Object/Bool}
   */
  required(data, fields = []) {
    const error = [];

    fields.forEach((field) => {
      const fieldKey = field.charAt(0).toUpperCase() + field.slice(1);
      if (!(data[field] || data[field] === false)) {
        error.push(`${fieldKey} is required`);
      }
    });

    return error.length ? error : false;
  }

  /**
   * @desc To generate response
   * @param res response object
   * @param obj data
   * @param status response status code
   *
   * @return
   */
  response(res, obj, status) {
    res.format({
      json: () => {
        if (status) return res.status(status).json(obj);
        return res.json(obj);
      },
    });
  }

  /**
   * @desc To set password using bcrypt
   * @param password
   *
   * @return uPassword
   */
  setPassword(password) {
    const salt      = bcrypt.genSaltSync(10);
    const uPassword = bcrypt.hashSync(password, salt);
    return uPassword;
  }

  /**
   * @desc To generate success object
   * @param data
   * @param result object
   *
   * @return object
   */
  success(data, result = '') {
    let retVal = {};
    if (result) {
      retVal = result;
    } else {
      retVal.data = data;
    }
    retVal.status = 'ok';

    return retVal;
  }

  /**
   * @desc To trim the data
   * @param {Object} obj
   *
   * @return {Object} data
   */
  trimData(obj) {
    const data = { ...obj };
    Object.keys(data).forEach((key) => {
      if (typeof (obj[key]) === 'string') {
        data[key] = obj[key].trim();
      }
    });
    return data;
  }

  /**
   * @desc To validate required fields
   * @param data object
   * @param fields Response object
   *
   * @return
   */
  validateRequired(data, fields) {
    const error = this.required(data, fields);
    if (error && error.length) {
      throw new Error(error[0]);
    }
  }

  /**
   * @desc To log error messages
   * @param error - string or object
   *
   * @return
   */
  warn(...args) {
    args.map(err => console.warn(err));
  }
}

module.exports = new BaseHelper();
