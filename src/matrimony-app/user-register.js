import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';


import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';


import '@polymer/app-route/app-location.js';


import './shared-styles.js'


/**
* @customElement
* @polymer
*/
class UserRegister extends PolymerElement {
static get template() {
return html`
<style include="shared-styles">
  :host {
    display: block;

  }
</style>
<h2> [[prop1]]!</h2>

<app-location route={{route}}></app-location>

<iron-form id="form">
  <h3>Register New Member</h3>
  <form>
    <paper-tabs selected={{selected}}>
      <paper-tab>PERSONAL DETAIL</paper-tab>
      <paper-tab>EDUCATIONAL DETAIL</paper-tab>
      <paper-tab>PROFESSIONAL DETAIL</paper-tab>
    </paper-tabs>


    <iron-pages selected={{selected}}>
      <div>
        <paper-input label="Name" value={{name}} name="Name"></paper-input>
        <paper-input label="Mobile Number" auto-validate pattern="[0-9]*" error-message="numbers only!" type="text"
          maxlength="10"></paper-input>
        <label id="label1">I am :</label>
        <paper-radio-group id="gender" selected="male" aria-labelledby="label1">
          <paper-radio-button name="male">Male</paper-radio-button>
          <paper-radio-button name="female">Female</paper-radio-button>
        </paper-radio-group> <br>

        <label id="label2">I am looking for :</label>
        <paper-radio-group id="look" selected="male" aria-labelledby="label2">
          <paper-radio-button name="male">Male</paper-radio-button>
          <paper-radio-button name="female">Female</paper-radio-button>
        </paper-radio-group> <br>

        <paper-input label="Date of Birth" type="date" value={{dob}} name="dob"></paper-input>
        <paper-dropdown-menu id="religion" label="Religion">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected="">
            <paper-item>Hindu</paper-item>
            <paper-item>Muslim</paper-item>
            <paper-item>Sikh</paper-item>
            <paper-item>Christian</paper-item>
          </paper-listbox>
        </paper-dropdown-menu> <br>

        <paper-dropdown-menu id="state" label="State">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected="">
            <paper-item>New Delhi</paper-item>
            <paper-item> Bangalore</paper-item>
            <paper-item>Pune</paper-item>
            <paper-item>Noida</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input label="Email Address" type="Email" value={{emailAddress}} name="emailAddress"></paper-input>
        <paper-button raised class="custom indigo" on-click="nextStep">Next Step</paper-button>
      </div>
      
      <div>
        <paper-dropdown-menu id="education" label="Education">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected="">
            <paper-item>12th pass</paper-item>
            <paper-item>Graduate</paper-item>
            <paper-item>Post Graduate</paper-item>
            <paper-item>PHD</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input label="College Name" value={{collegeName}} name="collegeName"></paper-input>
        <paper-button raised class="custom indigo" on-click="nextStep1">Next Step</paper-button>
      </div>
      <div>
        <paper-input label="Profession" value={{profession}} name="profession"></paper-input>
        <paper-input label="Specialization" value={{specialization}} name="Specialization"></paper-input>
        <paper-input label="Annual Income" maxlength="10" value={{annualIncome}} name="annualIncome"></paper-input>
        <paper-button raised class="custom indigo" on-click="addToDatabase">Register</paper-button>
      </div>
    </iron-pages>
  </form>
</iron-form>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" on-error="_handleError"
  content-type="application/json"></iron-ajax>

`;
}
static get properties() {
return {
prop1: {
type: String,
value: 'User Register Route Page'
},

selected: {
type: Number,
value: 0
}
};
}

nextStep() {
this.selected = "1";

console.log(randompassword)
}
nextStep1() {
this.selected = "2"
}

//calling function post user data in database
addToDatabase(){
var randomPassword = Math.random().toString(36).slice(-8);

// get the user data

let obj = { name: this.name, mobileNumber:this.mobileNumber,
gender:this.$.gender.selected, lookingFor:this.$.look.selected, dateOfBirth:this.dob,
religion:this.$.religion.value,state:this.$.state.value,
emailAddress:this.emailAddress, password:randomPassword,
education:this.$.education.value,
collegeName:this.collegeName,profession:this.profession,specialization:this.Specialization,
annualIncome:this.annualIncome};

// let obj = []
// obj.push(obj1,obj2,obj3)


this._makeAjax("http://localhost:3000/users", "post", obj);
alert('registration successful')


}
//handling response on ajax call
_handleResponse (event){
this.$.form.reset()
this.set('route.path', 'user-login');
}





// ajax call method
_makeAjax(url, method, postObj) {
let ajax = this.$.ajax;
ajax.method = method;
ajax.url = url;
ajax.body = postObj ? JSON.stringify(postObj) : undefined;
ajax.generateRequest();
}

}

window.customElements.define('user-register', UserRegister);