import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

import '@polymer/app-route/app-location.js';

/**
* @customElement
* @polymer
*/
class UserLogin extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    display: block;
  }

  #form {
    border: 2px solid black;
    width: 500px;
    margin-left: 400px;
  }

  form {
    margin-left: 20px;
    margin-right: 20px;
  }
  h2{
    text-align: center;
  }
  paper-button {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 180px;
  }

</style>
<h1> [[prop1]]!</h1>
<app-location route={{route}}></app-location>

<iron-form id="form">

  <form>
    <h2> Login Page </h2>
    <paper-input label="User Name" type="text" value={{userName}} name="userName"></paper-input>
    <paper-input label="Password" type="password" value={{password}} name="password"></paper-input>

    <paper-button raised class="custom indigo" on-click="signIn">Login</paper-button>
  </form>
</iron-form>

<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
on-error="_handleError" content-type="application/json"></iron-ajax>


`;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'User Login Route Page'
      },
      respCheck: Array,
    };
  }

  // fetching the  user data from josn file 
  signIn(event) {
    let userName = this.userName;
    let pass = this.password;
    this._makeAjax(`http://localhost:3000/users?name=${userName}&&password=${pass}`, "get", null);
  }

  // handle response of ajax call
  _handleResponse(event) {
    this.respCheck = event.detail.response
    if (this.respCheck != 0) {
      alert('login succesful')
      const { name, mobileNumber, gender, dateOfBirth, religion, state, emailAddress, education, collegeName, profession, annualIncome } = event.detail.response[0]
      const obj = { name, mobileNumber, gender, dateOfBirth, religion, state, emailAddress, education, collegeName, profession, annualIncome }
      sessionStorage.setItem('loggedIn', JSON.stringify(obj))
      console.log(JSON.parse(sessionStorage.getItem('loggedIn')))
      sessionStorage.setItem('isLogin', "true")
      this.dispatchEvent(new CustomEvent('isLogin', { detail: { item: null }, bubbles: true, composed: true }))
      this.$.form.reset();
      this.dispatchEvent(new CustomEvent('refresh', { bubbles: true, composed: true }))
      this.set('route.path', 'user-home');

    }
    else {
      alert('not registed');

    }

  }



  // ajax call method
  _makeAjax(url, method, postObj) {
    let ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    //ajax.generateRequest();
    ajax.generateRequest();
  }

}

window.customElements.define('user-login', UserLogin);