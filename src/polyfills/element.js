/**
 * Element.prototype.matches "polyfill", IE11+ only
 * @function matches
 * @param {Element} element
 * @param {string} selectorString - selectorString is a string representing the selector to test
 * @return {boolean} true if the element would be selected by the specified selector string
 */
export const matches = (() => {
  let localMatches = Element.prototype.matches
  if (!Element.prototype.matches) {
    localMatches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector
  }

  return (element, selectorString) => localMatches.call(element, selectorString)
})()

/**
 * Element.prototype.closest polyfill, IE11+ only
 * @function closest
 * @param {Element} element - Element at the top of the tree of elements to be dealt with
 * @param {string} selectors - DOMString containing a selector list such as"p:hover, .toto + q"
 * @return {Element | null} Element which is the closest ancestor of the selected elements. It may be null.
 */
export const closest = (() => {
  let localClosest = Element.prototype.closest
  if (!Element.prototype.closest) {
    localClosest = function (s) {
      let el = this
      do {
        if (matches(el, s)) {
          return el
        }
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }

  return (element, selectors) => localClosest.call(element, selectors)
})()
