<?php

use App\Http\Controllers\RelationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']); // TODO: remove this
});





Route::group(['middleware' => 'auth:api'], function () {
    Route::get('user', [AuthController::class, 'user']); // TODO: remove this
    Route::get('logout', [AuthController::class, 'logout']);

    Route::post('relation', [RelationController::class, 'add']);
    Route::delete('relation', [RelationController::class, 'delete']);
    Route::get('relation', [RelationController::class, 'all']);

    Route::group(['prefix' => 'relation'], function() {
        Route::get('clients', [RelationController::class, 'clients']);
        Route::get('books', [RelationController::class, 'books']);
    });
});

