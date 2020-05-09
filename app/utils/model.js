class ModelHelper {
  constructor() {
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.yearRegex = /^\d{4}$/;
  }

  required(label = '') {
    if (label) {
      return [true, `${label} is required`];
    }
    return [true, '{PATH} is required'];
  }

  categoryType() {
    const retVal = {
      values : ["mirrorless", "full frame", "point and shoot"],
      message: 'Invalid value provided for {PATH} with value `{VALUE}`',
    };
    return retVal;
  }

  validateEmail = (email = '') => this.emailRegex.test(String(email).toLowerCase());

  validateYear = (year = '') => this.yearRegex.test(String(year));
}

module.exports = new ModelHelper();