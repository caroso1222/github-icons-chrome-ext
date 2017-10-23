import { GitHubIconReplacer } from './main';

let githubIconReplacer: GitHubIconReplacer;

document.addEventListener('assetsURLEvent', function (e: any) {
  requestAnimationFrame(() => {
    githubIconReplacer = new GitHubIconReplacer(e.detail + '/');
  });
});


document.addEventListener('onURLUpdated', function (e: any) {
  requestAnimationFrame(() => {
    // console.log('URL Updated');
  });
});

let target = document.body;


// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

let observer2 = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      console.log(mutation);
      requestAnimationFrame(() => {
        if (mutation.addedNodes.length) {
          console.log('detected changes inner and running algo');
          githubIconReplacer.init();
        }
      })
    }
  });    
});

// create an observer instance
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      requestAnimationFrame(() => {
        console.log('starting script');
        let target2 = document.querySelector('.repository-content');
        console.log(target2);
        observer2.observe(target2, config);

        githubIconReplacer.init();

        // var readyStateCheckInterval = setInterval(function () {
        //   if (document.readyState === 'complete') {
        //     clearInterval(readyStateCheckInterval)
        //   }
        // }, 10)

      })
    }
  });    
});


// pass in the target node, as well as the observer options
observer.observe(target, config);