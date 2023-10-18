import { TARGET_BACKEND } from 'process.env'
import { postActivity } from '../common/activity.js'

const urls = ["*://*.youtube.com/*"]
const trackingTabs = new Set()

browser.tabs.onActivated.addListener(onTabActivated)
browser.tabs.onRemoved.addListener(onTabRemoved)
browser.tabs.onUpdated.addListener(onTabUrlUpdated, {
  urls,
  properties: ["url"]
})
browser.tabs.onUpdated.addListener(onTabTitleUpdated, {
  urls,
  properties: ["title"]
})

function onTabRemoved(tabId, removeInfo) {
  console.debug('On tab removed', tabId)
  if (!trackingTabs.has(tabId)) {
    return
  }
  trackingTabs.delete(tabId)
}

async function onTabActivated(activeInfo) {
  console.debug('On tab activated', activeInfo.tabId)
  if (!trackingTabs.has(activeInfo.tabId)) {
    return
  }

  const tab = await browser.tabs.get(activeInfo.tabId)
  const [videoId, err] = getVideoIdFromUrl(tab.url)
  if (err !== null) {
    return
  }

  await postActivity(videoId)
} 

async function onTabUrlUpdated(tabId, changeInfo, tabInfo) {
  console.debug('On tab url updated', tabId)
  const { url } = changeInfo
  if (url === undefined || trackingTabs.has(tabId)) {
    return
  }

  const [videoId, err] = getVideoIdFromUrl(tabInfo.url)
  if (err !== null) {
    return
  }

  trackingTabs.add(tabId)

  if (tabInfo.active) {
    await postActivity(videoId)
  }
}

async function onTabTitleUpdated(tabId, changeInfo, tabInfo) {
  console.debug('On tab title updated', tabId)
  const { title } = changeInfo
  if (title === undefined, !trackingTabs.has(tabId)) {
    console.warn('Title not found or tab not being tracked', title, trackingTabs.has(tabId));
    return
  }

  const [videoId, err] = getVideoIdFromUrl(tabInfo.url)
  if (err !== null) {
    console.error('Error getting video id', err);
    return
  }

  await postActivity(videoId)
}

function getVideoIdFromUrl(url) {
  const queryString = url.split('?')[1]
  const query = new URLSearchParams(queryString)
  const id = query.get('v')

  if (!id) {
    return [null, new Error(`Video id not found in url ${url}`)]
  }

  return [id, null]
}
