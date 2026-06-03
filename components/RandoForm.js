import { shuffle } from "../lib/utils.js"

class RandoForm extends HTMLElement {
  static tagName = "x-rando-form"

  #uuid
  #form
  #list
  #field
  #btnPick
  #btnShuffle
  #btnReset
  #resultPick
  #resultShuffle

  connectedCallback() {
    if (this.querySelector("form")) return

    this.#uuid = `pick-${crypto.randomUUID()}`

    this.render()
    this.bindEvents()
  }

  disconnectedCallback() {}

  render() {
    this.innerHTML = `
      <form>
        <label for="${this.#uuid}">Add an Item</label>
        <input id="${this.#uuid}" type="text">
        <button>Add Item</button>
      </form>
      <ul></ul>
      <div aria-live="polite" data-result="pick"></div>
      <div aria-live="polite" data-result="shuffle"></div>
      <span class="rando-buttons">
        <button data-function="pickRandom">Pick Random</button>
        <button data-function="shuffleAll">Shuffle All</button>
        <button data-function="reset">Clear All</button>
      </span>
    `

    this.#form = this.querySelector("form")
    this.#list = this.querySelector("ul")
    this.#field = this.#form.querySelector("input")
    this.#btnPick = this.querySelector('[data-function="pickRandom"]')
    this.#btnShuffle = this.querySelector('[data-function="shuffleAll"]')
    this.#btnReset = this.querySelector('[data-function="reset"]')
    this.#resultPick = this.querySelector("[data-result='pick']")
    this.#resultShuffle = this.querySelector("[data-result='shuffle']")
  }

  bindEvents() {
    this.#form.addEventListener("submit", this)
    this.#btnPick.addEventListener("click", this)
    this.#btnShuffle.addEventListener("click", this)
    this.#btnReset.addEventListener("click", this)
  }

  handleEvent(event) {
    console.log("handleEvent fired")
    const methodName = `on${event.type}`
    if (!(methodName in this)) return
    this[methodName](event)
  }

  onsubmit(event) {
    console.log("onsubmit fired")
    event.preventDefault()
    if (this.#field.value.length === 0) return this.showNotification("Enter a string before adding!", "error")

    const li = document.createElement("li")
    li.textContent = this.#field.value
    this.#list.append(li)

    this.showNotification(`${this.#field.value} has been added!`, "success")
    this.#field.value = ""
  }

  onclick(event) {
    const el = event.currentTarget
    const functionName = el.getAttribute("data-function")
    this[functionName](event)
  }

  getItems() {
    return Array.from(this.#list.querySelectorAll("li")).map(item => item.textContent)
  }

  pickRandom() {
    const items = this.getItems()
    if (items.length < 2) return this.showNotification("Enter at least 2 items", "error")
    const shuffledItems = shuffle(items)
    this.#resultPick.textContent = `You picked ${shuffledItems[0]}`
  }

  reset() {
    this.#list.replaceChildren()
    this.#resultPick.replaceChildren()
    this.#resultShuffle.replaceChildren()
    this.#field.value = ""
    this.#field.focus()
    this.showNotification("Cleared!", "attention")
  }

  shuffleAll() {
    const items = this.getItems()
    if (items.length < 2) return this.showNotification("Enter at least 2 items", "error")
    const shuffledItems = shuffle(items)

    const ul = document.createElement("ul")
    for (const item of shuffledItems) {
      const li = document.createElement("li")
      li.textContent = item
      ul.append(li)
    }

    this.#resultShuffle.replaceChildren(ul)
    this.showNotification("Shuffled!")
  }

  showNotification(msg, type = "attention") {
    const notificationComponent = document.querySelector("x-notification")
    if (!notificationComponent) return console.error("Could not find <notification> component to display status.")
    notificationComponent.setMessage(msg, type)
  }
}

export { RandoForm }
