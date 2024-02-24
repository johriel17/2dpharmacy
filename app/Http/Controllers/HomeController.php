<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Poster;
class HomeController extends Controller
{
    //

    public function index(){

        $products = Product::where('is_featured', true)->get();

        $posters = Poster::where('is_display', true)->get();

        return Inertia::render('Home', ['products' => $products, 'posters' => $posters]);

    }
}
