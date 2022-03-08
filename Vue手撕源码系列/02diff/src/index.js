import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn")
const vnode1 = h("ul", {}, [
  h("li",{key:"a"},"a"),
  h("li",{key:"b"},"b"),
  h("li",{key:"c"},"c"),
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode1);
const vnode2 = h("ul", {},  [
  h("li",{key:"a"},"a"),
  h("li",{key:"c"},"c"),
  h("li",{key:"b"},"b"),
])
btn.onclick = function () {

  patch(vnode1, vnode2)
}
