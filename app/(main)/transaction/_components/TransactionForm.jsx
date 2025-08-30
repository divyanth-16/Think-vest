import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, FileText, Repeat, CreditCard, TrendingUp, TrendingDown, User, Building, CheckCircle } from 'lucide-react'; // Added CheckCircle for success indicator

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    amount: '',
    description: '',
    accountId: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    recurringInterval: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message

  // Mock data - replace with your actual data
  const accounts = [
    { id: '1', name: 'Checking Account', balance: 2500.00, isDefault: true },
    { id: '2', name: 'Savings Account', balance: 15000.00 },
    { id: '3', name: 'Credit Card', balance: -850.00 }
  ];

  const categories = [
    { id: '1', name: 'Food & Dining', type: 'EXPENSE' },
    { id: '2', name: 'Transportation', type: 'EXPENSE' },
    { id: '3', name: 'Shopping', type: 'EXPENSE' },
    { id: '4', name: 'Salary', type: 'INCOME' },
    { id: '5', name: 'Freelance', type: 'INCOME' },
    { id: '6', name: 'Investment', type: 'INCOME' }
  ];

  useEffect(() => {
    // Pre-select default account if available and no account is already selected
    if (!formData.accountId && accounts.length > 0) {
      const defaultAccount = accounts.find(acc => acc.isDefault);
      if (defaultAccount) {
        setFormData(prev => ({ ...prev, accountId: defaultAccount.id }));
      } else {
        // Fallback to the first account if no default
        setFormData(prev => ({ ...prev, accountId: accounts[0].id }));
      }
    }
  }, [accounts, formData.accountId]); // Depend on accounts and formData.accountId

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than zero.';
    }
    if (!formData.accountId) {
      newErrors.accountId = 'Please select an account.';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }
    if (formData.isRecurring && !formData.recurringInterval) {
      newErrors.recurringInterval = 'Please select a recurring frequency.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessMessage(true); // Show success message
      // Optionally reset form after success
      setFormData({
        type: 'EXPENSE',
        amount: '',
        description: '',
        accountId: accounts.find(acc => acc.isDefault)?.id || (accounts.length > 0 ? accounts[0].id : ''), // Reset to default/first account
        category: '',
        date: new Date().toISOString().split('T')[0],
        isRecurring: false,
        recurringInterval: ''
      });
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
    }, 1500); // Reduced simulation time for better UX
  };

  const handleCancel = () => {
    // Reset form to initial state or navigate away
    setFormData({
      type: 'EXPENSE',
      amount: '',
      description: '',
      accountId: accounts.find(acc => acc.isDefault)?.id || (accounts.length > 0 ? accounts[0].id : ''),
      category: '',
      date: new Date().toISOString().split('T')[0],
      isRecurring: false,
      recurringInterval: ''
    });
    setErrors({});
    setShowSuccessMessage(false);
    // In a real app, you might use router.push('/') here
  };

  const filteredCategories = categories.filter(
    category => category.type === formData.type
  );

  const formatBalance = (balance) => {
    const formatted = Math.abs(balance).toFixed(2);
    return balance < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    
  <div className="w-full px-4 sm:px-10">


      <div className="max-w-2xl w-full mx-auto">
        

        <div className="bg-gray-850 rounded-3xl p-8 sm:p-10 shadow-3xl border border-gray-700 relative overflow-hidden">
          {showSuccessMessage && (
            <div className="absolute inset-0 bg-green-700 bg-opacity-90 flex items-center justify-center z-10 transition-all duration-500 ease-in-out transform scale-100 opacity-100">
              <div className="text-center text-white flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-green-300 animate-bounce-in" />
                <p className="mt-4 text-2xl font-bold">Transaction Recorded!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased spacing */}
            {/* Transaction Type */}
            <div className="space-y-4"> {/* Increased spacing */}
              <label className="block text-base font-semibold text-gray-300 mb-3">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-4"> {/* Increased gap */}
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'EXPENSE')}
                  className={`relative flex items-center justify-center py-4 px-3 border-2 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group ${
                    formData.type === 'EXPENSE'
                      ? 'border-red-600 bg-red-600/20 text-red-400 shadow-lg'
                      : 'border-gray-700 bg-gray-700 text-gray-300 hover:border-red-500 hover:bg-red-500/10'
                  }`}
                >
                  <TrendingDown className="w-6 h-6 mr-3 transition-colors duration-300 group-hover:text-red-400" />
                  <span className="font-semibold text-lg">Expense</span>
                  {formData.type === 'EXPENSE' && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse-fade"></div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'INCOME')}
                  className={`relative flex items-center justify-center py-4 px-3 border-2 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group ${
                    formData.type === 'INCOME'
                      ? 'border-green-600 bg-green-600/20 text-green-400 shadow-lg'
                      : 'border-gray-700 bg-gray-700 text-gray-300 hover:border-green-500 hover:bg-green-500/10'
                  }`}
                >
                  <TrendingUp className="w-6 h-6 mr-3 transition-colors duration-300 group-hover:text-green-400" />
                  <span className="font-semibold text-lg">Income</span>
                  {formData.type === 'INCOME' && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse-fade"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Amount and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7"> {/* Increased gap */}
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 bg-gray-700 border ${
                      errors.amount ? 'border-red-500' : 'border-gray-600'
                    } text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium placeholder-gray-400 shadow-sm`}
                    autoFocus
                  />
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-400 flex items-center mt-1 animate-fade-in-down">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                    {errors.amount}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-semibold text-gray-300">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Account Selection */}
            <div className="space-y-2">
              <label htmlFor="account" className="block text-sm font-semibold text-gray-300">
                Account
              </label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="account"
                  value={formData.accountId}
                  onChange={(e) => handleInputChange('accountId', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-gray-700 border ${
                    errors.accountId ? 'border-red-500' : 'border-gray-600'
                  } text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none shadow-sm`}
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({formatBalance(account.balance)})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.061 6.89l-1.414 1.414L9.293 12.95z" />
                  </svg>
                </div>
              </div>
              {errors.accountId && (
                <p className="text-sm text-red-400 flex items-center mt-1 animate-fade-in-down">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  {errors.accountId}
                </p>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-300">
                Category
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-gray-700 border ${
                    errors.category ? 'border-red-500' : 'border-gray-600'
                  } text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none shadow-sm`}
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.061 6.89l-1.414 1.414L9.293 12.95z" />
                  </svg>
                </div>
              </div>
              {errors.category && (
                <p className="text-sm text-red-400 flex items-center mt-1 animate-fade-in-down">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                  {errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-300">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="description"
                  placeholder="Add a note about this transaction..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder-gray-400 shadow-sm"
                />
              </div>
            </div>

            {/* Recurring Transaction Toggle */}
            <div className="bg-gray-750 rounded-2xl p-5 border border-gray-700"> {/* Adjusted background and padding */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4"> {/* Increased spacing */}
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl flex-shrink-0"> {/* Larger icon container */}
                    <Repeat className="w-6 h-6 text-blue-400" /> {/* Larger icon */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Recurring Transaction</h4> {/* Larger text */}
                    <p className="text-sm text-gray-400">Set up automatic recurring payments</p>
                  </div>
                </div>
                <label htmlFor="isRecurringToggle" className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="isRecurringToggle"
                    type="checkbox"
                    checked={formData.isRecurring}
                    onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div> {/* Slightly larger toggle */}
                </label>
              </div>

              {/* Recurring Interval */}
              {formData.isRecurring && (
                <div className="mt-5 space-y-2 animate-fade-in-down"> {/* Added animation */}
                  <label htmlFor="recurringInterval" className="block text-sm font-semibold text-gray-300">
                    Frequency
                  </label>
                  <select
                    id="recurringInterval"
                    value={formData.recurringInterval}
                    onChange={(e) => handleInputChange('recurringInterval', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border ${
                      errors.recurringInterval ? 'border-red-500' : 'border-gray-600'
                    } text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm`}
                  >
                    <option value="">Select frequency</option>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                  {errors.recurringInterval && (
                    <p className="text-sm text-red-400 flex items-center mt-1 animate-fade-in-down">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                      {errors.recurringInterval}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8"> {/* Increased gap and padding */}
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-600 text-gray-300 bg-gray-700 rounded-xl font-semibold hover:bg-gray-600 hover:border-gray-500 transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none text-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg ${
                  isLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div> {/* Larger spinner */}
                    Saving...
                  </div>
                ) : (
                  'Save Transaction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tailwind CSS Customizations (Add this to your CSS file or directly in a <style> tag for testing) */}
      <style>{`
        .bg-gray-850 {
          background-color: #1a202c; /* Slightly darker than 800 */
        }
        .shadow-3xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15);
        }

        /* Keyframe for fade-in-down animation */
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }

        /* Keyframe for pulse-fade animation */
        @keyframes pulse-fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-fade {
          animation: pulse-fade 1.5s infinite;
        }

        /* Keyframe for bounce-in animation */
        @keyframes bounce-in {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>
    </div>
  );
}