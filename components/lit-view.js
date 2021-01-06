import { LitElement, html, css } from "lit-element";
class LitView extends LitElement {
  static get properties() {
    return {
      persons: {
        type: Array,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        max-width: 1024px;
        margin: auto;
        display: block;
      }
      .wrapper-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .wrapper-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.persons = [];
  }
  connectedCallback() {
    super.connectedCallback();
  }

  loadData() {
    this.hideDialog();
    this.showSpinner();
    let ajax = this.shadowRoot.getElementById("ajax");
    ajax.startRequest();
  }

  showDialog() {
    let litDialog = this.shadowRoot.getElementById("litDialog");
    litDialog.show();
  }

  hideDialog() {
    let litDialog = this.shadowRoot.getElementById("litDialog");
    litDialog.hide();
  }

  render() {
    return html`
      <div class="wrapper-spinner">
        <lit-spinner id="litSpinner"></lit-spinner>
      </div>
      <lit-dialog id="litDialog">
        <div slot="header">Dialog</div>
        <div slot="body">Click on button to show data</div>
        <div slot="footer"><button @click="${this.loadData}">Show</button></div>
      </lit-dialog>
      <lit-ajax
        id="ajax"
        .url="${" ./data.json"}"
        @on-response=${this.onResponse}
        @on-error=${this.onError}
      ></lit-ajax>
      <div class="wrapper-cards">
        ${this.persons.map(
          (person) => html`
            <lit-card
              .fullName=${this.getFullName(person)}
              .picture=${person.picture}
              .phone=${person.phone}
              .favoriteFruit=${person.favoriteFruit}
              .balance=${person.balance}
              .eyeColor=${person.eyeColor}
              .friends=${person.friends}
              .latitude=${person.latitude}
              .longitude=${person.longitude}
            >
            </lit-card>
          `
        )}
      </div>
    `;
  }

  showSpinner() {
    let litSpinner = this.shadowRoot.getElementById("litSpinner");
    litSpinner.show();
  }

  hideSpinner() {
    let litSpinner = this.shadowRoot.getElementById("litSpinner");
    litSpinner.hide();
  }

  firstUpdated(changedProperties) {
    this.showDialog();
  }
  onResponse(event) {
    this.persons = event.detail;
    this.hideSpinner();
  }

  onError(event) {
    console.error(event.detail);
  }

  getFullName(person) {
    return `${person.name.first} ${person.name.last}`;
  }
}
customElements.define("lit-view", LitView);
