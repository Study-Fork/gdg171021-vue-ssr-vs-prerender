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
    try {
        return $this->view->render($response, '_prerendered' . $request->getUri()->getPath() . '/index.twig');
    } catch (Twig_Error_Loader $e) {
        return $this->view->render($response, 'vue.twig');
    }
};

// routing
$app->get('/', $vueResponseHandler);
$app->get('/about', $vueResponseHandler);
$app->get('/contact', $vueResponseHandler);

// run
$app->run();
