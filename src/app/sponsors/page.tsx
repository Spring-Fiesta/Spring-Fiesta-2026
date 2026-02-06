'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Sponsors() {
  return (
    <div>
      <Navbar />
      <div className="overflow-x-hidden min-h-screen overflow-hidden bg-[#23203C]">
        {/* Title Sponsor Section */}
        <div className="sm:h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-64 mt-20 relative">
          <div className="flex flex-col justify-start md:ml-12 lg:ml-24 md:justify-start items-center md:items-start relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 md:mb-8" style={{ fontFamily: 'Unbounded' }}>
              Title Sponsor
            </h1>
            <div className="h-[200px] w-[300px] md:h-[300px] md:w-[450px] lg:h-[400px] lg:w-[630px]">
              <img src="/images/benq.png" alt="BenQ" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="absolute inset-0 md:relative md:inset-auto flex justify-end items-center opacity-20 md:opacity-100">
            <img src="/images/sponsors_img1.png" alt="Title Sponsor" className="w-64 md:w-80 lg:w-96 h-auto object-contain" />
          </div>
        </div>

        {/* Associate Sponsors Section */}
        <div className="sm:h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-2 lg:mt-20 relative">
          <div className="absolute inset-0 md:relative md:inset-auto flex justify-start items-center opacity-20 md:opacity-100">
            <img src="/images/sponsors_img2.png" alt="Associate Sponsor" className="w-64 md:w-80 lg:w-96 h-auto object-contain" />
          </div>
          <div className="flex flex-col justify-start md:mr-8 lg:mr-16 md:justify-start items-center md:items-start relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 md:mb-8 md:mr-5" style={{ fontFamily: 'Unbounded' }}>
              Associate Sponsors
            </h1>
            <div className="w-full max-w-xl grid grid-cols-2 gap-4 md:gap-8 justify-center items-center">
              <div className="h-[100px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[150px] lg:w-[250px]">
                <img src="/images/sbi_logo.png" alt="SBI" className="w-full h-full object-contain" />
              </div>
              <div className="h-[100px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[150px] lg:w-[250px]">
                <img src="/images/canara.png" alt="Canara Bank" className="w-full h-full object-contain" />
              </div>
              <div className="h-[100px] w-[150px] md:h-[60px] md:w-[200px] lg:h-[80px] lg:w-[250px] col-span-2 justify-self-center">
                <img src="/images/stockgro_logo.png" alt="StockGro" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="sm:h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-10 md:mt-20 lg:mt-44 relative">
          <div className="flex flex-col justify-start md:ml-12 lg:ml-24 md:justify-start items-center md:items-start relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 md:mb-8" style={{ fontFamily: 'Unbounded' }}>
              Sponsors
            </h1>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="h-[100px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[150px] lg:w-[250px]">
                <img src="/images/mother_diary_logo.png" alt="Mother Dairy" className="w-full h-full object-contain" />
              </div>
              <div className="h-[100px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[100px] lg:w-[250px]">
                <img src="/images/km_logo.png" alt="KM" className="w-full h-full object-contain" />
              </div>
              <div className="h-[60px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[150px] lg:w-[250px]">
                <img src="/images/ease_my_trip_logo.png" alt="EaseMyTrip" className="w-full h-full object-contain" />
              </div>
              <div className="h-[100px] w-[150px] md:h-[120px] md:w-[200px] lg:h-[150px] lg:w-[250px]">
                <img src="/images/mey_mey_logo.png" alt="Mey Mey" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 md:relative md:inset-auto flex justify-end items-center opacity-20 md:opacity-100">
            <img src="/images/sponsors_img3.png" alt="Sponsor" className="w-64 md:w-80 lg:w-96 h-auto object-contain" />
          </div>
        </div>

        <div className="md:mb-20" />
        <Footer />
      </div>
    </div>
  )
}
