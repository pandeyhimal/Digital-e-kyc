import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function useUserFromRoute() {
  const { userId } = useParams()
  const location = useLocation()
  const passedUser = location.state && location.state.user
  return { userId, user: passedUser }
}

function UserDetails() {
  const navigate = useNavigate()
  const { userId, user } = useUserFromRoute()

  // In real app, fetch by userId if user not passed via state
  // For now, show what we have

  return (
    <div className='p-5 max-w-3xl mx-auto mt-24 font-sans'>
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h1 className='m-0 text-2xl font-bold'>User Details</h1>
          <p className='mt-1.5 text-gray-500'>Detailed information for {user?.name || userId}</p>
        </div>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50'
        >
          Back
        </button>
      </div>

      <h2 className='mt-2 mb-3 text-xl font-semibold'>Documents</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {buildDocuments(user?.name || userId).map(doc => (
          <button
            key={doc.key}
            type='button'
            className='text-left border border-gray-200 rounded-xl bg-white p-4 hover:bg-gray-50'
          >
            <div className='text-sm font-semibold text-gray-900'>{doc.title}</div>
            <div className='text-xs text-gray-500 mt-0.5'>{doc.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function buildDocuments(displayName) {
  const base = [
    { key: 'citizenship', name: 'Citizenship Certificate' },
    { key: 'driving_license', name: 'Driving License' },
    { key: 'pan_card', name: 'PAN Card' },
    { key: 'certificate', name: 'Certificate' }
  ]
  return base.map(item => ({
    key: item.key,
    title: `${displayName} - ${item.name}`,
    subtitle: `${item.name} for ${displayName}`
  }))
}

function Detail({ label, value }) {
  return (
    <div className='p-4'>
      <div className='text-xs font-semibold text-gray-500'>{label}</div>
      <div className='mt-1.5 text-gray-900'>{value}</div>
    </div>
  )
}

export default UserDetails


