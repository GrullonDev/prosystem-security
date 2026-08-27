(function () {
  var VERSION_URL = "/version.json";
  var STORAGE_KEY = "psx_build_version";

  function clearStaleCaches() {
    if (window.caches && caches.keys) {
      caches.keys().then(function (names) {
        names.forEach(function (name) {
          caches.delete(name);
        });
      });
    }
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (reg) {
          reg.unregister();
        });
      });
    }
  }

  fetch(VERSION_URL, { cache: "no-store" })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (data) {
      if (!data || !data.version) return;

      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored !== data.version) {
        clearStaleCaches();
        localStorage.setItem(STORAGE_KEY, data.version);
        window.location.reload();
      } else if (!stored) {
        localStorage.setItem(STORAGE_KEY, data.version);
      }
    })
    .catch(function () {});
})();
