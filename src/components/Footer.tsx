import React from 'react';

interface LocationSection {
  title: string;
  locations: string[];
}

const Footer: React.FC = () => {
  const locationSections: LocationSection[] = [
    {
      title: "Popular Locations",
      locations: ["Kolkata", "Mumbai", "Chennai", "Pune"]
    },
    {
      title: "Trending Locations",
      locations: ["Bhubaneshwar", "Hyderabad", "Chandigarh", "Nashik"]
    },
    {
      title: "About Us",
      locations: ["Tech@OLX"]
    },
    {
      title: "Popular Locations",
      locations: ["Kolkata", "Mumbai", "Chennai", "Pune"]
    },
    {
      title: "OLX",
      locations: ["Blog", "Help", "Sitemap", "Legal & Privacy information", "Vulnerability Disclosure Program"]
    }
  ];

  return (
    <div className=' sm:grid hidden sm:grid-cols-12'>
      <div className='sm:col-span-12 sm:grid-cols-10 p-7 bg-gray-100 h-[170px] flex  justify-around'>
        {locationSections.map((section, index) => (
          <div key={`${index}`} className="sm:col-span-2 col-span-5">
            <h6 className='text-1xl font-bold'>{section.title}</h6>
            {section.locations.map((value, valueIndex) => (
              <p className='text-sm text-gray-700 hover:text-gray-900 cursor-pointer ' key={`${value}-${valueIndex}`}>{value}</p>
            ))}
          </div>
        ))}
      </div>

      <div className='col-span-12 bg-gray-800 h-[200px] flex justify-between p-12 sm:px-15 items-center'>
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" className=" w-[11rem]" alt="" />
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1" className=" w-[5rem]" alt="" />
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" className=" w-[8rem]" alt="" />
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" className=" w-[8rem]" alt="" />
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" className=" w-[8rem]" alt="" />
        <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" className=" w-[8rem]" alt="" />
      </div>
    </div>
  );
};

export default Footer;