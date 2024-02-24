import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Checkbox from "@/Components/Checkbox";
export default function Add({ auth }) {

    const { data, setData, post, processing, errors, wasSuccessful, recentlySuccessful, reset, progress } = useForm({
        name: '',
        description: '',
        price: '',
        other_info: '',
        image: null,
        is_available : false,
        is_featured : false,
      })
      
      function submit(e) {
        e.preventDefault()
        post('/admin-products/store')

      }

      useEffect(() => {
          
        if(wasSuccessful){
            reset()
            document.getElementById('file_input').value = '';
        }

      },[wasSuccessful])


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Add Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-center m-10 px-10">

                        <form className="w-full mx-auto" onSubmit={submit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                                <input type="text" id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="description" rows="4" value={data.description} onChange={e => setData('description',e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                {errors.description && <div className="text-red-500">{errors.description}</div>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="text" id="description" value={data.price} onChange={e => setData('price',e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {errors.price && <div className="text-red-500">{errors.price}</div>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="other_info" className="block mb-2 text-sm font-medium text-gray-900">Other Information</label>
                                <textarea id="other_info" rows="4" value={data.other_info} onChange={e => setData('other_info',e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                {errors.other_info && <div className="text-red-500">{errors.other_info}</div>}
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Image</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file" onChange={e => setData('image', e.target.files[0])}></input>
                                {errors.image && <div className="text-red-500">{errors.image}</div>}
                            </div>
                            <div className="mb-5">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.is_available}
                                        onChange={(e) => setData('is_available', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm font-medium text-gray-900">Available</span>
                                </label>
                            </div>
                            <div className="mb-5">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm font-medium text-gray-900">Feature</span>
                                </label>
                            </div>
                            
                            
                            <div className="flex justify-end items-center gap-4">
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">Saved.</p>
                                </Transition>

                                <button type="submit" disabled={processing} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                            </div>
                        </form>

                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
