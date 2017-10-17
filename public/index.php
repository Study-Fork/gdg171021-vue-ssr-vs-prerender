<?php
require __DIR__ . '/../vendor/autoload.php';

// init
$app = new Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ],
]);

// set view
$container = $app->getContainer();
$container['view'] = function ($container) {
    return new \Slim\Views\Twig(__DIR__ . '/../views');
};

// handle vue controller
$vueResponseHandler = function ($request, $response, $args) {
    return $this->view->render($response, 'vue.twig');
};

// routing
$app->get('/', $vueResponseHandler);
$app->get('/about', $vueResponseHandler);
$app->get('/contact', $vueResponseHandler);

// run
$app->run();
