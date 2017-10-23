import { IconFinder } from './utils/icon/icon-finder';
import { ageColor } from './utils/age/age-color';
import { GitHubDomManipulator } from './utils/dom-manipulator';
import { GitHubEntity } from './utils/github-entity';

export class GitHubIconReplacer {
  
  private entities: GitHubEntity[];

  private iconFinder = new IconFinder();
  private ageColor = new ageColor();
  private domManipulator = new GitHubDomManipulator();

  constructor(private baseURL: string) {
    //this.init();
  }

  init() {
    this.entities = this.domManipulator.getGitHubEntities();
    this.entities.forEach(entity => {
      const iconName = this.iconFinder.getIconName(entity);
      const ageColor = this.ageColor.getColor(entity);
      if (iconName) {
        entity.newIconURL = this.baseURL + iconName;
        this.domManipulator.renderNewIcon(entity);
      }
      if(ageColor){
        entity.newAgeColor = ageColor;
        this.domManipulator.renderNewAgeColor(entity);
      }
    });
  }
}