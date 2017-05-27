
const hostname = 'chrome_youtube_mp3_dl';
let port = null;

function messageYoutubeDl(page){
  console.log(page);
  chrome.runtime.sendNativeMessage(hostname, { url: page.pageUrl }, (response) => {
    console.log('response');
  });
}

chrome.contextMenus.create({
  title: 'Download youtube audio',
  onclick: messageYoutubeDl,
  documentUrlPatterns: ['https://www.youtube.com/watch?*']
});
