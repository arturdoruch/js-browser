/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

/**
 * Browser scroll bar helper.
 */
export default {
    /**
     * Unload browser vertical scroll bar.
     *
     * @param {boolean} [freezeBody = false] If true prevent to move body in horizontal position, while scroll bar is removed.
     */
    unload(freezeBody) {
        load('unload', freezeBody);
    },

    /**
     * Load previously unloaded browser vertical scroll bar.
     */
    load() {
        load('load');
    },

    /**
     * Gets browser scroll bar width.
     *
     * @returns {number}
     */
    getWidth
};

let tmpBodyMarginLeft = 0;

/**
 * Loads and unloads browser scroll bars.
 *
 * @param {string} state One of: "load", "unload"
 * @param {boolean}   [freezeBody]
 */
function load(state, freezeBody) {
    if (document.documentElement) {
        document.documentElement.style.overflow = state === 'load' ? 'auto' : 'hidden'; // Firefox, Chrome
    } else {
        document.body.scroll = state === 'load' ? 'yes' : 'no'; // old IE
    }

    setBodyMargin(state === 'load', freezeBody);
}

/**
 * @param {boolean} isLoaded If scroll bar is loaded
 * @param {boolean} freezeBody
 */
function setBodyMargin(isLoaded, freezeBody) {
    if (isLoaded === false && freezeBody === true) {
        tmpBodyMarginLeft = document.body.style.marginLeft.replace('px', '') || 0;
        document.body.style.marginLeft = (tmpBodyMarginLeft - getWidth()) + 'px';
    } else if (isLoaded === true) {
        document.body.style.marginLeft = tmpBodyMarginLeft === 0 ? '' : tmpBodyMarginLeft + 'px';
    }
}

let width;

function getWidth() {
    if (width) {
        return width;
    }

    let outerElem = document.createElement("div"),
        innerElem = document.createElement("div"),
        widthWithoutBar,
        widthWithBar;

    outerElem.style.width = "100px";
    outerElem.style.visibility = "hidden";
    innerElem.style.width = "100%";

    document.body.appendChild(outerElem);

    widthWithoutBar = outerElem.offsetWidth;
    // Force to display scroll bar.
    outerElem.style.overflow = "scroll";
    outerElem.appendChild(innerElem);
    widthWithBar = innerElem.offsetWidth;

    document.body.removeChild(outerElem);

    return width = widthWithoutBar - widthWithBar;
}
