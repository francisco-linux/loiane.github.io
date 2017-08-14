'use strict';

// add link icon to post titles
/*((window, document, undefined) => {
  linkjuice.init('.post__content', {
    selectors: ['h2', 'h3', 'h4', 'h5'],
    contentFn: node => `
        <a href="#${node.id}" class="linkjuice">
          <span class="linkjuice-icon">
            <i class="linkjuice__icon"></i>
          </span>
          ${node.innerHTML}
        </a>
      `
  });
})(window, document);*/

//register service worker
/*((window, document, undefined) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function() {
      console.log('Service Worker Registered');
    });
  }
})(window, document);
*/
