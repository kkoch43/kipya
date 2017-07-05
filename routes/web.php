<?php

use App\Location;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

});

Route::get('map', function () {

    $districts = Location::pluck('district','district');

    return view('front', compact('districts'));

});

