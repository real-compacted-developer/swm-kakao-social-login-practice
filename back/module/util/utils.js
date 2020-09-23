const util = {
  successTrue: (status, message, data) => {
    return {
      status: status,
      message: message,
      data: data,
      success: true
    }
  },
  successFalse: (status, message) => {
    return {
      status: status,
      message: message,
      success: false
    }
  }
};

module.exports = util;