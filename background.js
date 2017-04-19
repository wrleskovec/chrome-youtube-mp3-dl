
const hostname = 'chrome_youtube_mp3_dl';
let port = null;

function messageYoutubeDl(){
  chrome.tabs.query({ active: true }, (tabs) => {
    console.log(tabs[0].url);
    chrome.runtime.sendNativeMessage(hostname, { url: tabs[0].url }, (response) => {
      console.log('response');
    })
  })
}

chrome.contextMenus.create({
  title: 'Download youtube audio',
  onclick: messageYoutubeDl,
  documentUrlPatterns: ['https://www.youtube.com/watch?*']
});
