import { router } from '@inertiajs/react'


export default function Pagination({ links }) {


      const handleChangePage = (url) =>{
        router.visit(url,{only: ['products']});
      }

      
      const activeLinkIndex = links.findIndex((link) => link.active);

      const filteredLinks = links.filter((link, index) => {
        const rightLink = index - 1;

        const leftLink = index + 1;
        
        if(activeLinkIndex === rightLink) return true;

        if(activeLinkIndex === leftLink) return true;

        if (index === 0) return true;

        if (index === 1 || index === links.length - 2) return true;

        if (index === links.length - 1) return true;

        if (link.active) return true;
        return false;
    });

    

    return  (
        <div className="flex justify-center my-4">
            {filteredLinks.map((link) => (
                <button
                    key={link.label}
                    className={"px-3 py-1 mx-1 border border-gray-400 rounded hover:bg-gray-200 " + (link.active ? "bg-gray-500" : "")}
                    disabled={link.active === true || link.url === null}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    onClick={() => handleChangePage(link.url)}
                ></button>
            ))}
        </div>
    );
}