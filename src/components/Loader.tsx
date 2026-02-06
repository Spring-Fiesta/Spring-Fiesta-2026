'use client'

import HashLoader from 'react-spinners/HashLoader'

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="sweet-loading">
        <HashLoader
          color="#FF204E"
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  )
}

export default Loader
