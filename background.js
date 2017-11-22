function updateTabName(tab) {
  chrome.tabs.executeScript(tab.id, {file: 'content_script.js'}, function () {
    chrome.tabs.executeScript(tab.id, {code: 'updateTitle(' + tab.index + ');registerListener();'});
  });
}

function updateAllTabs() {
  chrome.tabs.query({}, function(tabs) {
    for(var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      chrome.tabs.executeScript(tab.id, {code: 'if (window.updateTitle) updateTitle(' + tab.index + ');'});
    }
  });
}

chrome.tabs.onCreated.addListener(function() {
  updateAllTabs();
});

chrome.tabs.onMoved.addListener(function() {
  updateAllTabs();
});

chrome.tabs.onRemoved.addListener(function() {
  updateAllTabs();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateTabName(tab);
});
