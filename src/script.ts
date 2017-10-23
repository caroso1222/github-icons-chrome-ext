import { GitHubIconReplacer } from './main';

let githubIconReplacer: GitHubIconReplacer;

document.addEventListener('assetsURLEvent', function (e: any) {
  requestAnimationFrame(() => {
    githubIconReplacer = new GitHubIconReplacer(e.detail + '/');
  });
});

setDOMObservers();

document.addEventListener('onURLUpdated', function (e: any) {
  requestAnimationFrame(() => {
    // console.log('URL Updated');
  });
});

/**
 * The DOM will change when a new link is reached from the current page so we'll need 
 * to subscribe to these DOM changes to refresh the icons accordingly
 */
function setDOMObservers() {
  var config = { attributes: true, childList: true, characterData: true };
  
  // This observer will listen to changes in the .repository-content element
  // We set this observer because GitHub is likely to add new DOM elements 
  // inside this element so we need to run the algorithm once again
  let innerObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        requestAnimationFrame(() => {
          if (mutation.addedNodes.length) {
            githubIconReplacer.init();
          }
        })
      }
    });    
  });

  // Create the observer to the document.body. When GitHub navigates to a new page, the whole
  // body is changed is it's impossible to subscribe to any inner element
  let outerObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        requestAnimationFrame(() => {
          githubIconReplacer.init();
          // Once we detect that the document.body has changed, we set up a new observer
          // on a inner element which will be dynamically changed by GitHub in the next
          // milliseconds
          let innerTarget = document.querySelector('.repository-content');
          innerObserver.observe(innerTarget, config);
        })
      }
    });    
  });

  // pass in the target node, as well as the observer options
  let outerTarget = document.body;
  outerObserver.observe(outerTarget, config);

}