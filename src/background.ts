let urlRegex = /^https?:\/\/(?:[^./?#]+\.)?github\.com/;

let last_url = '';

// Subscribe to changes in the tab's url
chrome.tabs.onUpdated.addListener(function (tabs,tab){
	if (urlRegex.test(tab.url)) {
		chrome.tabs.getSelected(null, function(tab) {
			if(last_url != tab.url){
        // send a message to content.ts indicating that the url has been updated
				chrome.tabs.sendMessage(tabs, {text: 'url_updated'});
				last_url = tab.url;
			}
		});
	}
});