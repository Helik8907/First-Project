module.exports = fn => {
  return function(req, res, next) {
    // Wrap in Promise.resolve to handle sync and async
    Promise.resolve(fn(req, res, next))
      .catch(next); // only call next on error
  };
};