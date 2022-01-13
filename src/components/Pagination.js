import React from 'react'

const Pagination = ({ productItemsPerPage, totalProductItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProductItems / productItemsPerPage); i++) {
    pageNumbers.push(i)
  }
  
  return (
    <nav style={{ display: 'flex', flexDirection: '', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <ul className="pagination">
        <button>Previous</button>
        {
          pageNumbers.map(number => (
            <>
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)} href="#!" className="page-link">
                  {number}
                </a>
              </li>
            </>
          ))
        }
        <button>Next</button>
      </ul>
    </nav>
  )
}

export default Pagination