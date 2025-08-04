import type React from "react"
import Navbar from "../compounts/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";
type dashbordprop = {

}
const Dashbord : React.FC<dashbordprop> =()=>{
  const [pickup,setPicku] = useState("");
  const [drop ,setDrop] = useState("");
  const [weight,setWeight] = useState('');
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const handelsubmit = ()=>{
if(isLoggedIn) {
  console.log({
    drop: drop,
    pickup:pickup,
    weight : weight,
    uid : localStorage.getItem("uid")
  });
  
  alert("scucessfully send") 
  
}else{
    alert("login to continue")}

  }

// const isDriver : boolean = true; 
    return(
        <>

       <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Navbar */}
     <Navbar />

      {/* Booking Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-8">Book a Lorry</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Pickup Location</label>
              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full border p-3 rounded"
                onChange={(e)=>setPicku(e.target.value)}
                value={pickup}
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Dropoff Location</label>
              <input
                type="text"
                placeholder="Dropoff Location"
                className="w-full border p-3 rounded"
                value={drop}
                onChange={(e)=>setDrop(e.target.value)}

              />
            </div>
            <div>
              <label className="block text-lg font-medium">Vehicle Type</label>
              <input
                type="text"
                placeholder="Select vehicle"
                className="w-full border p-3 rounded"
                onChange={(e)=>setWeight(e.target.value)}
                value={weight}
              />
            </div>

            <button className="bg-blue-600 text-white w-full py-3 rounded mt-4" onClick={handelsubmit}>Search</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="f72265032.png" alt="Lorry" className="max-w-[400px] w-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 mt-16">
        <FeatureCard
          icon="⏱️"
          title="Instant Booking"
          description="Easily book a lorry in minutes with our seamless online platform."
        />
        <FeatureCard
          icon="🚛"
          title="Various Vehicles"
          description="Choose from a wide range of lorries to suit your transport needs."
        />
        <FeatureCard
          icon="💲"
          title="Affordable Rates"
          description="Get the best prices for your lorry rentals without any hidden charges."
        />
      </section>
    </div>
    </>
    ) 
}

export default Dashbord;

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">
      <div className="flex items-center space-x-3 mb-3">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

