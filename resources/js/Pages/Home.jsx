import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PosterCarousel from '@/Components/PosterCarousel'
import FeaturedProduct from '@/Components/FeaturedProduct';
export default function Home({ products, posters}) {
    return (
        <GuestLayout
        >
            <Head title="Home" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full px-10 my-10 w-96">
                            <PosterCarousel posters={posters}></PosterCarousel>
                        </div>
                        <hr className='border-1 border-teal-700 mx-2'></hr>
                        <div className="text-center"><h2 className='font-serif text-lg font-bold'>Featured Products</h2></div>
                        <div className="w-full px-10 my-10 w-96">
                            <FeaturedProduct products={products}></FeaturedProduct>
                        </div>
                    </div>
                </div>

                {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Featured Products</div>
                        {products.map((product) => (

                            <div key={product.id}>
                                <h1>{product.name}</h1>
                                <img className='w-24 h-24' src={product.image ? `/storage/imgs/products/${product.id}/${product.image}` : "/imgs/default.jpg"} />
                            </div>

                        ))}
                    </div>
                </div> */}
            </div>
            
        </GuestLayout>
    );
}
