//shim to match TypeScript's Implicit Modules
define( ['libs/lodash-1.0.0-rc3', 'exports'], function(_, exports) {
    exports._ = _;
});