webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __webpack_require__(3);
document.addEventListener('assetsURLEvent', function (e) {
    requestAnimationFrame(() => {
        new main_1.GitHubIconReplacer(e.detail + '/');
    });
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const icon_finder_1 = __webpack_require__(7);
const dom_manipulator_1 = __webpack_require__(6);
class GitHubIconReplacer {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.iconFinder = new icon_finder_1.IconFinder();
        this.domManipulator = new dom_manipulator_1.GitHubDomManipulator();
        this.init();
    }
    init() {
        this.entities = this.domManipulator.getGitHubEntities();
        this.entities.forEach(entity => {
            let iconName = this.iconFinder.getIconName(entity);
            if (iconName) {
                entity.newIconURL = this.baseURL + iconName;
            }
        });
        this.domManipulator.renderNewIcons(this.entities);
    }
}
exports.GitHubIconReplacer = GitHubIconReplacer;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A GitHub entity represents the link which the user links to drilldown to
 * a folder or a file of the repository. It has a name, a type, an HTML element
 * which will work as an anchor to place the new icon, and the URL of the new icon.
 *
 * @export
 * @class GitHubEntity
 */
class GitHubEntity {
    constructor(fileName, type, iconPlaceholder) {
        this.fileName = fileName;
        this.type = type;
        this.iconPlaceholder = iconPlaceholder;
    }
}
exports.GitHubEntity = GitHubEntity;
var GitHubEntityType;
(function (GitHubEntityType) {
    GitHubEntityType[GitHubEntityType["File"] = 0] = "File";
    GitHubEntityType[GitHubEntityType["Folder"] = 1] = "Folder";
})(GitHubEntityType = exports.GitHubEntityType || (exports.GitHubEntityType = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const github_entity_1 = __webpack_require__(5);
class GitHubDomManipulator {
    /**
     * Get all GitHub entities from a screen
     *
     * @returns {GitHubEntity[]}
     * @memberof GitHubDomManipulator
     */
    getGitHubEntities() {
        const elems = [].slice.call(document.querySelectorAll('.files tr.js-navigation-item:not(.up-tree)'));
        const entities = elems.map((elem) => {
            const iconPlaceholder = elem.querySelector('.icon');
            // detect the type of the entity by checking the classes of the svg icon
            const svg = iconPlaceholder.querySelector('svg');
            const type = svg.classList.contains('octicon-file-text') ? github_entity_1.GitHubEntityType.File : github_entity_1.GitHubEntityType.Folder;
            const name = elem.querySelector('.content a').textContent;
            return new github_entity_1.GitHubEntity(name, type, iconPlaceholder);
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
    renderNewIcons(entities) {
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
    replaceIcon(newIcon, parent) {
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
    cleanElement(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }
}
exports.GitHubDomManipulator = GitHubDomManipulator;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const github_entity_1 = __webpack_require__(5);
class IconFinder {
    /**
     * Returns the new icon name for an specified entity.
     * This method does not return the full URL of the resource, though.
     *
     * @static
     * @param {GitHubEntity} entity
     * @returns {string}
     * @memberof IconFinder
     */
    getIconName(entity) {
        // TODO
        // Dummy code that returns the Jenkins logo if the entity is a file
        // Replace this for the real icon finder algorithm
        return entity.type === github_entity_1.GitHubEntityType.File ? 'file_type_jenkins.svg' : undefined;
    }
}
exports.IconFinder = IconFinder;


/***/ })
],[2]);