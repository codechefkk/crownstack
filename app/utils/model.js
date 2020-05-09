class ModelHelper {
  required(label = '') {
    if (label) {
      return [true, `${label} is required`];
    }
    return [true, '{PATH} is required'];
  }

  validateEmail(email = '') {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}

module.exports = new ModelHelper();