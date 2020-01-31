import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@polymer/iron-ajax/iron-ajax.js';



/**
 * @customElement
 * @polymer
 */
class UserHome extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        paper-button.custom {
          --paper-button-ink-color: var(--paper-pink-a200);     
        }
      
        paper-button.custom:hover {
          background-color: pink;
        }
      
        paper-button.pink {
          color: var(--paper-pink-a200);
      
        }
      
        paper-button.indigo {
          background-color: var(--paper-indigo-500);
          color: white;
      
         
        }
      
      
      </style>
      <h2> [[prop1]]!</h2>
      <h1>welcome </h1>
      <template is='dom-repeat' items={{users}}>
        <paper-card heading={{item.name}} alt='{{item.name}}'>
          <img src="../../images/{{item.gender}}.png" alt="a" />
          <p>Name:{{item.name}}</p>
          <p>Gender:{{item.gender}}</p>
          <p>Religion:{{item.religion}}</p>  
        <paper-button raised class="custom indigo" on-click="addToDatabase">Send Request</paper-button>
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
        value: 'User Home Route Page'
      },
      oppGen: String,
      action:String,
    };
  }
  //calling the ajax and getting data from json file 
  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('isLogin',{detail:{item:null},bubbles:true,composed:true}))
    let {name} = JSON.parse(sessionStorage.getItem("loggedIn")) ;

    this.shadowRoot.querySelector('h1').innerHTML += name;
    
    let {gender} = JSON.parse(sessionStorage.getItem("loggedIn")) ;
    console.log(gender)
    if (gender == 'male') {
      this.oppGen = 'female';
    }
    else {
      this.oppGen = 'male';
    }

    this.makeAjaxCall(`http://localhost:3000/users?gender=${this.oppGen}`, 'get', null)

  }
 

  addToDatabase(event){
    const {name,mobileNumber,gender,dateOfBirth,religion,state,emailAddress,education,collegeName,profession,annualIncome} =event.model.item;
    const obj={name,mobileNumber,gender,dateOfBirth,religion,state,emailAddress,education,collegeName,profession,annualIncome}
    let myData = JSON.parse(sessionStorage.getItem('loggedIn'))
    obj.likedBy=myData
    console.log(obj)
    this.makeAjaxCall('http://localhost:3000/myCrush', 'post', obj)

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

window.customElements.define('user-home', UserHome);
