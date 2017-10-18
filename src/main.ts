import { IconFinder } from './utils/icon-finder';
import { GitHubDomManipulator } from './utils/dom-manipulator';
import { GitHubEntity } from './utils/github-entity';

export class GitHubIconReplacer {
  
  entities: GitHubEntity[];

  iconFinder = new IconFinder();

  domManipulator = new GitHubDomManipulator();

  constructor(public baseURL: string) {
    this.init();
  }

  init() {
    this.entities = this.domManipulator.getGitHubEntities();
    this.entities.forEach(entity => {
      let iconName = this.iconFinder.getIconName(entity);
      if (iconName) {
        entity.newIconURL = this.baseURL + iconName;
        this.domManipulator.renderNewIcon(entity);
      }
    });
  }
}