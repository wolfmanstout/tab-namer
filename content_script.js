function updateTitle(tabIndex) {
  if (tabIndex != document.lastTabIndex && document.originalTitle) {
    setTitle(document.originalTitle, tabIndex);
  } else if (document.title != document.lastTitle) {
    document.originalTitle = document.title;
    setTitle(document.title, tabIndex);
  }
}

function setTitle(title, tabIndex) {
  var prefix = tabIndex < 8 ? (tabIndex + 1) + ' ' : '';
  document.title = prefix + title + ' <' + location.host + '>';
  document.lastTitle = document.title;
  document.lastTabIndex = tabIndex;
}

function registerListener() {
  if (document.titleObserver) {
    return;
  }
  document.titleObserver = new MutationObserver(function(mutations) {
    updateTitle(document.lastTabIndex);
  });
  
  var config = { attributes: true, childList: true, characterData: true };
  document.titleObserver.observe(document.getElementsByTagName('title')[0], config);
}
