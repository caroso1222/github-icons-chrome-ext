import { GitHubIconReplacer } from './main';

document.addEventListener('assetsURLEvent', function (e: any) {
  requestAnimationFrame(() => {
    new GitHubIconReplacer(e.detail + '/');
  });
});


document.addEventListener('onURLUpdated', function (e: any) {
  requestAnimationFrame(() => {
    //new GitHubIconReplacer(e.detail + '/');
    console.log('url updated');
  });
});

