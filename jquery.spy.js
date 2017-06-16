(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-jquery-spy/jquery.spy"] = factory();
  }
})(this, function () {
  return function (selector, callback, type) {
    var me = this;
    var $ = me.constructor;
    var cache = {};

    return me
      .find(selector)
      .map(function (index, spy) {
        var spies = callback.call(me, spy);

        return spies
          ? {
            spy: $(spy),
            spies: cache[spies] || (cache[spies] = $(spies))
          }
          : undefined;
      })
      .map(function (index, op) {
        var spy = op.spy;
        var spies = op.spies;

        return spies.length === 0
          ? spy.triggerHandler(type)
          : spies
            .map(function (j, target) {
              return spy.triggerHandler(type, target);
            })
            .get();
      });
  }
});
