import React from 'react'
import ImageCarousel from './components/ImageCarousel'
import { maxHeaderSize } from 'http';
import { Footer } from './components/Footer';

export default function About() {
  interface HostelComponentProps {
    hostel: string,
    description: string,
    hostelLabel: string,
  }

  function HostelComponent1({ hostel, description, hostelLabel }: HostelComponentProps) {
    return (<div className='p-4 sm:w-8/12 md:mx-auto mb-8'>
      <h2 className='sm:text-3xl text-2xl mb-4 text-gray-800 font-semibold' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }}>{hostel}</h2>
      <div className='flex md:flex-row flex-col justify-between items-center '>
        <div className='w-full sm:w-3/4'>
          {/* <img src='https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg' className='rounded-md' style={{width: '700px'}} /> */}
          <ImageCarousel hostelLabel={hostelLabel} />
        </div>
        <div className='md:w-3/4 md:ml-12 mt-4'>
          <p className='font-inter text-gray-500'>{description}</p>
        </div>
      </div>
    </div>);
  }

  function HostelComponent2({ hostel, description, hostelLabel }: HostelComponentProps) {
    return (<div className='p-4 sm:w-8/12 md:mx-auto mt-4 mb-8'>
      <h2 className='sm:text-3xl text-2xl mb-4 tracking-tight text-gray-800 font-semibold ' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }} >{hostel}</h2>
      <div className='flex md:flex-row-reverse flex-col justify-between items-center '>
        <div className='w-full sm:w-3/4'>
          {/* <img src='https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg' className='rounded-md' style={{width: '700px'}} /> */}
          <ImageCarousel hostelLabel={hostelLabel} />
        </div>
        <div className='sm:w-3/4 sm:mr-12 mt-4'>
          <p className='font-inter text-gray-500'>{description}</p>
        </div>
      </div>
    </div>);
  }

  return (
    <div className='p-4 mt-20 font-inter flex flex-col'>
      <div className='flex flex-col'>
      <h2 className='text-center font-inter text-4xl sm:text-6xl font-bold tracking-tight text-gray-800 mb-8' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.05)' }}>About <br></br>IIT Bhubaneswar</h2>
        
        <div className='flex flex-col p-4 items-center'>
          <div className='md:w-3/4 w-full'>
          <ImageCarousel hostelLabel='institute' />
          </div>
          <div className='flex md:flex-row flex-col justify-between md:w-3/4 md:mx-auto text-gray-600'>
            <p className='mt-12 w-full md:w-1/2 text-justify md:mr-8'>Indian Institute of Technology Bhubaneswar is established by the Government of India in 2008 under The Institutes of Technology Act 1961 with Amendments up to 2012. The Act was passed in the Lok Sabha on 24th March 2011 and by the Rajya Sabha on 30 April 2012. IIT Bhubaneswar became an Institute of National Importance from 29th June 2012 with notification of Amendment in the Institutes of Technology Act, 1961 by the Ministry of Education, (Department of Higher Education) Government of India published in the Gazette of India dated 2nd July 2012 .</p>
            
            <p className='mt-12 w-full md:w-1/2 text-justify md:ml-8'>The permanent campus of IIT Bhubaneswar is spreading over 936 Acres of land. It is situated at the foot of Barunei Hill, which is famous for its rich history. The campus provides a unique serene and pollution free academic environment. IIT Bhubaneswar has Academic area, Residential area and area for Training centres and Research Park. Although IIT Bhubaneswar had started functioning from two transit campuses in the Bhubaneswar city during its inception period, majority of residential and academic activities have now started in the permanent campus at Argul.  </p>
          </div>
        </div>

        <div className='mt-8'>
        <h2 className='text-center font-inter text-4xl sm:text-6xl font-bold tracking-tight text-gray-800 mb-8' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.10)' }}>Our Accomodation</h2>
        <div className='flex flex-col'>
          <HostelComponent1 hostel="Guest House"
            hostelLabel='GH'
            description='
            The institute has a guest house situated in the main IIT campus located at Argul, in order to provide accommodation to individuals and groups associated with official visits to IIT or guests visiting our campus. The guest house is comprised of a total of 42 single and double bedded air conditioned rooms with attached bathrooms and all modern amenities.'/>
          <HostelComponent2 hostel="Mahanadi Hall of Residence"
            hostelLabel='MHR'
            description='
            The Mahanadi Hall of Residence was inaugurated in the year 2016. This Hall of Residence is single student accommodation, having capacity of 780 students. This Hall of Residence is 26km away from Biju Patnaik International Airport, Bhubaneswar, and 28km away from Bhubaneswar Railway Station and 6km away from Khordha Railway Station.' />
          <HostelComponent1 hostel="Ganga Hall of Residence"
            hostelLabel='GHR'
            description='
            The Ganga is a trans-boundary river of Asia which flows through India and Bangladesh. The Ganga Hall of Residence was inaugurated in the year 2019. This Hall of Residence is single student accommodation, having capacity of 400 students. This Hall of Residence is 26km away from Biju Patnaik International Airport, Bhubaneswar, and 28km away from Bhubaneswar Railway Station and 6km away from Khordha Railway Station.' />
          <HostelComponent2 hostel="Brahmaputra Hall of Residence"
            hostelLabel='BHR'
            description='
            The Brahmaputra Hall of Residence was inaugurated in the year 2019. This Hall of Residence is single student accommodation, having capacity of 800 students. This Hall of Residence is 26km away from Biju Patnaik International Airport, Bhubaneswar, and 28km away from Bhubaneswar Railway Station and 6km away from Khordha Railway Station.' />
          <HostelComponent1 hostel="Subarnarekha Hall of Residence"
            hostelLabel='SHR'
            description='
            Named after the river Subarnarekha that flows through Jharkhand, West Bengal and Odisha, the Subarnarekha Hall of Residence was inaugurated in the year 2014. This Hall of Residence is single student accommodation, having capacity of 210 students. This Hall of Residence is 26km away from Biju Patnaik International Airport, Bhubaneswar, and 28km away from Bhubaneswar Railway Station and 6km away from Khordha Railway Station.' />
          <HostelComponent2 hostel="Rishikulya Hall of Residence"
            hostelLabel='RHR'
            description='
            The Rushikulya Hall of Residence was inaugurated in the year 2021. This Hall of Residence is single student accommodation, having capacity of 820 students. This Hall of Residence is 26km away from Biju Patnaik International Airport, Bhubaneswar, and 28km away from Bhubaneswar Railway Station and 6km away from Khordha Railway Station.' />
        </div>

      </div>

      </div>
      <Footer />
    </div>
  )
}
