import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import '../styles/calculators.css';

function FinancialCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('sip'); // sip, lumpsum, returns
  
  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // Lumpsum Calculator State
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumReturn, setLumpsumReturn] = useState(12);
  const [lumpsumYears, setLumpsumYears] = useState(10);

  // Returns Calculator State
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [finalValue, setFinalValue] = useState(75000);
  const [investmentYears, setInvestmentYears] = useState(3);

  // SIP Calculation
  const calculateSIP = () => {
    const monthlyRate = sipReturn / 12 / 100;
    const months = sipYears * 12;
    
    const futureValue = sipAmount * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const invested = sipAmount * months;
    const returns = futureValue - invested;

    return {
      invested,
      returns,
      total: futureValue
    };
  };

  // Lumpsum Calculation
  const calculateLumpsum = () => {
    const futureValue = lumpsumAmount * Math.pow(1 + lumpsumReturn / 100, lumpsumYears);
    const returns = futureValue - lumpsumAmount;

    return {
      invested: lumpsumAmount,
      returns,
      total: futureValue
    };
  };

  // Returns Calculation
  const calculateReturns = () => {
    const totalReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const cagr = (Math.pow(finalValue / initialInvestment, 1 / investmentYears) - 1) * 100;
    const absoluteReturn = finalValue - initialInvestment;

    return {
      totalReturn,
      cagr,
      absoluteReturn
    };
  };

  const sipResults = calculateSIP();
  const lumpsumResults = calculateLumpsum();
  const returnsResults = calculateReturns();

  return (
    <div className="calculators-container">
      <div className="calculator-header">
        <h2>Financial Calculators</h2>
        <p>Plan your investments with our easy-to-use calculators</p>
      </div>

      {/* Calculator Type Selector */}
      <div className="calculator-tabs">
        <button
          className={activeCalculator === 'sip' ? 'active' : ''}
          onClick={() => setActiveCalculator('sip')}
        >
          <Calendar size={18} />
          SIP Calculator
        </button>
        <button
          className={activeCalculator === 'lumpsum' ? 'active' : ''}
          onClick={() => setActiveCalculator('lumpsum')}
        >
          <DollarSign size={18} />
          Lumpsum Calculator
        </button>
        <button
          className={activeCalculator === 'returns' ? 'active' : ''}
          onClick={() => setActiveCalculator('returns')}
        >
          <TrendingUp size={18} />
          Returns Calculator
        </button>
      </div>

      <div className="calculator-content">
        {/* SIP Calculator */}
        {activeCalculator === 'sip' && (
          <div className="calculator-panel">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>
                  <span>Monthly Investment</span>
                  <span className="input-value">{formatCurrency(sipAmount)}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Expected Return (% p.a.)</span>
                  <span className="input-value">{sipReturn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={sipReturn}
                  onChange={(e) => setSipReturn(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Time Period (Years)</span>
                  <span className="input-value">{sipYears} years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>1 year</span>
                  <span>40 years</span>
                </div>
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-card invested">
                <span className="result-label">Total Invested</span>
                <span className="result-value">{formatCurrency(sipResults.invested)}</span>
              </div>
              <div className="result-card returns">
                <span className="result-label">Est. Returns</span>
                <span className="result-value">{formatCurrency(sipResults.returns)}</span>
              </div>
              <div className="result-card total">
                <span className="result-label">Total Value</span>
                <span className="result-value">{formatCurrency(sipResults.total)}</span>
              </div>
            </div>

            <div className="result-chart">
              <div className="chart-bar">
                <div
                  className="bar-invested"
                  style={{ width: `${(sipResults.invested / sipResults.total) * 100}%` }}
                >
                  <span>{Math.round((sipResults.invested / sipResults.total) * 100)}%</span>
                </div>
                <div
                  className="bar-returns"
                  style={{ width: `${(sipResults.returns / sipResults.total) * 100}%` }}
                >
                  <span>{Math.round((sipResults.returns / sipResults.total) * 100)}%</span>
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color invested"></span>
                  <span>Invested Amount</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color returns"></span>
                  <span>Expected Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lumpsum Calculator */}
        {activeCalculator === 'lumpsum' && (
          <div className="calculator-panel">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>
                  <span>Investment Amount</span>
                  <span className="input-value">{formatCurrency(lumpsumAmount)}</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={lumpsumAmount}
                  onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>₹10,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Expected Return (% p.a.)</span>
                  <span className="input-value">{lumpsumReturn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={lumpsumReturn}
                  onChange={(e) => setLumpsumReturn(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Time Period (Years)</span>
                  <span className="input-value">{lumpsumYears} years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={lumpsumYears}
                  onChange={(e) => setLumpsumYears(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>1 year</span>
                  <span>40 years</span>
                </div>
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-card invested">
                <span className="result-label">Invested Amount</span>
                <span className="result-value">{formatCurrency(lumpsumResults.invested)}</span>
              </div>
              <div className="result-card returns">
                <span className="result-label">Est. Returns</span>
                <span className="result-value">{formatCurrency(lumpsumResults.returns)}</span>
              </div>
              <div className="result-card total">
                <span className="result-label">Total Value</span>
                <span className="result-value">{formatCurrency(lumpsumResults.total)}</span>
              </div>
            </div>

            <div className="result-chart">
              <div className="chart-bar">
                <div
                  className="bar-invested"
                  style={{ width: `${(lumpsumResults.invested / lumpsumResults.total) * 100}%` }}
                >
                  <span>{Math.round((lumpsumResults.invested / lumpsumResults.total) * 100)}%</span>
                </div>
                <div
                  className="bar-returns"
                  style={{ width: `${(lumpsumResults.returns / lumpsumResults.total) * 100}%` }}
                >
                  <span>{Math.round((lumpsumResults.returns / lumpsumResults.total) * 100)}%</span>
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color invested"></span>
                  <span>Invested Amount</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color returns"></span>
                  <span>Expected Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns Calculator */}
        {activeCalculator === 'returns' && (
          <div className="calculator-panel">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>
                  <span>Initial Investment</span>
                  <span className="input-value">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>₹1,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Current Value</span>
                  <span className="input-value">{formatCurrency(finalValue)}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>₹1,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>

              <div className="input-group">
                <label>
                  <span>Investment Duration (Years)</span>
                  <span className="input-value">{investmentYears} years</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="40"
                  step="0.5"
                  value={investmentYears}
                  onChange={(e) => setInvestmentYears(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>0.5 year</span>
                  <span>40 years</span>
                </div>
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-card returns">
                <span className="result-label">Absolute Returns</span>
                <span className="result-value">{formatCurrency(returnsResults.absoluteReturn)}</span>
              </div>
              <div className="result-card total">
                <span className="result-label">Total Returns %</span>
                <span className="result-value">{returnsResults.totalReturn.toFixed(2)}%</span>
              </div>
              <div className="result-card cagr">
                <span className="result-label">CAGR</span>
                <span className="result-value">{returnsResults.cagr.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinancialCalculators;
