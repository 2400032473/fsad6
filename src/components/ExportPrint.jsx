import { Printer, Download, Share2 } from 'lucide-react';
import { formatCurrency, formatDate, formatPercentage } from '../utils/helpers';
import '../styles/exportPrint.css';

function ExportPrint({ portfolioData, type = 'portfolio' }) {
  
  const handlePrint = () => {
    window.print();
  };

  const exportToPDF = () => {
    // Create a printable HTML page
    window.print();
    // Note: For actual PDF export, you'd integrate a library like jsPDF or html2pdf
  };

  const exportToCSV = () => {
    let csvContent = '';
    
    if (type === 'portfolio') {
      csvContent = [
        ['Fund Name', 'Category', 'Invested', 'Current Value', 'Gain/Loss', 'Returns %'],
        ...portfolioData.holdings.map(holding => [
          holding.fundName,
          holding.category,
          holding.invested,
          holding.currentValue,
          holding.gain,
          holding.returns
        ])
      ].map(row => row.join(',')).join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportToExcel = () => {
    // Similar to CSV but with .xlsx extension
    // For full Excel support, integrate SheetJS (xlsx library)
    exportToCSV();
  };

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Investment Portfolio Report',
          text: `Portfolio Summary:\nTotal Value: ${formatCurrency(portfolioData.totalValue)}\nTotal Gain: ${formatCurrency(portfolioData.totalGain)}`,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      alert('Share functionality not supported on this browser');
    }
  };

  return (
    <div className="export-print-container">
      <div className="export-actions">
        <button className="action-btn print" onClick={handlePrint} title="Print Report">
          <Printer size={18} />
          <span>Print</span>
        </button>
        
        <button className="action-btn download" onClick={exportToPDF} title="Download as PDF">
          <Download size={18} />
          <span>PDF</span>
        </button>
        
        <button className="action-btn download" onClick={exportToCSV} title="Export to CSV">
          <Download size={18} />
          <span>CSV</span>
        </button>
        
        <button className="action-btn download" onClick={exportToExcel} title="Export to Excel">
          <Download size={18} />
          <span>Excel</span>
        </button>
        
        <button className="action-btn share" onClick={shareReport} title="Share Report">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Printable Report Template (hidden on screen, visible when printing) */}
      <div className="printable-report">
        <div className="report-header">
          <h1>Investment Portfolio Report</h1>
          <p>Generated on: {formatDate(new Date())}</p>
        </div>

        <div className="report-summary">
          <h2>Portfolio Summary</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Total Invested:</strong></td>
                <td>{formatCurrency(portfolioData.totalInvested)}</td>
              </tr>
              <tr>
                <td><strong>Current Value:</strong></td>
                <td>{formatCurrency(portfolioData.totalValue)}</td>
              </tr>
              <tr>
                <td><strong>Total Gain/Loss:</strong></td>
                <td className={portfolioData.totalGain >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(portfolioData.totalGain)}
                </td>
              </tr>
              <tr>
                <td><strong>Returns:</strong></td>
                <td className={portfolioData.returns >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(portfolioData.returns)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="report-holdings">
          <h2>Holdings Details</h2>
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Fund Name</th>
                <th>Category</th>
                <th>Units</th>
                <th>Invested</th>
                <th>Current Value</th>
                <th>Gain/Loss</th>
                <th>Returns %</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.holdings?.map((holding, idx) => (
                <tr key={idx}>
                  <td>{holding.fundName}</td>
                  <td>{holding.category}</td>
                  <td>{holding.units}</td>
                  <td>{formatCurrency(holding.invested)}</td>
                  <td>{formatCurrency(holding.currentValue)}</td>
                  <td className={holding.gain >= 0 ? 'positive' : 'negative'}>
                    {formatCurrency(holding.gain)}
                  </td>
                  <td className={holding.returns >= 0 ? 'positive' : 'negative'}>
                    {formatPercentage(holding.returns)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-footer">
          <p>This is a computer-generated report.</p>
          <p>© 2026 Mutual Fund Platform</p>
        </div>
      </div>
    </div>
  );
}

export default ExportPrint;
