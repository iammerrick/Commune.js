(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['q'], factory);
  } else {
    root.Commune = factory(root.Q);
  }
}(this, function (Q) {

/**
 * Private function for uniquely signing messages.
 */
function guid() {
  var numbers = [];
  var i;

  for (i = 0; i < 5; i++) {
    numbers.push((Math.floor(Math.random() * 1e8)).toString(36));
  }
  return numbers.join('-');
}

/**
 * Let us commune!
 */
function Commune(options) {
  options = options || {};
  this.channel = options.channel || window;
  this.target = options.target || '*';
  this.tasks = {};
  
  this.channel.addEventListener('message', this.dispatch.bind(this), false);
}

/**
 * Makes sense to export Q as we are also providing promises
 * as the api.
 */
Commune.Q = Q;

/**
 * Looks up the promise in the waiting tasks queue
 * and resolves it.
 */
Commune.prototype.dispatch = function(e) {
  this.tasks[e.data.guid].resolve(e.data.message);
};

/**
 * Sign a message and send it.
 */
Commune.prototype.message = function(message) {

  var deferred = Q.defer();
  var id = guid();

  this.tasks[id] = deferred;
  this.channel.postMessage({
    message: message,
    guid: id
  }, this.target);

  return deferred.promise;
};


return Commune;

}));

