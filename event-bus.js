class EventBus {
  constructor() {
    this._events = {};
  }

  // emit, dispatchEvent
  publish(eventName, ...args) {
    const cbs = this._events[eventName];
    if (!cbs) {
      return new console.error('no callbacked registered')
    }
    for (let i = 0; i < cbs.length; i++) {
      const cb = cbs[i];
      cb(...args)
    }
  }

  // on, addEventListener
  subscribe(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = []
    }
    this._events[eventName].push(callback)
  }

  // off, removeEventListener
  unsubscribe(eventName, callback) {
    if (!this._events[eventName]) {
      return new Error('events not subscribed')
    }
    if (!callback) {
      delete this._events[eventName]
    } else {
      const index = this._events[eventName].findIndex((el) => el === callback);
      if (index === -1) {
        return new Error('callback not registered');
      }
      this._events[eventName].splice(index, 1);
      if (this._events[eventName].length === 0) {
        delete this._events[eventName];
      }
    }
  }
}
