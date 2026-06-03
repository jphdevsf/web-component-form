/**
 * Fisher-Yates Shuffle Algorithm for better JS array randomization.
 * @param {*} arr - Array to shuffle
 * @returns Shuffled array
 */
export const shuffle = arr => {
  const array = [...arr]
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

export const defineWebComponents = components => {
  const tagNames = components
    .filter(c => {
      if (c?.tagName) return true
      console.warn("ERROR: Component is missing tagName field.")
      return false
    })
    .forEach(c => {
      console.log(c.tagName)
      customElements.define(c.tagName, c)
    })
}
