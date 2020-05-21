/* global __dirname */

const path = require('path')
const express = require('express')

/**
 * Extension for Web Server
 * Provide Route to Vue library
 *
 * @class
 * @param {object} server http or https node.js object
 * @param {object} webSettings settings of the web server, like <pre><code>{secure: settings.secure, port: settings.port}</code></pre>
 * @param {object} adapter web adapter object
 * @param {object} instanceSettings instance object with common and native
 * @param {object} app express application
 */
class WebExtension {
   constructor(server, webSettings, adapter, instanceSettings, app) {
      this.defaultConfig = { "route": "vue" }
      if(instanceSettings){
         this.config = instanceSettings.native
         if(! /^\w[\w\/-]*\w$/.test(instanceSettings.native.route)){
            adapter.log.error('Invalid route: ' + instanceSettings.native.route)
            this.config.route = this.defaultConfig.route
         }
      } else {
         this.config = this.defaultConfig
      }
      
      app.use('/' + this.config.route + '/js', express.static(path.join(__dirname, 'node_modules/vue/dist')))
      
      adapter.log.info('Vue registered on route /' + this.config.route)
   }
}

module.exports = WebExtension