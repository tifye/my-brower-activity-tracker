const titleSpan = document.getElementById("title")
const authorSpan = document.getElementById("author")
const refreshBtn = document.getElementById("refresh-btn")
const clearBtn = document.getElementById("clear-btn")
const thumbnailLink = document.getElementById("thumbnail-link")
const resourceLink = document.getElementById("resource-link")
const image = document.getElementById("activity-img")

let token = ""
let baseUrl = ""

async function loadStorage() {
    const { token: tk, backend } = await browser.storage.sync.get([
        "token",
        "backend",
    ])
    token = tk
    baseUrl = backend
}

async function refreshActivityData() {
    try {
        const res = await fetch(`${baseUrl}/activity`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (!res.ok) {
            console.error(await res.text())
            return
        }

        const activity = await res.json()
        titleSpan.textContent = activity.Title
        authorSpan.textContent = activity.Author
        thumbnailLink.href = activity.ThumbnailUrl
        resourceLink.href = activity.Url
        image.src = `${baseUrl}/activity/svg?id=${activity.Id}`
    } catch (err) {
        console.error(err)
    }
}

async function clearActivity() {
    await fetch(`${baseUrl}/activity/clear`, {
        method: "post",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return refreshActivityData()
}

async function init() {
    clearBtn.onclick = () => {
        clearActivity()
    }
    refreshBtn.onclick = () => {
        refreshActivityData()
    }

    await loadStorage()
    await refreshActivityData()
}
init()
