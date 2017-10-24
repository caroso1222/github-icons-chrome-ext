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
        return "#54d64e";
      case GitHubEntityAgeType.Minutes:
        return "#54d64e";
      case GitHubEntityAgeType.Hours:
        return "#54d64e";
      case GitHubEntityAgeType.Days:
        return "#40A33B";
      case GitHubEntityAgeType.Months:
        return "#6a737d";
      case GitHubEntityAgeType.Years:
        return "#6a737d";

      default:
        return "#6a737d";
    }
  }
}
