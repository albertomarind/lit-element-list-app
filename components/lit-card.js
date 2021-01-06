import { LitElement, html, css } from "lit-element";
class LitCard extends LitElement {
  static get properties() {
    return {
      fullName: {
        type: String,
      },
      picture: {
        type: String,
      },
      phone: {
        type: Number,
      },
      favoriteFruit: {
        type: String,
      },
      balance: {
        type: Number,
      },
      eyeColor: {
        type: String,
      },
      friends: {
        type: Array,
      },
      showFriends: {
        type: Boolean,
      },
      showLocation: {
        type: Boolean,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        font-family: "Roboto", sans-serif;
      }
      .card {
        position: relative;
        border-radius: 1rem;
        display: block;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
          rgba(0, 0, 0, 0.23) 0px 6px 6px;
      }
      .card__header {
        position: relative;
        height: 100px;
        background: linear-gradient(
          90deg,
          rgb(2, 0, 36) 0%,
          rgb(0 6 8) 35%,
          rgb(63 82 86) 100%
        );
      }
      .card__header-wp-img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .card__header-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid white;
        transform: translateY(50%);
      }

      .card__body {
        padding: 4.5rem 1rem 1rem 1rem;
      }

      .card__fullname {
        display: block;
        text-align: center;
        font-weight: 700;
        font-size: 1.2rem;
      }

      .card__data-section {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
      }
      .card__data {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .card__data:nth-child(3) {
        color: green;
      }
      .card__data-sub {
        font-size: 0.75rem;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(0, 90%);
        color: #000000c7;
        font-weight: 500;
        letter-spacing: 1px;
      }
      .card__action-section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
      }
      .card__action-btn {
        border: none;
        border-radius: 0.5rem;
        background-color: #ffb224;
        padding: 0.5rem 0.75rem;
        margin: 0.5rem;
        font-size: 0.9rem;
        outline: none;
      }
      .card__action-btn:hover {
        cursor: pointer;
        background-color: rgb(234 160 24);
      }

      .card__friends-section {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: white;
        display: none;
      }

      .card__friends-section.show {
        display: block;
      }

      .card__location-section {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: white;
        display: none;
      }

      .card__location-section.show {
        display: block;
      }

      .card__btn-close-friends {
        z-index: 99;
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        background-color: rgb(255, 178, 36);
        transform: translate(-25%, 25%);
        color: white;
        border-radius: 50%;
        font-size: 1.5rem;
        width: 25px;
        height: 25px;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
        cursor: pointer;
      }
      .card__text-friend {
        font-size: 1.4rem;
        letter-spacing: 2px;
        font-weight: 700;
      }

      .card__wp-text-friends {
        overflow-y: auto;
        position: absolute;
        inset: 17.5% 0 5% 0;
        padding: 0rem 2rem 0rem 2rem;
        margin: 0;
        display: block;
        list-style: none;
      }

      .card__title-friends {
        position: absolute;
        top: 5%;
        left: 0;
        transform: translate(30%, 0%);
        font-size: 1.6rem;
        letter-spacing: 4px;
        font-weight: 700;
        background-color: white;
      }
      .card__title-friends:before {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        display: inline-block;
        width: 200%;
        height: 4px;
        background-color: rgb(255, 178, 36);
      }
      .card__location-btn-close {
        z-index: 999;
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        background-color: rgb(255, 178, 36);
        transform: translate(-25%, 25%);
        color: white;
        border-radius: 50%;
        font-size: 1.5rem;
        width: 25px;
        height: 25px;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
        cursor: pointer;
      }

      #map {
        height: 100%;
        width: 100%;
        display: inline-block;
      }

      ::-webkit-scrollbar {
        width: 20px;
      }

      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgb(255, 178, 36);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgb(234 160 24);
      }
    `;
  }

  constructor() {
    super();
    this.showFriends = false;
    this.showLocatio = false;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <div class="card">
        <div class="card__header">
          <div class="card__header-wp-img">
            <img class="card__header-img" src="${this.picture}" />
          </div>
        </div>
        <div class="card__body">
          <span class="card__fullname"> ${this.fullName} </span>
          <div class="card__data-section">
            <span class="card__data"
              >${this.phone}<span class="card__data-sub">phone</span></span
            >
            <span class="card__data"
              >${this._getFavoriteFruit(this.favoriteFruit)}<span
                class="card__data-sub"
                >favorite fruit</span
              ></span
            >
            <span class="card__data"
              >${this._applyMask(this.balance)}<span class="card__data-sub"
                >balance</span
              ></span 
            >
            <span class="card__data" style="${this._getEyeColor()}">
              <iron-icon icon="visibility"></iron-icon
              ><span class="card__data-sub">eye color</span>
            </span>
          </div>
          <div class="card__action-section">
            <button class="card__action-btn" @click="${this.toggleFriends}">
              Friends
            </button>
            <button class="card__action-btn" @click="${this.toggleLocation}">
              Location
            </button>
          </div>
        </div>
        <div class="card__friends-section ${this.showFriends ? " show" : ""}">
          <span class="card__title-friends">Friends</span>
          <span class="card__btn-close-friends" @click="${this.toggleFriends}"
            >x</span
          >
          <ul class="card__wp-text-friends">
            ${this.friends.map(
      (friend) => html`
                <li class="card__text-friend">${friend.name}</li>
              `
    )}
          </ul>
        </div>
        <div class="card__location-section ${this.showLocation ? " show" : ""}">
          <span class="card__location-btn-close" @click="${this.toggleLocation}"
            >x</span
          >
          <div class="card__location-map" id="map"></div>
        </div>
      </div>
      ${this.showLocation ? html`${this.script()}` : html``}
    `;
  }

  _getEyeColor() {
    return "color:" + this.eyeColor;
  }

  _getFavoriteFruit(favoriteFruit) {
    switch (favoriteFruit) {
      case "banana":
        return "🍌";
      case "apple":
        return "🍎";
      case "strawberry":
        return "🍓";
    }
  }

  _applyMask(balance) {
    return balance.replace(/[$,]/g, "");
  }

  toggleFriends() {
    this.showFriends = !this.showFriends;
  }

  toggleLocation() {
    this.showLocation = !this.showLocation;
    this.loadLocation();
  }

  loadLocation() {
    setTimeout(() => {
      let refHtmlMap = this.shadowRoot.getElementById("map");
      let map = L.map(refHtmlMap).setView([this.latitude, this.longitude], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.marker([this.latitude, this.longitude]).addTo(map);
    }, 100);
  }

  script() {
    let script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.integrity =
      "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==";
    script.crossOrigin = "";
    return script;
  }
  onLoad() {

  }
}
customElements.define("lit-card", LitCard);
