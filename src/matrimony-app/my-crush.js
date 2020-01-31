import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@polymer/iron-ajax/iron-ajax.js';
/**
 * @customElement
 * @polymer
 */
class MyCrush extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2> [[prop1]]!</h2>
      <template is='dom-repeat' items={{data}}>

        <paper-card heading={{item.name}} alt='{{item.name}}'>
          <img src="../../images/{{item.gender}}.png" alt="a" />
          <p>Name:{{item.name}}</p>
          <p>Gender:{{item.gender}}</p>
          <p>Religion:{{item.religion}}</p>
        </paper-card>
      </template>
      <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" on-error="_handleError"
      content-type="application/json"></iron-ajax>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'My Crush Route Page , it will show whom i send connection request'
      },
      oppGen: String,
      data:{
        type:Array,
        value:[]
      }
    };
  }
  //calling the ajax and getting data from json file 
  connectedCallback() {
    super.connectedCallback();
    let {name} = JSON.parse(sessionStorage.getItem("loggedIn")) ;
    console.log(name)
    this.makeAjaxCall(`http://localhost:3000/myCrush?likedBy.name=${name}`, 'get', null)
  }
  // handle response of ajax call

  _handleResponse(event) {
    console.log(event.detail.response)
    this.data=event.detail.response
    console.log(this.data)
    // this method handle buy option and it will add to my pet category
  }
  // ajax call method
  makeAjaxCall(url, method, postObj) {
    let ajax = this.$.ajax
    ajax.method = method
    ajax.url = url
    ajax.body = postObj ? JSON.stringify(postObj) : undefined
    ajax.generateRequest();
  }
}

window.customElements.define('my-crush', MyCrush);
