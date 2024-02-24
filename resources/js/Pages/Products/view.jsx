import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function View({ product }) {
    return (
        <GuestLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {product.name}
                </h2>
            }
        >
            <Head title="Product" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col flex-wrap m-5 items-center">
                            <div className="w-full max-w-72 min-w-sm p-5">
                            
                            <img
                                        className="w-full h-full object-contain"
                                        src={product.image ? `/storage/imgs/products/${product.id}/${product.image}` : "/imgs/default.jpg"}
                                        alt="Product Image"
                                    ></img>

                            </div>
                            <div className="py-1 px-10">
                                <h1 className="text-lg font-bold">{product.name}</h1>
                            </div>

                            <div className="py-1 px-10">
                                <h2 className="text-md font-semibold">Php {product.price}</h2>
                            </div>

                            <div className="py-1 px-10">
                                <h2 className="font-medium">{product.description}</h2>
                            </div>

                            <div className="py-1 px-10">
                                <p className="font-normal">{product.other_info}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
