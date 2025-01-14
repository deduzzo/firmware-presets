/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /swagger.json': (_, res) => {
    const swaggerJson = require('../swagger/swagger.json');
    if (!swaggerJson) {
      res
        .status(404)
        .set('content-type', 'application/json')
        .send({message: 'Cannot find swagger.json, has the server generated it?'});
    }
    return res
      .status(200)
      .set('content-type', 'application/json')
      .send(swaggerJson);
  },

  '/': { view: 'pages/homepage' },

  'GET /api/v1/repository/:name/*': { action: 'repository' },
  'GET /api/v1/repo/:name/*': { action: 'dynamic-repository' },




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
