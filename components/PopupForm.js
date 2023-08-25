import React, { useState } from 'react';

const PopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [err , setErr] = useState(false);
  const [text , setText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if((title && description) === ''){
        return setErr(true)
    }
    const wordText = description.trim().length;
    if (wordText < 100) {
      return setText(true);
    } else {
      setText(false);
    }
    onSubmit({ title, description });
    setErr(false)
    setTitle('');
    setDescription('')
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center w-screen items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
        {err? 
        <p className='text-red-600'>Please filled all Fields </p>
        
        :''}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {text?
          <p className='text-red-500'> Must contain 100 words</p>
          :''}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
