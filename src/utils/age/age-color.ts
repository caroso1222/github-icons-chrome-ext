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
      case GitHubEntityAgeType.Seconds:
        return "#047331";
      case GitHubEntityAgeType.Hours:
        return "#388C04";
      case GitHubEntityAgeType.Days:
        return "#CACE17";
      case GitHubEntityAgeType.Months:
        return "#E16519";
      case GitHubEntityAgeType.Years:
        return "#CA0300";

      default:
        return "#CA0300";
    }
  }
}
