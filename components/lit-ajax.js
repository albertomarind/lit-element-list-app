import { LitElement } from "lit-element";
class LitAjax extends LitElement {
	static get properties() {
		return {
			url: {
				type: String,
			}
		};
	}

	startRequest() {
		fetch(this.url)
			.then(response => response.json())
			.then(data => {
				setTimeout(() => this.emmitEvent('on-response', data), 2000);
			}).catch(error => {
				this.emmitEvent('on-error', error);
			});
	}

	emmitEvent(eventName, data) {
		this.dispatchEvent(new CustomEvent(eventName, {
			detail: data
		}));
	}

}
customElements.define("lit-ajax", LitAjax);
