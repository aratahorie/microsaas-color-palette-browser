"use client";

import React, { useState } from 'react';
import siteConfig from '../siteConfig';

const CoreToolUI = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/core', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-md text-white">
      <h1 className="text-xl font-bold mb-4">{siteConfig.core.toolName}</h1>
      <p className="mb-4">{siteConfig.core.description}</p>
      <div className="mb-4">
        <label className="block mb-2">{siteConfig.core.inputLabel}</label>
        <textarea
          className="w-full p-2 bg-transparent border border-white/10 rounded-md"
          placeholder={siteConfig.core.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{siteConfig.core.outputLabel}</h2>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
};

export default CoreToolUI;