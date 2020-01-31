import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@polymer/iron-ajax/iron-ajax.js';
/**
 * @customElement
 * @polymer
 */
class MyRequest extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2> [[prop1]]!</h2>
      <template is='dom-repeat' items={{data}}>
      <paper-card heading={{item.likedBy.name}} alt='{{item.likedBy.name}}'>
        <img src="../../images/{{item.likedBy.gender}}.png" alt="a" />
        <p>Name:{{item.likedBy.name}}</p>
        <p>Gender:{{item.likedBy.gender}}</p>
        <p>Religion:{{item.likedBy.religion}}</p>
      </paper-card>
    </template>
    <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" on-error="_handleError"
    content-type="application/json"></iron-ajax>`;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'My request Route Page , it will show who send me connection request'
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    let {name} = JSON.parse(sessionStorage.getItem("loggedIn")) ;
    this.makeAjaxCall(`http://localhost:3000/myCrush?name=${name}`, 'get', null)
  }
  _handleResponse(event) {
    console.log(event.detail.response)
    this.data=event.detail.response
    console.log(this.data)
    // this method handle buy option and it will add to my pet category
  }
  makeAjaxCall(url, method, postObj) {
    let ajax = this.$.ajax
    ajax.method = method
    ajax.url = url
    ajax.body = postObj ? JSON.stringify(postObj) : undefined
    ajax.generateRequest();
  }
}

window.customElements.define('my-request', MyRequest);
