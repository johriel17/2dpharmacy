import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { router } from "@inertiajs/react";
export default function AdminIndex({ auth, products }) {

    const [confirmingProductDeletion, setConfirmingProductDeletion] = useState(false);
    const [productToDel, setProductToDel] = useState({
        id: null,
        name: "",
    })

    const confirmProductDeletion = (productToDel) => {
        setProductToDel(productToDel)
        setConfirmingProductDeletion(true);
    };

    const closeModal = () => {
        setConfirmingProductDeletion(false);
    };

    const deleteProduct = () => {

        router.delete(`/admin-products/destroy/${productToDel.id}`, {preserveScroll: true})
        setConfirmingProductDeletion(false);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-row justify-between">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Admin Products
                        </h2>
                    </div>

                    <div className="flex flex-row gap-5">
                        <Link
                            href="/admin-products/add"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add Product
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="bg-white border-b"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.image}
                                            </td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <Link
                                                        href={`/admin-products/${product.id}`}
                                                        type="button"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/admin-products/edit/${product.id}`}
                                                        type="button"
                                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                    onClick={() => confirmProductDeletion(product)}
                                                        type="button"
                                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {products.data.length === 0 && 
                                    
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 text-center" colSpan="5">
                                                No data available!
                                        </td>
                                    </tr>
                                    }

                                </tbody>
                            </table>
                            {/* Pagination */}
                            {products.data.length > 0 &&
                            <div className="flex justify-end my-4 px-5">
                                <Pagination links={products.links} />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingProductDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete {productToDel.name}?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton onClick={deleteProduct} className="ms-3">
                            Delete Product
                        </DangerButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
