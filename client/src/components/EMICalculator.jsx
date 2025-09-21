import React, { useState, useEffect } from 'react';

const EMICalculator = ({ isOpen, onClose, propertyPrice = 0 }) => {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEMI] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    if (propertyPrice) {
      setLoanAmount(propertyPrice * 0.8); // 80% of property price
    }
  }, [propertyPrice]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(tenure) * 12;

    if (principal && rate && time) {
      const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const total = emiAmount * time;
      const interest = total - principal;

      setEMI(Math.round(emiAmount));
      setTotalAmount(Math.round(total));
      setTotalInterest(Math.round(interest));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">EMI Calculator</h3>
            <p className="text-gray-600">Calculate your monthly EMI</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Property Price Display */}
          {propertyPrice > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700 mb-1">Property Price</p>
              <p className="text-2xl font-bold text-blue-900">₹{propertyPrice.toLocaleString()}</p>
            </div>
          )}

          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setLoanAmount(propertyPrice * 0.7)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                70%
              </button>
              <button
                onClick={() => setLoanAmount(propertyPrice * 0.8)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                80%
              </button>
              <button
                onClick={() => setLoanAmount(propertyPrice * 0.9)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                90%
              </button>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="20"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setInterestRate(7.5)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                7.5%
              </button>
              <button
                onClick={() => setInterestRate(8.5)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                8.5%
              </button>
              <button
                onClick={() => setInterestRate(9.5)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                9.5%
              </button>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setTenure(15)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                15 years
              </button>
              <button
                onClick={() => setTenure(20)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                20 years
              </button>
              <button
                onClick={() => setTenure(25)}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                25 years
              </button>
            </div>
          </div>

          {/* EMI Results */}
          <div className="bg-gradient-to-br from-primary-50 to-green-50 p-6 rounded-xl border border-primary-100">
            <h4 className="font-bold text-gray-900 mb-4 text-center">💰 Loan Summary</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">₹{emi.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Monthly EMI</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-lg font-semibold text-red-600">₹{totalInterest.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Interest Payable</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition"
              onClick={() => {
                const results = `Property Price: ₹${propertyPrice.toLocaleString()}\nLoan Amount: ₹${loanAmount}\nEMI: ₹${emi.toLocaleString()}/month\nTenure: ${tenure} years`;
                navigator.clipboard.writeText(results);
                alert('EMI details copied to clipboard!');
              }}
            >
              📋 Copy Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
