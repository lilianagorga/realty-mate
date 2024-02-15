import React, { useState } from 'react';

function MortgageCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = (p, r, y) => {
    const monthlyRate = r / 100 / 12;
    const n = y * 12;
    const payment = (p * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    return payment.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = calculateMortgage(principal, interestRate, years);
    setMonthlyPayment(payment);
  };

  return (
    <div>
      <h2>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Principal"
        />
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Interest Rate (%)"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="Years"
        />
        <button type="submit">Calculate</button>
      </form>
      {monthlyPayment && (
        <p>
          Monthly Payment: <strong>${monthlyPayment}</strong>
        </p>
      )}
    </div>
  );
}

export default MortgageCalculator;