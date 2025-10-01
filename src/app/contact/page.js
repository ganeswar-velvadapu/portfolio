"use client"
import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionStatus('submitting')
    const CONTACT_FORM_DEPLOYMENT_LINK = process.env.NEXT_PUBLIC_CONTACT_FORM_DEPLOYMENT_LINK

    try {
      const response = await fetch(CONTACT_FORM_DEPLOYMENT_LINK, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.status === 'success') {
        setShowSuccessModal(true)
        setSubmissionStatus('success')
        setFormData({
          name: '',
          email: '',
          description: ''
        })
      } else {
        throw new Error(result.message || 'Unknown error')
      }
    } catch (err) {
      console.error(err)
      setSubmissionStatus('error')
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setSubmissionStatus(null)
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Us</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter your name"
              required
              disabled={submissionStatus === 'submitting'}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={submissionStatus === 'submitting'}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-zinc-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              placeholder="Enter your message"
              required
              disabled={submissionStatus === 'submitting'}
            />
          </div>

          {submissionStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
              Failed to submit. Please try again.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={submissionStatus === 'submitting'}
            className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-lg shadow-xl p-8 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
              <p className="text-zinc-300 mb-6">Your message has been submitted successfully.</p>
              <button
                onClick={handleSuccessModalClose}
                className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactForm