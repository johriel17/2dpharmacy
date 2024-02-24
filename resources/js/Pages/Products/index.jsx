import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";

//fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
export default function Index({ products, searchQuery }) {
    const [searchText, setSearchText] = useState(searchQuery);

    // useEffect (() => {

    //     // router.visit(route("products", {page: products.current_page, search : searchText}))
    //     router.reload({only :['products']});

    // },[searchText])

    const nextPage = () => {
        const nextPageNumber = products.current_page + 1;
        router.visit(
            route("products", { page: nextPageNumber, search: searchText })
        );
    };

    const prevPage = () => {
        const prevPageNumber = products.current_page - 1;
        router.visit(
            route("products", { page: prevPageNumber, search: searchText })
        );
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.visit(route("products", { page: 1, search: searchText }));
        }
    };

    return (
        <GuestLayout
            header={
                <div className="flex flex-row justify-between">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Products
                        </h2>
                    </div>

                    <div className="flex flex-row gap-5">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearch}
                            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div
                            className={
                                "flex justify-center items-center p-20 " +
                                (products.data.length > 0
                                    ? "hidden"
                                    : "")
                            }
                        >
                            <h1 className="text-4xl">No Data Available!</h1>
                        </div>
                        <div className="flex flex-wrap m-5 justify-center sm:justify-start md:justify-start xl-justify-start">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="max-w-sm sm:basis-1/2 md:basis-1/3 lg:basis-1/4 rounded overflow-hidden shadow-lg my-3 px-3"
                                >
                                    <div className="flex justify-center">
                                    <div className="w-64 h-40">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={product.image ? `/storage/imgs/products/${product.id}/${product.image}` : "/imgs/default.jpg"}
                                            alt="Product Image"
                                        />
                                    </div>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">
                                            {product.name}
                                        </div>
                                        <p className="text-gray-700 text-base mb-2">
                                            Php {product.price}
                                        </p>
                                        {(product.is_available ? <p className="text-green-600">Available</p> : <p className="text-red-600">Unavailable</p>)}
                                    </div>
                                    <div className="py-3">
                                        <Link href={`/products/${product.id}`}>
                                            <SecondaryButton className="ms-4">
                                                View more
                                            </SecondaryButton>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"flex flex-wrap p-10 justify-end " + (products.data.length > 0 ? "" : "hidden")}>
                            <div className="mx-5">
                                <button
                                    onClick={prevPage}
                                    disabled={products.current_page === 1}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    Prev
                                </button>
                            </div>

                            <div className="mx-5">{products.current_page}</div>
                            <div className="mx-5">
                                <button
                                    onClick={nextPage}
                                    disabled={
                                        products.current_page ===
                                        products.last_page
                                    }
                                >
                                    Next
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
