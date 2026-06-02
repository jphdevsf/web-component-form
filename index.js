customElements.define(
  "x-rando-form",
  class extends HTMLElement {
    connectedCallback() {
      if (this.querySelector("form")) return

      this.uuid = `pick-${crypto.randomUUID()}`
      this.innerHTML = `
            <form>
                <label for="${this.uuid}">Add an Item</label>
                <input id="${this.uuid}" type="text">
                <button>Add Item</button>
            </form>
            <ul>
            </ul>
            <p><button data-function="pickRandom">Pick Random</button></p>
            <p><button data-function="shuffleAll">Shuffle All</button></p>
            <div aria-live="polite" data-result="pick"></div>
            <div aria-live="polite" data-result="shuffle"></div>
            <div aria-live="polite" class="form-notification" role="status"></div>
        `

      this.form = this.querySelector("form")
      this.list = this.querySelector("ul")
      this.field = this.form.querySelector("input")
      this.pickBtn = this.querySelector('[data-function="pickRandom"]')
      this.pickResult = this.querySelector("[data-result='pick']")
      this.shuffleBtn = this.querySelector('[data-function="shuffleAll"]')
      this.shuffleResult = this.querySelector("[data-result='shuffle']")
      this.notification = this.querySelector(".form-notification")
      this.notificationTimer = null

      this.form.addEventListener("submit", this)
      this.pickBtn.addEventListener("click", this)
      this.shuffleBtn.addEventListener("click", this)
    }

    handleEvent(event) {
      const methodName = `on${event.type}`
      if (!(methodName in this)) return
      this[methodName](event)
    }

    onsubmit(event) {
      event.preventDefault()
      if (this.field.value.length === 0) return this.showStatus("Enter a string before adding!")
      const li = document.createElement("li")
      li.textContent = this.field.value
      this.list.append(li)
      this.showStatus(`${this.field.value} has been added!`)
      this.field.value = ""
    }

    onclick(event) {
      const el = event.currentTarget
      const functionName = el.getAttribute("data-function")
      this[functionName](event)
    }

    getItems() {
      return Array.from(this.list.querySelectorAll("li")).map(item => item.textContent)
    }

    pickRandom() {
      const items = this.getItems()
      if (items.length < 2) return this.showStatus("Enter at least 2 items")
      const shuffledItems = this.shuffle(items)
      this.pickResult.textContent = `You picked ${shuffledItems[0]}`
    }

    shuffleAll() {
      const items = this.getItems()
      if (items.length < 2) return this.showStatus("Enter at least 2 items")
      const shuffledItems = this.shuffle(items)
      const ul = document.createElement("ul")
      shuffledItems.forEach(item => {
        const li = document.createElement("li")
        li.textContent = item
        ul.append(li)
      })
      this.shuffleResult.replaceChildren(ul)
    }

    showStatus(msg) {
      clearTimeout(this.notificationTimer)
      this.notification.textContent = msg
      this.notificationTimer = setTimeout(() => {
        this.notification.textContent = ""
      }, 4000)
    }

    /**
     * Fisher-Yates Shuffle Algo for better JS array randomization.
     * @param {*} arr
     * @returns a shuffled array
     */
    shuffle(arr) {
      const array = [...arr]
      for (let i = array.length - 1; i >= 1; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
      }
      return array
    }
  }
)
