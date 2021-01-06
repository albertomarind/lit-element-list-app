import { LitElement, html, css } from "lit-element";
class LitMap extends LitElement {
  static get properties() {
    return {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      [id="mapContainer"] {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.loadMap();
    }, 100);
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      ${this.loadMapScript()}
      <div id="mapContainer"></div>
    `;
  }

  loadMap() {
    let refHtmlMap = this.shadowRoot.getElementById("mapContainer");
    let map = L.map(refHtmlMap).setView([this.latitude, this.longitude], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([this.latitude, this.longitude]).addTo(map);
  }

  loadMapScript() {
    let script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.integrity =
      "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==";
    script.crossOrigin = "";
    return script;
  }
}
customElements.define("lit-map", LitMap);
