import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class MyProfile extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2> [[prop1]]!</h2>
      <template is='dom-repeat' items={{users}}>

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
        value: 'My Profile Route Page'
      },
      
    };
  }

    //calling the ajax and getting data from json file 
    connectedCallback() {
      super.connectedCallback();
      let {name} = JSON.parse(sessionStorage.getItem("loggedIn")) ;
      this.makeAjaxCall(`http://localhost:3000/users?name=${name}`, 'get', null)
  
    }

       // handle response of ajax call

   _handleResponse(event) {
    this.users = event.detail.response;
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

window.customElements.define('my-profile', MyProfile);
