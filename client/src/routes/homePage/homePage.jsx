import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { RiDoubleQuotesL } from 'react-icons/ri';
import aboutImg from "../../assets/about.jpg";
import CountUp from 'react-countup';


//properties imports
import { Link } from 'react-router-dom';
import { VscSettings } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { PROPERTIES } from '../../components/properties/data';
import Item from '../../components/properties/Item';



// blog imports
import { BLOGS } from '../../components/properties/data';
import bannerImg from '../../assets/banner.png';


// Footer imports
import { FOOTER_LINKS, FOOTER_CONTACT_INFO, SOCIALS } from '../../components/properties/data';





function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  // about data
  const statistics = [
    { label: "Happy Clients", value: 12 },
    { label: "Different Cities", value: 3 },
    { label: "Projects Completed", value: 45 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  //blogs fucntionality
  const [expandedBlog, setExpandedBlog] = useState(null);

const handleToggle = (title) => {
    setExpandedBlog(expandedBlog === title ? null : title);
};


  return (
    <div>
      <section>
        <div className="homePage">
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Your Trusted Gateway to Exceptional Real Estate Opportunities!</h1>
              <p>
              Estate Hub connects you with top real estate opportunities, from homes to investment properties. With a focus on transparency, affordability, and personalized service, we help you find the perfect property to match your needs.
              </p>
              <SearchBar />
              <div className="boxes">
                <div className="box">
                  <h1>16+</h1>
                  <h2>Years of Experience</h2>
                </div>
                <div className="box">
                  <h1>200</h1>
                  <h2>Award Gained</h2>
                </div>
                <div className="box">
                  <h1>2000+</h1>
                  <h2>Property Ready</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="imgContainer">
            <img src="/bg.png" alt="" />
          </div>
        </div>
      </section>

      <section id='about' className='max-padd-container py-16 xl:py-28'>
        {/* Container */}
        <div className='flex flex-col xl:flex-row gap-10'>
          {/* Left Side */}
          <div className='flex-1 relative'>
            <img src={aboutImg} alt="About" className="rounded-3xl rounded-tr-[155px] w-[488px]" />
            <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col">
              <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
                <RiDoubleQuotesL className="text-2xl" />
              </span>
              <p className="text-center relative bottom-3">
              Need a new place to call home? Estate Hub offers a wide range of rental properties to suit your needs.
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className='flex-1 flex justify-center flex-col'>
            <span className="medium-18">Unveiling Our Journey</span>
            <h2 className="h2">Our Commitment Crafting Extraordinary Real Estate Experience</h2>
            <p className='py-5'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam sed minima vitae laboriosam doloremque et eligendi dolore est quis? Excepturi hic sapiente voluptatum voluptates aspernatur tempora voluptas quas repudiandae rerum. Saepe repellat molestiae nostrum praesentium hic, impedit quibusdam officia aspernatur sint doloremque mollitia commodi in repudiandae, quaerat quasi a obcaecati similique.
            </p>
            {/* Statistics Container */}
            <div className='flex flex-wrap gap-4'>
              {statistics.map((statistic, index) => (
                <div key={index} className='bg-primary p-4 rounded-lg'>
                  <div className="flex items-center gap-1">
                    <CountUp
                      start={isVisible ? 0 : null}
                      end={statistic.value}
                      duration={10}
                      delay={3}
                    >
                      {({ countUpRef }) => (
                        <h3 ref={countUpRef} className='text-2xl font-semibold'></h3>
                      )}
                    </CountUp>
                    <h4 className="font-bold text-2xl">k+</h4>
                  </div>
                  <p>{statistic.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* properties */}
      
      <section className="px-0 md:px-0 lg:px-0 py-0 bg-white">
  <div className="py-16 xl:py-28">
    <span className="text-xl font-medium text-gray-700">Your Future Home Awaits!</span>
    <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-6">Find Your Dream Here</h2>
    <div className="flex justify-between items-center mb-6">
      <h5 className="text-gray-600"><span>Showing 1-9</span> out of 3k properties</h5>
      <Link to={'/'}><VscSettings className="text-gray-700 text-xl" /></Link>
    </div>
    {/* Swiper container */}
    <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        600: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1124: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1300: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay]}
      className="h-[488px] md:h-[533px] mt-5"
    >
      {PROPERTIES.map((property) => (
        <SwiperSlide key={property.title}>
          <Item property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>


    {/* Blog */}
    <section className="max-padd-container py-16 xl:py-28">
            <h2 className='text-4xl font-bold text-center mb-12'>Our Expert Blogs</h2>
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {BLOGS.map((blog) => (
                    <div key={blog.title} className='relative bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden'>
                        <img src={blog.image} alt={blog.title} className='w-full h-64 object-cover'/>
                        <div className='absolute top-0 left-0 h-full w-full bg-black/50 flex flex-col justify-end p-4'>
                            <h3 className='text-white text-xl font-bold'>{blog.title}</h3>
                            <p className='text-gray-200'>{blog.category}</p>
                            <button
                                className='bg-white px-4 py-2 rounded-lg mt-2 hover:bg-gray-200'
                                onClick={() => handleToggle(blog.title)}
                            >
                                {expandedBlog === blog.title ? 'Show Less' : 'Continue Reading'}
                            </button>
                            {expandedBlog === blog.title && (
                                <div className='mt-4 text-white'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
        </section>
        <div className='max-padd-container py16 overflow-x-hidden'>
                <img src={bannerImg} alt="" />
        </div>

        {/* Footer */}
        
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explore real estate opportunities with us?
        </h2>
        <p className="text-gray-600 mb-8">
        Discover your dream home in India.
        </p>
        <hr className="border-gray-300 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900">Estate<span className="font-semibold">Hub</span></span>
            </Link>
            <p className="text-gray-600 mb-4">
            Trust EstateHub to guide you through your real estate journey.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-r-full hover:bg-primary-dark transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
          
          {FOOTER_LINKS.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{FOOTER_CONTACT_INFO.title}</h3>
            {FOOTER_CONTACT_INFO.links.map((link, index) => (
              <p key={index} className="text-gray-600 mb-2">
                <span className="font-semibold">{link.label}:</span> {link.value}
              </p>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">&copy; 2024 EstateHub. All rights reserved.</p>
            <div className="flex space-x-4">
              {SOCIALS.links.map((link, index) => (
                <Link key={index} to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>

    </div>
  );
}

export default HomePage;
