import { GitHubEntity, GitHubEntityAgeType } from "../github-entity";
export class ageColor {
    /**
     * Returns the new age color for an specified entity.
     * 
     * @static
     * @param {GitHubEntity} entity 
     * @returns {string} 
     * @memberof ageColor
     */
    getColor(entity: GitHubEntity): string {
        switch (entity.ageType) {
            case GitHubEntityAgeType.Days:
                return '#34d058'
                case GitHubEntityAgeType.Months:
                return '#2b7489'
                case GitHubEntityAgeType.Years:
                return '#e34c26';
        
            default:
            return 'black'

        }

    }
  }