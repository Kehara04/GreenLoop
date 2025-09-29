import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Sparkles, Phone, Info, Recycle } from 'lucide-react';

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Static events data with full details
  const events = [
    {
      id: 1,
      eventName: 'Community Beach Cleanup',
      eventDate: '2025-10-15',
      eventTime: '8:00 AM - 12:00 PM',
      eventVenue: 'Galle Face Beach, Colombo',
      description: 'Join us for a morning of environmental action at Galle Face Beach! This community-driven initiative aims to remove plastic waste, debris, and other pollutants from our beautiful coastline. Volunteers will work together to clean designated areas while learning about the impact of ocean pollution on marine life.',
      recycleHelp: 'This event directly contributes to recycling by collecting plastic bottles, containers, and other recyclable materials from the beach. All collected waste will be sorted on-site, with recyclables being sent to partner recycling centers. Participants will learn proper waste segregation techniques and understand how beach cleanup efforts prevent ocean pollution while recovering valuable recyclable materials.',
      contactNumber: '+94 77 123 4567'
    },
    {
      id: 2,
      eventName: 'E-Waste Collection Drive',
      eventDate: '2025-10-22',
      eventTime: '9:00 AM - 4:00 PM',
      eventVenue: 'Kurunegala Municipal Council, Kurunegala',
      description: 'Bring your old electronics, broken appliances, and outdated devices to our E-Waste Collection Drive. Our team of certified e-waste handlers will safely collect computers, mobile phones, televisions, printers, batteries, and other electronic equipment for proper recycling and disposal.',
      recycleHelp: 'Electronic waste contains valuable metals like gold, silver, copper, and rare earth elements that can be recovered and reused. This event ensures that hazardous materials in electronics (mercury, lead, cadmium) are safely extracted and disposed of, preventing soil and water contamination. Components that can be refurbished will be separated for reuse, while materials like plastics and metals will be sent to specialized recycling facilities.',
      contactNumber: '+94 37 222 3456'
    },
    {
      id: 3,
      eventName: 'Recycling Workshop for Schools',
      eventDate: '2025-10-28',
      eventTime: '2:00 PM - 5:00 PM',
      eventVenue: 'Green Community Center, Kandy',
      description: 'An educational workshop designed for students, teachers, and parents to learn about recycling practices. Through interactive activities, demonstrations, and hands-on projects, participants will discover creative ways to reduce waste and recycle materials at school and home.',
      recycleHelp: 'Education is the foundation of successful recycling programs. This workshop teaches the next generation about the 3Rs (Reduce, Reuse, Recycle) and shows them how to identify recyclable materials, create recycling systems in schools, and turn waste into useful products. Students will learn to make crafts from recycled materials, understand composting basics, and become ambassadors for environmental protection in their communities.',
      contactNumber: '+94 81 234 5678'
    },
    {
      id: 4,
      eventName: 'Plastic-Free Living Seminar',
      eventDate: '2025-11-05',
      eventTime: '10:00 AM - 1:00 PM',
      eventVenue: 'Colombo Convention Centre, Colombo',
      description: 'Discover practical strategies to reduce plastic consumption in your daily life. Expert speakers will share tips on sustainable shopping, alternatives to single-use plastics, and how to transition to a plastic-free lifestyle without compromising convenience.',
      recycleHelp: 'While this event focuses on plastic reduction, it directly supports recycling efforts by decreasing the volume of plastic entering the waste stream. Attendees will learn which plastics are recyclable versus non-recyclable, how to properly clean and prepare plastic items for recycling, and understand the limitations of plastic recycling. The seminar emphasizes that reduction is the first step, followed by reuse, and finally recycling as the last resort.',
      contactNumber: '+94 11 234 5678'
    },
    {
      id: 5,
      eventName: 'Tree Planting Campaign',
      eventDate: '2025-11-12',
      eventTime: '7:00 AM - 11:00 AM',
      eventVenue: 'Royal Botanical Gardens, Peradeniya',
      description: 'Be part of our mission to plant 1,000 trees in a single day! Volunteers will receive saplings, planting tools, and guidance from forestry experts. This campaign aims to restore green cover, improve air quality, and create habitats for local wildlife.',
      recycleHelp: 'Trees play a crucial role in the recycling ecosystem. They absorb carbon dioxide (a recycling process in nature), produce oxygen, and their fallen leaves create natural compost that enriches soil. This event uses recycled materials for tree guards and markers, demonstrating sustainable practices. Participants will also learn about recycling organic waste through composting, which provides nutrients for the newly planted trees, completing a natural recycling cycle.',
      contactNumber: '+94 81 388 8888'
    },
    {
      id: 6,
      eventName: 'Zero Waste Living Expo',
      eventDate: '2025-11-18',
      eventTime: '9:00 AM - 6:00 PM',
      eventVenue: 'BMICH, Colombo',
      description: 'Explore innovative solutions for zero-waste living at this comprehensive expo featuring sustainable product vendors, recycling demonstrations, upcycling workshops, and talks by environmental experts. Learn how individuals and businesses can minimize waste and maximize resource efficiency.',
      recycleHelp: 'This expo showcases the entire recycling ecosystem, from collection to processing to creating new products from recycled materials. Attendees will see live demonstrations of recycling processes, meet social enterprises that upcycle waste into marketable goods, and learn about industrial composting systems. The event features exhibits on textile recycling, glass recycling, paper recycling, and innovative technologies that convert waste to energy, providing a comprehensive understanding of how recycling industries operate and create circular economy opportunities.',
      contactNumber: '+94 11 250 1234'
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBack = () => {
    if (selectedEvent) {
      setSelectedEvent(null);
    } else {
      console.log('Navigate back to previous page');
    }
  };

  const handleSeeMore = (event) => {
    setSelectedEvent(event);
  };

  const img9 = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920';

  // Event Details View
  if (selectedEvent) {
    return (
      <div
        className="min-h-screen py-8 relative"
        style={{
          backgroundImage: `url(${img9})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={handleBack}
                className="mr-3 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Event Details</h1>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedEvent.eventName}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Date</div>
                    <div className="font-medium">{formatDate(selectedEvent.eventDate)}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Time</div>
                    <div className="font-medium">{selectedEvent.eventTime}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Venue</div>
                    <div className="font-medium">{selectedEvent.eventVenue}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Contact</div>
                    <a href={`tel:${selectedEvent.contactNumber}`} className="font-medium hover:text-green-600 transition-colors">
                      {selectedEvent.contactNumber}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-3">
                    <Info className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Event Description</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <Recycle className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">How This Event Helps Recycling</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.recycleHelp}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Ready to participate?</strong> Contact us at <a href={`tel:${selectedEvent.contactNumber}`} className="font-semibold hover:underline">{selectedEvent.contactNumber}</a> to register or get more information about this event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Events List View
  return (
    <div
      className="min-h-screen py-8 relative"
      style={{
        backgroundImage: `url(${img9})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="mr-3 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Upcoming Events</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden backdrop-blur-sm"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {event.eventName}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span>{event.eventTime}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{event.eventVenue}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeeMore(event)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;