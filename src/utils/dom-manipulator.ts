import { GitHubEntity, GitHubEntityType } from './github-entity';

export class GitHubDomManipulator {

  /**
   * Get all GitHub entities from a screen
   * 
   * @returns {GitHubEntity[]} 
   * @memberof GitHubDomManipulator
   */
  getGitHubEntities(): GitHubEntity[] {
    const elems = [].slice.call(document.querySelectorAll('.files tr.js-navigation-item:not(.up-tree)'));
    const entities = elems.map((elem: HTMLElement) => {
      const iconPlaceholder = elem.querySelector('.icon') as HTMLElement;
      // detect the type of the entity by checking the classes of the svg icon
      const svg = iconPlaceholder.querySelector('svg');
      const type = svg.classList.contains('octicon-file-text') ? GitHubEntityType.File : GitHubEntityType.Folder;
      const name = elem.querySelector('.content a').textContent;
      return new GitHubEntity(name, type, iconPlaceholder);
    });
    return entities;
  }

  /**
   * Render the new icon on each entity.
   * Precondition -> each entity comes with its icon full URL
   * 
   * @param {GitHubEntity[]} entities 
   * @memberof GitHubDomManipulator
   */
  renderNewIcons(entities: GitHubEntity[]) {
    entities.forEach(entity => {
      if (entity.newIconURL) {
        const img = document.createElement('IMG');
        img.setAttribute('src', entity.newIconURL);
        img.style.height = '15px';
        img.style.position = 'relative';
        img.style.top = '3px';
        img.style.left = '-2px';
        this.replaceIcon(img, entity.iconPlaceholder);
      }
    });
  }
  
  private replaceIcon(newIcon: HTMLElement, parent: HTMLElement) {
    this.cleanElement(parent);
    parent.insertBefore(newIcon, parent.firstChild);
  }

  /**
   * Cleans the innerHtml of an element
   * 
   * @private
   * @param {HTMLElement} elem 
   * @memberof GitHubDomManipulator
   */
  private cleanElement(elem: HTMLElement) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }

}