import { GitHubEntity, GitHubEntityType } from './github-entity';

export class IconFinder {

  /**
   * Returns the new icon name for an specified entity.
   * This method does not return the full URL of the resource, though.
   * 
   * @static
   * @param {GitHubEntity} entity 
   * @returns {string} 
   * @memberof IconFinder
   */
  getIconName(entity: GitHubEntity): string {
    // TODO
    // Dummy code that returns the Jenkins logo if the entity is a file
    // Replace this for the real icon finder algorithm
    return entity.type === GitHubEntityType.File ? 'file_type_jenkins.svg' : undefined;
  }
}