import {
  GitHubEntity,
  GitHubEntityType,
  GitHubEntityAgeType
} from "./github-entity";

export class GitHubDomManipulator {
  /**
   * Get all GitHub entities from a screen
   * 
   * @returns {GitHubEntity[]} 
   * @memberof GitHubDomManipulator
   */
  getGitHubEntities(): GitHubEntity[] {
    try {
      const elems = [].slice.call(
        document.querySelectorAll(".files tr.js-navigation-item:not(.up-tree)")
      );
      const entities = elems.map((elem: HTMLElement) => {
        const iconPlaceholder = elem.querySelector(".icon") as HTMLElement;
        const agePlaceholder = elem.querySelector(".age") as HTMLElement;
        const ageText = agePlaceholder.querySelector("time-ago").innerHTML;
        const ageType = this.getAgeType(ageText);
        // detect the type of the entity by checking the classes of the svg icon
        const svg = iconPlaceholder.querySelector("svg");
        const type = svg.classList.contains("octicon-file-text")
          ? GitHubEntityType.File
          : GitHubEntityType.Folder;
        const name = elem.querySelector(".content a").textContent;
        return new GitHubEntity(
          name,
          type,
          iconPlaceholder,
          ageType,
          agePlaceholder
        );
      });
      return entities;
    } catch (e) {
      // If an exception was caught, then it means that the DOM is still unstable
      // and GitHub might still change the DOM in the next couple milliseconds so we do nothing
      return [];
    }
  }

  getAgeType(text: string): GitHubEntityAgeType {
    if (text.search("second") !== -1) {
      return GitHubEntityAgeType.Seconds;
    } else if (text.search("minute") !== -1) {
      return GitHubEntityAgeType.Minutes;
    } else if (text.search("hour") !== -1) {
      return GitHubEntityAgeType.Hours;
    } else if (text.search("day") !== -1) {
      return GitHubEntityAgeType.Days;
    } else if (text.search("month") !== -1) {
      return GitHubEntityAgeType.Months;
    } else {
      return GitHubEntityAgeType.Years;
    }
  }

  /**
   * Render the new icon on each entity.
   * Precondition -> each entity comes with its icon full URL
   * 
   * @param {GitHubEntity[]} entities 
   * @memberof GitHubDomManipulator
   */
  renderNewIcon(entity: GitHubEntity) {
    if (entity.newIconURL) {
      const img = document.createElement("IMG");
      img.setAttribute("src", entity.newIconURL);
      img.style.height = "15px";
      img.style.position = "relative";
      img.style.top = entity.type === GitHubEntityType.Folder ? "-3px": "3px";
      img.style.left = "-2px";
      img.style.marginLeft = "10px";
      this.replaceIcon(img, entity.iconPlaceholder);
      if (entity.type === GitHubEntityType.Folder)
        entity.iconPlaceholder.insertBefore(
          this.createArrow(),
          entity.iconPlaceholder.firstChild
        );
    }
  }

  private replaceIcon(newIcon: HTMLElement, parent: HTMLElement) {
    this.cleanElement(parent);
    const elm = parent.insertBefore(newIcon, parent.firstChild);
  }
  private createArrow() {
    const arrow = document.createElement("DIV");
    arrow.style.width = "0";
    arrow.style.height = "0";
    arrow.style.borderTop = "5px solid transparent";
    arrow.style.borderBottom = "5px solid transparent";
    arrow.style.borderLeft = "5px solid black";
    arrow.style.height = "0";
    arrow.style.height = "0";
    arrow.style.position = "relative";
    arrow.style.top = "10px";
    arrow.style.left = "-2px";
    return arrow;
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
  /**
   * Render the new color on each entity.
   * Precondition -> each entity comes with its color
   * 
   * @param {GitHubEntity[]} entities 
   * @memberof GitHubDomManipulator
   */
  renderNewAgeColor(entity: GitHubEntity) {
    if (entity.newAgeColor) {
      entity.agePlaceholder.style.color = entity.newAgeColor;
      if (
        entity.ageType === GitHubEntityAgeType.Minutes ||
        entity.ageType === GitHubEntityAgeType.Seconds
      )
        entity.agePlaceholder.style.fontWeight = "500";
    }
  }
}
