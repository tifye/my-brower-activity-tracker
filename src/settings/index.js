const tokenInput = document.getElementById("token")
const backendInput = document.getElementById("backend")

async function init() {
    const { token, backend } = await browser.storage.sync.get([
        "token",
        "backend",
    ])
    tokenInput.value = token
    backendInput.value = backend
}
init()

const form = document.getElementsByTagName("form")[0]
form.onsubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    browser.storage.sync.set({
        token: data.get("token"),
        backend: data.get("backend"),
    })
}
