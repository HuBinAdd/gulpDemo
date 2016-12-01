<script>
   (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth > 750){
            clientWidth = 750;
          }
          docEl.style.fontSize = clientWidth / 7.5+ 'px';
        };
      if (!doc.addEventListener) return;
      recalc();
    })(document, window);
</script>