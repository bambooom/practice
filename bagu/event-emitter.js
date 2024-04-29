// please complete the implementation
class EventEmitter {
  constructor() {
    this.subscription = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.subscription.has(eventName)) {
      this.subscription.set(eventName, new Set());
    }
    const curSubscription = this.subscription.get(eventName); // set
    const cbObj = { callback };
    curSubscription.add(cbObj);
    return {
      release: () => {
        curSubscription.delete(cbObj);
        if (curSubscription.size === 0) {
          this.subscription.delete(eventName);
        }
      },
    };
  }

  emit(eventName, ...args) {
    const subscriptions = this.subscription.get(eventName);
    if (subscriptions) {
      subscriptions.forEach((cbObj) => {
        cbObj.callback.apply(this, args);
      });
    }
  }
}

const callback1 = () => console.log(1);
const callback2 = () => console.log(2);

const emitter = new EventEmitter();
const sub1 = emitter.subscribe('event1', callback1);
const sub2 = emitter.subscribe('event2', callback2);
// same callback could subscribe
// on same event multiple times
const sub3 = emitter.subscribe('event1', callback1);
emitter.emit('event1', 1, 2); // callback1 will be called twice
sub1.release();
sub3.release();
// now even if we emit 'event1' again,
// callback1 is not called anymore
