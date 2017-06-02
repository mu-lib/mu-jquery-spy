(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-jquery-spy/jquery.spy"] = factory.call(root);
  }
})([], this, function () {
  return function (selector, callback, type) {
    var me = this;
    var $ = me.constructor;
    var cache = {};

    return me
      .find(selector)
      .map(function (i, spy) {
        var targets = callback.call(me, spy);
        var $spies = cache[targets] || (cache[targets] = me.find(targets));
        var $spy = $(spy);

        return $spies.length === 0
          ? $spy.triggerHandler(type)
          : $spies
            .map(function (j, target) {
              return $spy.triggerHandler(type, target);
            })
            .get();
      });
  }
});
