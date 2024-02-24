import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
export default function FeaturedProduct({ products }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {products.map((product) => (
                    <div className='w-full max-w-96 p-5' key={product.id}>
                        <div className='h-32'>
                        <img className='w-full h-full rounded-lg object-contain' src={product.image ? `/storage/imgs/products/${product.id}/${product.image}` : "/imgs/default.jpg"} />
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
        </Slider>
    );
}

