<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\PosterController;
use App\Http\Controllers\HomeController;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('home');

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{product}', [ProductController::class, 'view']);

Route::get('/admin-dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified'])->name('admin-dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/admin-products', [ProductController::class, 'adminIndex'])->name('admin-products');
    Route::get('/admin-products/add', [ProductController::class, 'add']);
    Route::post('/admin-products/store', [ProductController::class, 'store']);
    Route::get('/admin-products/{product}', [ProductController::class, 'adminView']);
    Route::delete('/admin-products/destroy/{product}', [ProductController::class, 'destroy']);
    Route::get('/admin-products/edit/{product}', [ProductController::class, 'edit']);
    Route::post('/admin-products/update/{product}', [ProductController::class, 'update'])->name('product.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/admin-posters', [PosterController::class, 'adminIndex'])->name('admin-posters');
    Route::get('/admin-posters/add', [PosterController::class, 'add']);
    Route::post('/admin-posters/store', [PosterController::class, 'store']);
    Route::get('/admin-posters/{poster}', [PosterController::class, 'adminView']);
    Route::delete('/admin-posters/destroy/{poster}', [PosterController::class, 'destroy']);
    Route::get('/admin-posters/edit/{poster}', [PosterController::class, 'edit']);
    Route::post('/admin-posters/update/{poster}', [PosterController::class, 'update'])->name('poster.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about', function () {

    return Inertia::render('Infos/about');

})->name('about');

require __DIR__.'/auth.php';
