import htm from "https://unpkg.com/htm?module";
import render from "./services/render.mjs";

const html = htm.bind(render);
document.body.appendChild(html`<a href="/">Hello!</a>`);
