const FOOT = document.getElementById("footer");
FOOT.innerHTML = `
  <hr>
  <br>
  <center>
    <div>
      <a href="https://xandra.cc/patrons" target="_new"><img class="badge" src="/assets/stamps/patrons.png"></a><br>
      🐱<a href="/entries/freyja.html">Freyja</a> watches over this website.🐱<br>
      <img src="/assets/crow-flipped.png" style=height:18px; width:18px;><a href="/entries/the_morrigan.html">The Morrígan</a> watches over this website.<img src="/assets/crow.png" style=height:18px; width:18px;><br><br>
      <a href="https://bdsmovement.net/"> <img class="badge" src="/assets/stamps/palestine.gif"></a>
      <a href="https://plasticdino.neocities.org/"> <img class="badge" src="/assets/stamps/queer.png"></a>
      <img class="badge" src="/assets/stamps/imwitch.gif">
      <br>
      <img class="stamp" src="/assets/stamps/she her hers.png">
      <img class="stamp" src="/assets/stamps/pagan stamp.png">
    </div>
    <br>
    <div>
      <p>Link me!</p>
      <a href="/index.html">
        <img src="/assets/sitebutton.gif" alt="Witch of the Woods Button">
      </a>
      <p>
        If you like my site, feel free to save my button and share it on your site!
      </p>
      <textarea readonly onclick="this.select();">
        "<a href="https://witchofthewoods.neocities.org/"> <img src=https://witchofthewoods.neocities.org/assets/sitebutton.gif" alt="Witch of the Woods Button"> </a>"
      </textarea>
    </div>
    <br>
    <hr>
    <br>
    <div>
      Witch of the Woods is a reference and a practice space.<br>
      Its writing treats magick as a living craft.<br>
      Nothing here replaces medical, psychological, legal, or financial care.<br>
      Magickal practice works alongside that care, never instead of it. <br>
      Closed and initiatory traditions are described with respect and are not offered as how-to instruction.<br>
      <br>
      Blessed be.
    </div>
    <pre>
      <span style="font-size:20px">
  🕯 ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆ ⛥ ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆ 🕯
  ___🕯___
  .-'\`  /\\  \`'-.
  🕯.'_____/__\\_____\`.🕯
  / \`._  /    \\  _.\` \\
  |     \`/      \\'     |
  |     / \`-..-' \\     |
  \\   /  .-'\`-.  \\   /
  \`./.-'      \`-.\\.'
  🕯\`-..______..-'🕯

  🕯 ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆ ⛥ ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆ 🕯
      </span>
    </pre>
    <img src="/assets/construction2.png" width="465" height="28" alt="Under Construction">
  </center>
  <p>
    <a target="_blank" href="https://icons8.com/icon/bPaE2LXiRLQy/triquetra">Triquetra</a> favicon by 
    <a target="_blank" href="https://icons8.com">Icons8</a><br>
    Pentacle ASCII art from 
    <a href="https://www.asciiart.eu/art-and-design/pentacles">asciiart.eu</a><br>
  </p>
  <div style="text-align:right">
    <a href="https://cd5k.net/tau/">&tau;</a>
  </div>
`;

const ring = document.getElementById("magical-ring");

if (ring) {
const variables = document.createElement("script");
variables.src =
"https://magical-ring.neocities.org/js/onionring-variables.js";
variables.onload = () => {
const widget = document.createElement("script");
widget.src =
"https://magical-ring.neocities.org/js/onionring-widget.js";
widget.onload = () => {
console.log("Magical Ring widget loaded!");
};
widget.onerror = () => {
console.error("Failed to load Magical Ring widget.");
};
document.head.appendChild(widget);
};
variables.onerror = () => {
console.error("Failed to load Magical Ring variables.");
};
document.head.appendChild(variables);
}