var express = require('express');

var usersController = require('./controllers/usersController');
var categoriesController = require('./controllers/categoriesController');
var partsController = require('./controllers/partsController');
var customersController = require('./controllers/customersController');
var providersController = require('./controllers/providersController');
var movementsController = require('./controllers/movementsController');
var salesController = require('./controllers/salesController');

exports.router = (() => {
    var apiRouter = express.Router();

    //User Register and Login Routes 
    apiRouter.route('/login').post(usersController.login);
    apiRouter.route('/register').post(usersController.register);

    //Categories Routes
    apiRouter.route('/categories/').get(categoriesController.getCategories);
    apiRouter.route('/category/').post(categoriesController.createCategory);
    apiRouter.route('/category/:id').get(categoriesController.getCategory);
    apiRouter.route('/category/:id').put(categoriesController.updateCategory);
    apiRouter.route('/category/:id').delete(categoriesController.deleteCategory);

    //Parts Routes
    apiRouter.route('/parts/').get(partsController.getParts);
    apiRouter.route('/part/').post(partsController.createPart);
    apiRouter.route('/part/:id/').get(partsController.getPart);
    apiRouter.route('/part/:id/').put(partsController.updatePart);
    apiRouter.route('/part/:id/').delete(partsController.deletePart);

    //Customers Routes
    apiRouter.route('/customers/').get(customersController.getCustomers);
    apiRouter.route('/customer/').post(customersController.createCustomer);
    apiRouter.route('/customer/:id').get(customersController.getCustomer);
    apiRouter.route('/customer/:id').put(customersController.updateCustomer);
    apiRouter.route('/customer/:id').delete(customersController.deleteCustomer);

    //Providers Routes
    apiRouter.route('/providers/').get(providersController.getProviders);
    apiRouter.route('/provider/').post(providersController.createProvider);
    apiRouter.route('/provider/:id').get(providersController.getProvider);
    apiRouter.route('/provider/:id').put(providersController.updateProvider);
    apiRouter.route('/provider/:id').delete(providersController.deleteProvider);

    //Movements Routes
    apiRouter.route('/entry/').post(movementsController.addEntry);
    apiRouter.route('/entry/:id').get(movementsController.getEntry);
    apiRouter.route('/entries/').get(movementsController.getEntries);
    //apiRouter.route('/out/').post(movementsController.out);

    //Sales Routes
    apiRouter.route('/buy/').post(salesController.buy);
    apiRouter.route('/sale/:id').get(salesController.getSale);
    apiRouter.route('/sales/').get(salesController.getSales);

    return apiRouter;
})();



