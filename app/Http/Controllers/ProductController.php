<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request){


        $searchQuery = $request->query('search');

        $productsQuery = Product::query();

        if ($searchQuery) {
            $productsQuery->where('name', 'like', '%' . $searchQuery . '%');
        }else{
            $searchQuery = "";
        }

        $products = $productsQuery->paginate(8);

        // $products = Product::paginate(8);

        return Inertia::render('Products/index', ['products' => $products, 'searchQuery' => $searchQuery]);

    }

    public function view(Product $product){

        return Inertia::render('Products/view', ['product' => $product]);

    }

    public function adminIndex(){

        $products = Product::paginate(10);

        return Inertia::render('Products/admin/index',['products' => $products]);

    }

    public function add(){

        return Inertia::render('Products/admin/add');

    }

    public function store(Request $request){

        $file = $request->file('image');

        

        $product = Product::create($request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'other_info' => ['required'],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg'
        ]));

        $product->is_available = $request->is_available;
        $product->is_featured = $request->is_featured;

        if ($file) {

            $product->image = $file->getClientOriginalName();
        
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $fileMimeType = $file->getMimeType();

            $filePath = $file->storeAs('imgs/products/'.$product->id, $fileName, 'public');
            
        }

        $product->save();

        

    }

    public function adminView(Product $product){

        return Inertia::render('Products/admin/view', ['product' => $product]);

    }

    public function destroy(Product $product){

        $product->delete();
        
    }

    public function edit(Product $product){

        return Inertia::render('Products/admin/edit', ['product' => $product]);

    }

    public function update(Request $request, Product $product){

    
        $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'other_info' => ['required'],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg'
        ]);
    
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->other_info = $request->other_info;
        $product->is_available = $request->is_available;
        $product->is_featured = $request->is_featured;
    
        $file = $request->file('image');
    
        if ($file) {
            
            if ($product->image) {
                Storage::disk('public')->delete('imgs/products/'.$product->id.'/'.$product->image);
            }

            $product->image = $file->getClientOriginalName();
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $fileMimeType = $file->getMimeType();
            $filePath = $file->storeAs('imgs/products/'.$product->id, $fileName, 'public');
        }
    
        $product->save();

    }

}
