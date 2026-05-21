/* ============================================================
   Checkbox Matter Management landing page · scripts
   Modal open/close, product tabs, FAQ accordion, logo fallback.
   Hosted on GitHub, served via CDN, loaded before </body>.
   ============================================================ */

(function() {
  function init() {
    /* ============================================================
         Modal open/close
         ============================================================ */
      (function() {
        var modal = document.getElementById('demo-modal');
        function openModal() {
          modal.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
        function closeModal() {
          modal.classList.remove('is-open');
          document.body.style.overflow = '';
        }
        document.querySelectorAll('[data-action="open-demo-modal"]').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
          });
        });
        modal.querySelectorAll('[data-modal-close]').forEach(function(el) {
          el.addEventListener('click', closeModal);
        });
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
      })();

      /* ============================================================
         Product tabs (Board / Table / Detail)
         ============================================================ */
      (function() {
        var tabs = document.querySelectorAll('.product-tab');
        var panes = document.querySelectorAll('.pane');
        tabs.forEach(function(tab) {
          tab.addEventListener('click', function() {
            var target = tab.getAttribute('data-pane');
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panes.forEach(function(p) { p.classList.remove('active'); });
            tab.classList.add('active');
            document.querySelector('.pane[data-pane="' + target + '"]').classList.add('active');
          });
        });
      })();

      /* ============================================================
         FAQ accordion
         ============================================================ */
      (function() {
        var items = document.querySelectorAll('.faq-item');
        items.forEach(function(item) {
          var q = item.querySelector('.faq-q');
          q.addEventListener('click', function() {
            // Allow multiple open at once for browsing; if you want one-at-a-time,
            // uncomment the closing loop below.
            // items.forEach(function(i) { if (i !== item) i.classList.remove('open'); });
            item.classList.toggle('open');
          });
        });
      })();

      /* ============================================================
         Logo fallback · swap broken/blocked images for styled text
         so the social-proof strip never shows broken-image icons.
         Once deployed under checkbox.ai the real logos load and this
         script is a no-op.
         ============================================================ */
      (function() {
        function fallback(img) {
          if (!img.parentNode) return;
          var span = document.createElement('span');
          span.className = 'cust-logo-text';
          span.textContent = img.getAttribute('data-name') || img.getAttribute('alt') || '';
          img.parentNode.replaceChild(span, img);
        }
        function check(img) {
          // naturalWidth === 0 means the browser couldn't render the image
          if (img.complete && img.naturalWidth === 0) fallback(img);
          else if (!img.complete) {
            img.addEventListener('error', function() { fallback(img); });
            img.addEventListener('load', function() {
              if (img.naturalWidth === 0) fallback(img);
            });
          }
        }
        document.querySelectorAll('#logoRow .cust-logo').forEach(check);
      })();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
