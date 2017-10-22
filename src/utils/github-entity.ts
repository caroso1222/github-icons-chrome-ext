/**
 * A GitHub entity represents the link which the user clicks to drilldown to
 * a folder or a file of the repository. It has a name, a type, an HTML element
 * which will work as an anchor to place the new icon, and the URL of the new icon.
 * 
 * @export
 * @class GitHubEntity
 */
export class GitHubEntity {
  /**
   * The URL of the icon to be placed on this entity
   * 
   * @type {string}
   * @memberof GitHubEntity
   */
  newIconURL: string;
  newAgeColor: string;

  constructor(
    public fileName: string,
    public type: GitHubEntityType,
    public iconPlaceholder: HTMLElement,
    public ageType: GitHubEntityAgeType,
    public agePlaceholder: HTMLElement
  ) { }
}

export enum GitHubEntityType {
  File, Folder
}
export enum GitHubEntityAgeType {
  Days, Months, Years
}
