import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar, Filter, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import '../styles/transactionHistory.css';

function TransactionHistory({ transactions = [] }) {
  const [filter, setFilter] = useState('all'); // all, buy, sell
  const [sortBy, setSortBy] = useState('date'); // date, amount

  const filteredTransactions = transactions
    .filter(txn => filter === 'all' || txn.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.amount - a.amount;
      }
    });

  const stats = {
    totalBuy: transactions
      .filter(t => t.type === 'buy')
      .reduce((sum, t) => sum + t.amount, 0),
    totalSell: transactions
      .filter(t => t.type === 'sell')
      .reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length,
    netAmount: transactions.reduce((sum, t) => 
      sum + (t.type === 'buy' ? t.amount : -t.amount), 0
    )
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Fund', 'Type', 'Units', 'NAV', 'Amount', 'Status'],
      ...filteredTransactions.map(txn => [
        formatDate(txn.date),
        txn.fundName,
        txn.type.toUpperCase(),
        txn.units,
        txn.nav,
        txn.amount,
        txn.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        <button className="export-btn" onClick={exportTransactions}>
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Summary Stats */}
      <div className="transaction-stats">
        <div className="stat-card buy">
          <ArrowUpRight size={20} />
          <div>
            <span className="stat-label">Total Purchases</span>
            <span className="stat-value">{formatCurrency(stats.totalBuy)}</span>
          </div>
        </div>
        <div className="stat-card sell">
          <ArrowDownLeft size={20} />
          <div>
            <span className="stat-label">Total Redemptions</span>
            <span className="stat-value">{formatCurrency(stats.totalSell)}</span>
          </div>
        </div>
        <div className="stat-card total">
          <Calendar size={20} />
          <div>
            <span className="stat-label">Total Transactions</span>
            <span className="stat-value">{stats.totalTransactions}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="transaction-filters">
        <div className="filter-group">
          <label>Filter by Type:</label>
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'buy' ? 'active' : ''}
              onClick={() => setFilter('buy')}
            >
              Purchases
            </button>
            <button
              className={filter === 'sell' ? 'active' : ''}
              onClick={() => setFilter('sell')}
            >
              Redemptions
            </button>
          </div>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date (Newest First)</option>
            <option value="amount">Amount (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((txn) => (
            <div key={txn.id} className={`transaction-item ${txn.type}`}>
              <div className="transaction-icon">
                {txn.type === 'buy' ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownLeft size={20} />
                )}
              </div>
              <div className="transaction-details">
                <div className="transaction-main">
                  <h4>{txn.fundName}</h4>
                  <span className={`transaction-type ${txn.type}`}>
                    {txn.type === 'buy' ? 'Purchase' : 'Redemption'}
                  </span>
                </div>
                <div className="transaction-meta">
                  <span className="transaction-date">{formatDate(txn.date)}</span>
                  <span className="transaction-units">{txn.units} units @ ₹{txn.nav}</span>
                  <span className={`transaction-status ${txn.status}`}>{txn.status}</span>
                </div>
              </div>
              <div className="transaction-amount">
                <span className={txn.type === 'buy' ? 'negative' : 'positive'}>
                  {txn.type === 'buy' ? '-' : '+'}{formatCurrency(txn.amount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
