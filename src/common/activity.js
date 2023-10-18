import { TARGET_BACKEND } from 'process.env';

export async function postActivity(videoId) {
  await fetch(`${TARGET_BACKEND}/youtube/activity/${videoId}`, {
    method: 'post',
  })
}

export async function getActivity() {
  const response = await fetch(`${TARGET_BACKEND}/youtube/activity`, {
    method: 'get',
  })
  const data = await response.json()
  return data
}