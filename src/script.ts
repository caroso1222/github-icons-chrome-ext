import { GitHubIconReplacer } from './main';

document.addEventListener('assetsURLEvent', function (e: any) {
  requestAnimationFrame(() => {
    new GitHubIconReplacer(e.detail + '/');
  });
});
