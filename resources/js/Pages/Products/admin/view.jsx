import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from "@inertiajs/react";
export default function AdminView({ auth, product }){


    return(
        <AuthenticatedLayout
            user = {auth.user}
            header={

                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {product.name}
                </h2>

            }
        >

        <Head title='Admin View'/>
            
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <div className="flex justify-center m-10 px-10">
                                <table className="w-full table-auto">
                                    <tbody>
                                        <tr>
                                            <td className='text-xl font-bold py-3 w-1/5'>Product Name:</td>
                                            <td className='text-lg font-semibold py-3 text-left'>{product.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-xl font-bold py-3'>Description:</td>
                                            <td className='text-lg font-semibold'>{product.description}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-xl font-bold py-3'>Price:</td>
                                            <td className='text-lg font-semibold'>{product.price}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-xl font-bold py-3'>Image:</td>
                                            <td className='text-lg font-semibold'>{product.image}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-xl font-bold py-3'>Other Information:</td>
                                            <td className='text-lg font-semibold'>{product.other_info}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        </AuthenticatedLayout>
    )
}