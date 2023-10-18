import { getActivity } from '../../common/activity.js';

let elThumbnail;
let elTitle;

function main() {
  const elRefreshButton = document.getElementById('refresh-btn');
  elRefreshButton.addEventListener('click', refreshActivityData);

  elThumbnail = document.getElementsByClassName('thumbnail')[0];
  elTitle = document.getElementsByClassName('title')[0];

  refreshActivityData();
}

async function refreshActivityData() {
  const data = await getActivity();

  elThumbnail.style.setProperty('--thumbnail-url', `url(${data.ThumbnailUrl})`)
  elTitle.textContent = data.Title;
}


document.addEventListener('DOMContentLoaded', main);