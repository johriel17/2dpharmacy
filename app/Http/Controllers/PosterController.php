<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Poster;
use Illuminate\Support\Facades\Storage;

class PosterController extends Controller
{
    public function adminIndex(){

        $posters = Poster::paginate(10);

        return Inertia::render('Posters/admin/index',['posters' => $posters]);
        
    }

    public function add(){

        return Inertia::render('Posters/admin/add');

    }

    public function store(Request $request){

        $file = $request->file('image');

        

        $poster = Poster::create($request->validate([
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'is_display' => 'required',
        ]));


        if ($file) {

            $poster->image = $file->getClientOriginalName();
        
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $fileMimeType = $file->getMimeType();

            $filePath = $file->storeAs('imgs/posters/'.$poster->id, $fileName, 'public');
            
        }

        $poster->save();

    }

    public function adminView(Poster $poster){

        return Inertia::render('Posters/admin/view', ['poster' => $poster]);

    }

    public function destroy(Poster $poster){

        $poster->delete();
        
    }

    public function edit(Poster $poster){

        return Inertia::render('Posters/admin/edit', ['poster' => $poster]);

    }

    public function update(Request $request, Poster $poster){

        $request->validate([
            'title' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'is_display' => 'required',
        ]);

        $poster->title = $request->title;
        $poster->is_display = $request->is_display;
 
        $file = $request->file('image');
    
        if ($file) {
            
            if ($poster->image) {
                Storage::disk('public')->delete('imgs/posters/'.$poster->id.'/'.$poster->image);
            }

            $poster->image = $file->getClientOriginalName();
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $fileMimeType = $file->getMimeType();
            $filePath = $file->storeAs('imgs/posters/'.$poster->id, $fileName, 'public');
        }
    
        $poster->save();

    }

}
