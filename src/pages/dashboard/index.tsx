import { Plus, ClipboardList, Calendar, Wrench } from 'lucide-react';
import Navigation from '../components/Navigation';

const Dashboard = ({ setCurrentPage }: any) => {
  const availableServices = [
    {
      title: "Painting",
      description: "Building shelves repairing furniture and custom woodwork."
    },
    {
      title: "Painting",
      description: "Repairing wiring installing new outlets and fixing lighting issues."
    }
  ];

  const upcomingAppointments = [
    {
      service: "Plumbing",
      datetime: "Sep 26, 2025 11:33 AM"
    },
    {
      service: "Carpentry",
      datetime: "Feb 3, 2025 1:39 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wrench className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Handyman Services Dashboard</h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Your one-stop solution for all repair and maintenance needs
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
          <button 
            onClick={() => setCurrentPage('new-repair')}
            className="flex items-center justify-center gap-2 bg-black text-white px-4 md:px-6 py-3 rounded-lg font-medium w-full md:w-64"
          >
            <Plus className="w-5 h-5" />
            Request New Repair
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-black px-4 md:px-6 py-3 rounded-lg font-medium border w-full md:w-64">
            <ClipboardList className="w-5 h-5" />
            View My Repairs
          </button>
        </div>

        {/* Available Services Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-xl md:text-2xl font-bold">Available Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {availableServices.map((service, index) => (
              <div key={index} className="p-4 md:p-6 rounded-lg border hover:border-gray-300 transition-colors">
                <h3 className="text-lg md:text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-xl md:text-2xl font-bold">Upcoming Appointments</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 rounded-lg border hover:border-gray-300 transition-colors"
              >
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{appointment.service}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                    <Calendar className="w-4 h-4" />
                    {appointment.datetime}
                  </div>
                </div>
                <button className="w-full md:w-auto text-black px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors text-sm md:text-base">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard