import React from 'react'

export default function SearchResultBox({ resultSearch }) {
    return (
      <div className='flex flex-col border bg-white'>
        {resultSearch && resultSearch.map((item, index) => (
          <div className='p-1' key={index}>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    );
  }
  