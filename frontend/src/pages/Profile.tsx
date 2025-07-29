import  { useEffect, useState } from 'react';
import { User, Menu, Truck } from 'lucide-react';
import Cookies from "js-cookie";
import axios from 'axios';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('home');
// console.log(Cookies.get("token"))
const uid = localStorage.getItem("uid");
const handeluserDetails = async()=>{

  const response = await axios.post("http://localhost:3000/api/user/userDetails", {
   uid
});

console.log(response.data);

}
useEffect(()=>{
  handeluserDetails();
},[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="w-8 h-8 text-gray-800" />
            <span className="text-xl font-bold text-gray-800">LORRY TAXI</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-gray-700 hover:text-gray-900 font-medium ${activeTab === 'home' ? 'text-gray-900' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`text-gray-700 hover:text-gray-900 font-medium ${activeTab === 'bookings' ? 'text-gray-900' : ''}`}
            >
              Bookings
            </button>
            <button 
              onClick={() => setActiveTab('help')}
              className={`text-gray-700 hover:text-gray-900 font-medium ${activeTab === 'help' ? 'text-gray-900' : ''}`}
            >
              Help
            </button>
          </nav>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-blue-500" />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">John Doe</h1>
              <p className="text-gray-600 text-lg mb-4">john.doe@example.com</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Full Name</label>
              <p className="text-gray-800 text-lg">John Doe</p>
            </div>
            
            <div>
              <label className="block text-gray-600 font-medium mb-2">Email</label>
              <p className="text-gray-800 text-lg">john.doe@example.com</p>
            </div>
            
            <div>
              <label className="block text-gray-600 font-medium mb-2">Phone</label>
              <p className="text-gray-800 text-lg">(123) 456-7890</p>
            </div>
            
            <div>
              <label className="block text-gray-600 font-medium mb-2">Address</label>
              <p className="text-gray-800 text-lg">123 Main St, Cityville, USA</p>
            </div>
          </div>
        </div>

        {/* My Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
          
          <div className="space-y-4">
            {/* Booking 1 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Pickup</h3>
                  <p className="text-gray-700 text-lg">456 Elm St</p>
                  <p className="text-gray-600 mt-2">April 20, 2024</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Dropoff</h3>
                  <p className="text-gray-700 text-lg">789 Oak St</p>
                </div>
              </div>
            </div>
            
            {/* Booking 2 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Pickup</h3>
                  <p className="text-gray-700 text-lg">101 Pine St</p>
                  <p className="text-gray-600 mt-2">April 15, 2024</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Dropoff</h3>
                  <p className="text-gray-700 text-lg">202 Maple St</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;