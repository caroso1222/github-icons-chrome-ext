class ContentInjector {
  constructor() {}

  init() {
    this.injectMainScripts().then(() => {
      this.registerURLUpdateListener();
    });
  }

  /**
   * Registers a listener that takes a message from background.js when the tab url
   * refreshes, and send a message to the DOM to propagate such event
   * 
   * @memberof ContentInjector
   */
  registerURLUpdateListener() {
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("onURLUpdated", true, true, undefined);
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.text === 'url_updated') {
        document.dispatchEvent(evt);
      }
    });
  }

  /**
   * Injects webpack's vendor.js and our main DOM script to the document.
   * Returns a promise that resolves when the script has been loaded into the document
   * 
   * @memberof ContentInjector
   */
  injectMainScripts(): Promise<any> {
    return new Promise(resolve => {
      const webpack = this.injectScriptToDocument('vendor.js');
      webpack.onload = () => {
        const domScript = this.injectScriptToDocument('script.js');
        domScript.onload = () => {
          // Send the assets URL to the DOM script so that it knows where to get the icon assets from
          const url = chrome.runtime.getURL("icons");
          const evt = document.createEvent("CustomEvent");
          evt.initCustomEvent("assetsURLEvent", true, true, url);
          document.dispatchEvent(evt);
          resolve();
        };
      };
    });
  }

  /**
   * Injects a script to the document
   * 
   * @param {string} name 
   * @returns 
   * @memberof ContentInjector
   */
  injectScriptToDocument(name: string) {
    const script = document.createElement("script");
    script.src = chrome.extension.getURL(name);
    (document.head || document.documentElement).appendChild(script);
    return script;
  }
}

const contentInjector = new ContentInjector();
contentInjector.init();
