"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export function FixDevelopmentTokenScreen() {
  const route = useRouter()
  function handleSaveCookie() {
    document.cookie = `sb-zvilnkifiafoavkudrfk-auth-token=${input}`
    route.push('/')
  }
  const [input, setInput] = useState("")
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[50%]">
        <h1 className="text-2xl font-semibold text-center mb-4">Fix Development Cookie</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="cookie">
            Steps
          </label>
          <div className="mb-4">
          <p className="text-sm text-gray-700">
            Step 1: Login at <a href="https://charger.oohinfo.org/" className="text-blue-500" target="_blank" rel="noopener noreferrer">charger.oohinfo.org</a>
          </p>
          <p className="text-sm text-gray-700">
            Step 2: Press F12 and go to &ldquo;Application&ldquo;
          </p>
          <p className="text-sm text-gray-700">
            Step 3: Then go to Cookies and search for &ldquo;charger.oohinfo.org&ldquo;
          </p>
          <p className="text-sm text-gray-700">
            Step 4: Find the cookies with a similar name: &ldquo;sb-zvilnkifiafoavkudrfk-auth-token&ldquo; and copy the cookie value on the input below
          </p>

         
        </div>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            type="text"
            id="cookie"
            onChange={(e) => setInput(e.target.value)}
            name="cookie"
            placeholder="Enter your cookie"
          />
        </div>
        {input.trim().length >= 15
        ? (
          <button onClick={handleSaveCookie}  disabled={false} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Save Cookie
        </button>
        )
        : (
          <button  disabled={ true} className="w-full cursor-not-allowed bg-blue-200 text-white font-semibold py-2 rounded-lg  transition duration-300">
            Save Cookie
          </button>
        )}
         <small><bold>Note: This page works only at the dev enviroment</bold></small>
      </div>
    </div>
  );
};

export default FixDevelopmentTokenScreen;
