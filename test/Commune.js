describe('Commune', function() {
  var instance, channel;

  beforeEach(function() {
    channel = jasmine.createSpyObj('channel', ['postMessage']);
    receiver = jasmine.createSpyObj('receiver', ['addEventListener']);
    instance = new Commune({
      channel: channel,
      receiver: receiver
    });
  });

  describe('constructor', function() {
    it('should create a new object', function() {
      expect(instance).toBeDefined();
    });

    it('should listen for the message event', function() {
      expect(receiver.addEventListener).toHaveBeenCalledWith('message', jasmine.any(Function), false);
    });

    it('should allow me to override the target', function() {
      var targeted = new Commune({
        channel: channel,
        target: 'http://domo.com'
      });

      targeted.message('targeted');
      expect(channel.postMessage).toHaveBeenCalledWith(jasmine.any(Object), 'http://domo.com');
    });
  });

  describe('message', function() {
    it('should send a message and return a promise', function() {
      expect(instance.message('attempt').then).toBeDefined();
    });

    it('should overload a string into the object', function() {
      instance.message('attempt');
      expect(channel.postMessage).toHaveBeenCalledWith(jasmine.objectContaining({
        message: 'attempt'
      }), '*');
    });
  });

  describe('signed messages', function() {
    it('should sign messages with a valid guid', function() {
      instance.message('some message');
      expect(channel.postMessage.mostRecentCall.args[0].guid).toMatch(/([^\-]*\-){4}/);
    });
  });

  describe('dispatch', function() {
    it('should dispatch to the correct promise', function() {
      var done = false;

      runs(function(){
        var promise = instance.message('ping');
        instance.dispatch({
          data: {
            message: 'pong',
            guid: channel.postMessage.mostRecentCall.args[0].guid
          }
        });

        promise.then(function(response) {
          expect(response).toEqual('pong');
          done = true;
        });
      });


      waitsFor(function() {
        return done;
      });
    });
  });

});
