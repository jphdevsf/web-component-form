/**
 * Toast Notification component built with JS Popover API (https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using)
 * Installation:
 * 1) Add <x-notification></x-notification> to your html.
 * 2) Import Notification class from this file in JS loaded on your html page.
 * 3) Initialize as a vanilla JS web component with customElements.define(Notification.tagName, Notification)
 *
 * @example
 * // Get notification component and call setMessage() method
 * const notificationComponent = document.querySelector("x-notification")
 * notificationComponent.setMessage({ type, msg })
 */
export class Notification extends HTMLElement {
  static tagName = "x-notification"
  static timeShown = 4000

  #uuid
  #container
  #message
  #timer = null

  connectedCallback() {
    if (this.querySelector(".notification-container")) return

    this.#uuid = `notification-${crypto.randomUUID()}`
    this.#render()
  }

  disconnectedCallback() {
    this.clearMessage()
  }

  #render() {
    this.innerHTML = `
        <div class="notification-container" id="${this.#uuid}" popover>
        <span class="notification-message"></span>
        <button class="notification-close-button" popovertarget="${this.#uuid}" aria-label="Close dialog">X</button>
        </div>
    `

    this.#container = this.querySelector(".notification-container")
    this.#message = this.querySelector(".notification-message")
    this.#timer = null
  }

  /**
   *
   * @param {string} msg - message to show end user.
   * @param {'error'|'success'|'attention'} type - For styling different notification types, sets data-type html attribute on the notification element for css targeting.
   * @returns
   */
  setMessage(msg, type) {
    if (!msg || !type) return
    if (this.#timer) clearTimeout(this.#timer)
    this.#container.setAttribute("data-type", type)
    this.#container.showPopover()
    this.#message.textContent = msg
    this.#timer = setTimeout(() => {
      this.clearMessage()
    }, this.constructor.timeShown)
  }

  clearMessage() {
    // this.#container.setAttribute("data-type", "")
    // this.#container.hidePopover()
    // this.#message.textContent = ""
    // this.#timer = null
  }
}
