import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Checkbox from "@/Components/Checkbox";
export default function Add({ auth }) {

    const { data, setData, post, processing, errors, wasSuccessful, recentlySuccessful, reset, progress } = useForm({
        title: '',
        is_display : true,
        image: null,
      })
      
      function submit(e) {
        e.preventDefault()
        post('/admin-posters/store')

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
            <Head title="Add Poster" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-center m-10 px-10">

                        <form className="w-full mx-auto" onSubmit={submit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Poster title</label>
                                <input type="text" id="name" value={data.title} onChange={e => setData('title', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                {errors.title && <div className="text-red-500">{errors.title}</div>}
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Image</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file" onChange={e => setData('image', e.target.files[0])}></input>
                                {errors.image && <div className="text-red-500">{errors.image}</div>}
                            </div>
                            <div className="mb-5">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="is_display"
                                        checked={data.is_display}
                                        onChange={(e) => setData('is_display', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm font-medium text-gray-900">Display</span>
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

                                <button type="submit" disabled={processing}>Save</button>
                            </div>
                        </form>

                        </div>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
