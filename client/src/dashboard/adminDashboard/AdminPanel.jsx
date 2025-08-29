import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [docTypeFilter, setDocTypeFilter] = useState('all')
  const [users, setUsers] = useState([
    { id: 'U-1001', name: 'Aditi Sharma', email: 'aditi@example.com', status: 'pending', createdAt: '2025-08-01', docType: 'citizenship' },
    { id: 'U-1002', name: 'Rahul Verma', email: 'rahul@example.com', status: 'approved', createdAt: '2025-07-29', docType: 'driving_license' },
    { id: 'U-1003', name: 'Neha Singh', email: 'neha@example.com', status: 'rejected', createdAt: '2025-07-25', docType: 'national_id' },
    { id: 'U-1004', name: 'Vikram Rao', email: 'vikram@example.com', status: 'pending', createdAt: '2025-08-02', docType: 'pan_card' },
    { id: 'U-1005', name: 'Ishita Kapoor', email: 'ishita@example.com', status: 'approved', createdAt: '2025-07-28', docType: 'citizenship' }
  ])

  const stats = useMemo(() => {
    const totals = users.reduce(
      (acc, user) => {
        acc.total += 1
        acc[user.status] += 1
        return acc
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    )
    return totals
  }, [users])

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return users.filter(user => {
      const matchesQuery = !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.id.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      const matchesDocType = docTypeFilter === 'all' || user.docType === docTypeFilter
      return matchesQuery && matchesStatus && matchesDocType
    })
  }, [users, searchQuery, statusFilter, docTypeFilter])

  function updateUserStatus(userId, nextStatus) {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u))
  }

  function renderStatusBadge(status) {
    const base = 'inline-block px-2 py-0.5 rounded-full text-xs font-semibold border'
    const byStatus =
      status === 'approved' ? 'bg-teal-50 text-emerald-700 border-teal-200' :
      status === 'pending' ? 'bg-yellow-100 text-amber-800 border-yellow-200' :
      'bg-red-100 text-red-800 border-red-300'
    return (
      <span className={`${base} ${byStatus}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const navigate = useNavigate()
  return (
    <div className='p-5 max-w-[1200px] mx-auto mt-24 font-sans'>
      <header className='flex items-baseline justify-between mb-5'>
        <div>
          <h1 className='m-0 text-2xl font-bold'>Admin Panel</h1>
          <p className='mt-1.5 text-gray-500'>Manage users and KYC statuses</p>
        </div>
        <div>
          <button
            type='button'
            onClick={() => window.location.reload()}
            className='bg-gray-900 text-white border border-gray-900 px-3 py-2 rounded-lg cursor-pointer font-semibold hover:bg-black'
          >
            Refresh
          </button>
        </div>
      </header>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5'>
        <StatCard label='Total Users' value={stats.total} variant='default' />
        <StatCard label='Pending' value={stats.pending} variant='pending' />
        <StatCard label='Approved' value={stats.approved} variant='approved' />
        <StatCard label='Rejected' value={stats.rejected} variant='rejected' />
      </section>

      <section className='bg-white border border-gray-200 rounded-xl p-4'>
        <div className='flex gap-3 flex-wrap items-center mb-3'>
          <input
            type='text'
            placeholder='Search by name, email or ID'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='flex-1 min-w-[240px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
          <select
            value={docTypeFilter}
            onChange={e => setDocTypeFilter(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='all'>All documents</option>
            <option value='citizenship'>Citizenship Certificate</option>
            <option value='driving_license'>Driving License</option>
            <option value='national_id'>National Identity Document</option>
            <option value='pan_card'>PAN Card</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='all'>All statuses</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-separate border-spacing-0'>
            <thead>
              <tr className='bg-gray-50'>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th align='right'>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className='border-t border-gray-200'>
                  <Td>{user.id}</Td>
                  <Td>
                    <button
                      type='button'
                      className='text-indigo-600 hover:underline'
                      onClick={() => navigate(`/admin/users/${user.id}`, { state: { user } })}
                    >
                      {user.name}
                    </button>
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{renderStatusBadge(user.status)}</Td>
                  <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                  <Td align='right'>
                    <div className='flex gap-2 justify-end'>
                      <Link
                        to={`/admin/users/${user.id}`}
                        state={{ user }}
                        className='px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600'
                      >
                        View
                      </Link>
                      <button
                        type='button'
                        onClick={() => updateUserStatus(user.id, 'approved')}
                        disabled={user.status === 'approved'}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-colors ${user.status === 'approved' ? 'cursor-not-allowed bg-emerald-100 text-emerald-700 border-emerald-300' : 'cursor-pointer bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'}`}
                      >
                        Approve
                      </button>
                      <button
                        type='button'
                        onClick={() => updateUserStatus(user.id, 'rejected')}
                        disabled={user.status === 'rejected'}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-colors ${user.status === 'rejected' ? 'cursor-not-allowed bg-red-100 text-red-700 border-red-300' : 'cursor-pointer bg-red-500 text-white border-red-500 hover:bg-red-600'}`}
                      >
                        Reject
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className='text-center p-6 text-gray-500'>
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value, variant = 'default' }) {
  const base = 'border rounded-xl p-4'
  const title = 'text-gray-500 text-xs font-semibold'
  const valueCls = 'text-2xl font-extrabold mt-1.5'
  const byVariant =
    variant === 'approved' ? 'bg-teal-50 border-teal-200 text-emerald-700' :
    variant === 'pending' ? 'bg-yellow-100 border-yellow-200 text-amber-800' :
    variant === 'rejected' ? 'bg-red-100 border-red-300 text-red-800' :
    'bg-gray-100 border-gray-200 text-gray-900'
  return (
    <div className={`${base} ${byVariant}`}>
      <div className={title}>{label}</div>
      <div className={valueCls}>{value}</div>
    </div>
  )
}

function Th({ children, align = 'left' }) {
  const alignCls = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
  return (
    <th className={`px-3 py-2 text-xs text-gray-700 tracking-wide border-b border-gray-200 ${alignCls}`}>
      {children}
    </th>
  )
}

function Td({ children, align = 'left' }) {
  const alignCls = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
  return (
    <td className={`px-3 py-3 text-sm text-gray-900 ${alignCls}`}>
      {children}
    </td>
  )
}

export default AdminPanel
