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
  })();
