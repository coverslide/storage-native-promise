'use strict';

module.exports = StoragePromiseWrapper;

function StoragePromiseWrapper (storage) {
  // test for proper implementation
  if (!implementationCheck(storage)) {
    throw new Error('Object does not implement the Storage interface');
  }
  this.storage = storage;
}

StoragePromiseWrapper.prototype.key = promisify('key');
StoragePromiseWrapper.prototype.clear = promisify('clear');
StoragePromiseWrapper.prototype.getItem = promisify('getItem');
StoragePromiseWrapper.prototype.setItem = promisify('setItem'); 
StoragePromiseWrapper.prototype.removeItem = promisify('removeItem');

function implementationCheck (s) {
  return typeof s.key === 'function' &&
    typeof s.clear === 'function' &&
    typeof s.getItem === 'function' &&
    typeof s.setItem === 'function' &&
    typeof s.removeItem === 'function';
}

function promisify (name) {
  return function () {
    var storage = this.storage;
    var args = arguments;
    return new Promise (function (resolve, reject) {
      try {
        resolve(storage[name].apply(storage, args));
      } catch (e) {
        reject(e);
      }
    });
  }
}