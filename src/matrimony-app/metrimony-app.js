import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';


import '@polymer/app-route/app-route.js'
import '@polymer/app-route/app-location.js'
import '@polymer/iron-pages/iron-pages.js'
import '@polymer/paper-tabs/paper-tabs.js'
import '@polymer/paper-tabs/paper-tab.js'
import '@polymer/paper-tabs/paper-tabs-icons.js'
import '@polymer/paper-button/paper-button.js'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js'
import '@polymer/app-layout/app-drawer/app-drawer.js'
import '@polymer/app-layout/app-header-layout/app-header-layout.js'
import '@polymer/app-layout/app-header/app-header.js'

import { setRootPath } from '@polymer/polymer/lib/utils/settings.js'

/**
 * @customElement
 * @polymer
 */

setRootPath(MyRoute.rootPath)
class Matrimony extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        h2{
          text-align:center;
          
        }

        paper-tabs{
          background-color:lightgreen;
          
        }
        a {
          margin-top:20px;
          font-size:20px;
          color: black;;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }
        .custom{
          background-color:lightgreen;     
          
        }
        
      </style>
      <div>
      

      <app-location route={{route}}></app-location>
    <app-route data="{{routeData}}" route="{{route}}" pattern="[[rootPath]]:page"></app-route>

    <app-drawer-layout>
    <app-header-layout>

        <app-header class="main-header" slot="header">
        <h2> [[prop1]]!</h2></div>
        <paper-tabs selected={{page}} attr-for-selected="name"> 
          <template is="dom-if" if=[[isLogin]]> 
            <paper-tab><a name='user-home' href="/user-home">User Home</a></paper-tab>
            <paper-tab><a name='my-request' href="/my-request">My Request</a></paper-tab>
            <paper-tab><a name='my-profile' href="/my-profile">My Profile</a></paper-tab>
            <paper-tab><a name='my-crush' href="/my-crush">My Crush</a></paper-tab>
            <button class="custom" on-click="logout">logout</button>
            
          </template>

          

          <template is="dom-if" if=[[!isLogin]]> 
          
          <paper-tab><a name='user-login' href="/user-login">User login</a></paper-tab>
          <paper-tab><a name='user-register' href="/user-register">User register</a></paper-tab>
       
            </template>
          
          </paper-tabs>
          
        </app-header>
        
        <iron-pages selected={{page}} attr-for-selected="name" role="main">

        
          
          <user-login name = 'user-login'></user-login>
          <user-logout name = 'user-logout'></user-logout>
          <user-register name = 'user-register'></user-register>
          <user-home  id="home" name = 'user-home' ></user-home>
          <my-request name = 'my-request' ></my-request>
          <my-profile  name = 'my-profile' ></my-profile>
          <my-crush  name = 'my-crush'></my-crush>

        

        </iron-pages>



      </app-header-layout>
      <app-drawer-layout>
      
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Matrimony Website'
      },
      page: {
        type: String,
        observer: '_changePage'
      },
      routeData: {
        type: Object
      },
      oppGen:String,

      isLogin:Boolean
    };
  }

  // complex observer
  static get observers() {
    return ['_pageChanged(routeData.page)']
  }

  // method of complex observer
  _pageChanged(page) {
    this.page = page || '';
  }

  logout(){
    sessionStorage.clear();
    alert('logged out')
    this.set('route.path', 'user-logout');
    this.isLogin=false;
  }



  ready() {
    super.ready();
    this.addEventListener('isLogin', event => {
      this.isLogin = sessionStorage.getItem("isLogin")
    })
    this.addEventListener('refresh', event => {
      let {gender} = JSON.parse(sessionStorage.getItem("loggedIn")) ;
      console.log(gender)
      if (gender == 'male') {
        this.oppGen = 'female';
      }
      else {
        this.oppGen = 'male';
      }
      this.$.home.this.shadowRoot.querySelector('h1').innerHTML += name;
      this.$.home.makeAjaxCall(`http://localhost:3000/users?gender=${this.oppGen}`, 'get', null)
      console.log(this.$.home.oppGen)
    })
  }


  // method of simple observer
  _changePage(page) {
    let url;
    switch (page) {
      case ('user-login'):
        {
          import('./user-login.js')
          break;
        }


      case ('user-register'):
        {
          import('./user.js')
          break;
        }

      case ('user-home'):
        {
          import('./user-home')
          break;
        }

      case ('my-request'):
        {
          import('./my-request.js')
          break;
        }

      case ('my-profile'):
        {
          import('./my-profile')
          break;
        }
      case ('my-crush'):
        {
          import('./my-crush')
          break;
        }
      default:
        {
          import('./user-logout')
          break;
        }
    }

  }

}

window.customElements.define('metrimony-app', Matrimony);
