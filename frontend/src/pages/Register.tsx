import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import  toast , { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Cookies from "js-cookie";


type Role = 'CONSUMER' | 'DRIVER';



const UserForm: React.FC = () => {
  const [role, setRole] = useState<Role>('CONSUMER');

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [cpassword, setCpassword] = useState('');
const [plateNumber, setPlateNumber] = useState('');
const [lorryType, setLorryType] = useState('');
const [capacity, setCapacity] = useState('');
const [color, setColor] = useState('');
// const [uidval,setUid] = useState('');
const [loading,setLoading] = useState<boolean>(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  if (password !== cpassword) {
    toast.error("Password does not match");
    setLoading(false);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // console.log("uid from Firebase response:", user.uid);

    // Prepare payload
    const payload =
      role === "CONSUMER"
        ? {
            uid: user.uid,
            name,
            email,
            phone,
            role,
          }
        : {
            uid: user.uid,
            name,
            email,
            phone,
            role,
            lorry: {
              plateNumber,
              type: lorryType,
              capacity: capacity, // optional: convert to number
              color: color || null,
            },
          };

    // 🔥 Send API request to your backend
   const response = await axios.post('http://localhost:3000/api/user/users', payload);

  const data = response.data;

  if (response.status === 201) {
    toast.success("User registered successfully!");
     localStorage.setItem("uid",user.uid) ;
     const token = await user.getIdToken();
    Cookies.set("token", token);

  } else {
    toast.error(data.message || "Registration failed");
  }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (

<>
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold">Register User</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="w-full p-2 border rounded"
      >
        <option value="CONSUMER">Consumer</option>
        <option value="DRIVER">Driver</option>
      </select>
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

     <input
        type="text"
        name="password"
        placeholder="Password"
        value={cpassword}
        onChange={(e)=>setCpassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {role === 'DRIVER' && (
        <div className="bg-gray-50 p-4 rounded border space-y-2">
          <h3 className="font-semibold text-gray-700">Lorry Details</h3>

          <input
            type="text"
            name="plateNumber"
            placeholder="Plate Number"
            value={plateNumber}
            onChange={(e)=>setPlateNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Lorry Type"
            value={lorryType}
        onChange={(e)=>setLorryType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity (in tons)"
            value={capacity}
            onChange={(e)=>setCapacity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="color"
            placeholder="Color (optional)"
            value={color}
             onChange={(e)=>setColor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
      {loading ?  " Loading...": "Submit "}
      </button>
    </form>
       <Toaster position="top-center" /></>
  );
};

export default UserForm;
