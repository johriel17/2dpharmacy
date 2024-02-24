import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function PosterCarousel({ posters }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {posters.map((poster) => (
                <div key={poster.id} className="poster-content">
                    <div className='w-full max-w-96 self-center'>
                        <img className='m-auto' src={`/storage/imgs/posters/${poster.id}/${poster.image}`} />
                    </div>
                </div>
            ))}
        </Slider>
    );
}

