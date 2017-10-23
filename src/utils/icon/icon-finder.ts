import { GitHubEntity, GitHubEntityType } from "../github-entity";
import { extensions as files } from "./vscode-icon-manifest/supportedExtensions";
import { extensions as folders } from "./vscode-icon-manifest/supportedFolders";
import { languages } from "./vscode-icon-manifest/languages";

const folderNames = folders.supported.reduce((init, current) => {
  const obj = init;
  if (current.extensions.length)
    current.extensions.forEach(ext => {
      obj[ext] = current.icon;
    });
  return obj;
}, {});
const fileNames = files.supported.reduce((init, current) => {
  const obj = init;
  if (!obj.hasOwnProperty("extensions")) obj["extensions"] = {};
  if (!obj.hasOwnProperty("filenamesGlob")) obj["filenamesGlob"] = {};
  if (!obj.hasOwnProperty("languages")) obj["languages"] = {};
  if (current.hasOwnProperty("extensions")) {
    current.extensions.forEach(ext => {
      obj["extensions"][ext] = current.icon;
    });
  }
  if (current.hasOwnProperty("filenamesGlob"))
  if (current.hasOwnProperty("extensionsGlob")) {
    
    current.extensionsGlob.forEach(extG => {
      current.filenamesGlob.forEach(fileG => {
        obj["filenamesGlob"][fileG+'.'+extG] = current.icon;
      });
    });
  }
  if (current.hasOwnProperty("languages"))
    current.languages.forEach(ext => {
          obj["languages"][ext.defaultExtension] = current.icon;
    });
  return obj;
}, {});
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

    if (entity.type === GitHubEntityType.Folder) {
      return folderNames[entity.fileName]
        ? "folder_type_" + folderNames[entity.fileName] + ".svg"
        : "default_folder.svg";
    } else {
      const split = entity.fileName.split('.');
      const splitLength = split.length;
      return fileNames["extensions"][entity.fileName]
        ? "file_type_" + fileNames["extensions"][entity.fileName] + ".svg"
        : (fileNames["filenamesGlob"][entity.fileName]
          ? "file_type_" + fileNames["filenamesGlob"][entity.fileName] + ".svg"
          : (fileNames["filenamesGlob"][split[splitLength-2] + "." + split[splitLength-1]])
          ? "file_type_" + fileNames["filenamesGlob"][split[splitLength-2] + "." + split[splitLength-1]] + ".svg" :
          (fileNames["languages"][split[splitLength-1]]
          ? "file_type_" + fileNames["languages"][split[splitLength-1]] + ".svg"
          : "default_file.svg"));
    }
  }
}
