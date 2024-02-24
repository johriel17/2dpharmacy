import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
export default function Footer() {
    return (
        <footer
        className="bg-sky-200 border-b border-gray-100 relative text-center">
        <div className="pt-2 text-center text-neutral-700">
          © 2024 Copyright
        </div>
        <div className="flex justify-start gap-10 px-10">
            <Link href='/about' className="p-2 text-center text-neutral-700 hover:text-blue-500">
                About Us
            </Link>
            <div className="p-2 text-center text-neutral-700">
                <ul className='w-full text-left'>
                    <li>Contact Us:</li>
                    <li><span className='mx-3'> <FontAwesomeIcon icon={faPhone} /></span>
                <span>(63+) 9999999999</span></li>
                    <li><span className="mx-3"><FontAwesomeIcon icon={faFacebook} /></span>
                <span>2dpharmacy</span></li>
                    <li><span className="mx-3"><FontAwesomeIcon icon={faEnvelope} /></span>
                <span>sample@gmail.coom</span></li>
                </ul>  
            </div>
        </div>
        
      </footer>
    );
}
