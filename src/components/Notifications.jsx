import { useState, useEffect } from 'react';
import { Bell, X, TrendingUp, TrendingDown, AlertCircle, Info, CheckCircle } from 'lucide-react';
import '../styles/notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Investment Successful',
      message: 'Your investment of ₹10,000 in HDFC Equity Fund is confirmed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'gain',
      title: 'Portfolio Gain Alert',
      message: 'Your portfolio has gained 5.2% in the last 7 days',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'loss',
      title: 'Market Alert',
      message: 'ICICI Tech Fund NAV dropped by 2.1% today',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'SIP Due',
      message: 'Your monthly SIP of ₹5,000 is due on 28th Feb',
      time: '2 days ago',
      read: false
    },
    {
      id: 5,
      type: 'warning',
      title: 'KYC Verification Required',
      message: 'Please complete your KYC verification to continue investing',
      time: '3 days ago',
      read: true
    }
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'gain':
        return <TrendingUp size={20} />;
      case 'loss':
        return <TrendingDown size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  return (
    <div className="notifications-wrapper">
      <button
        className="notification-bell"
        onClick={() => setShowPanel(!showPanel)}
        title="Notifications"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showPanel && (
        <>
          <div className="notification-overlay" onClick={() => setShowPanel(false)} />
          <div className="notification-panel">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button
                className="close-panel"
                onClick={() => setShowPanel(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="notification-controls">
              <div className="notification-filters">
                <button
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => setFilter('all')}
                >
                  All ({notifications.length})
                </button>
                <button
                  className={filter === 'unread' ? 'active' : ''}
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  className={filter === 'read' ? 'active' : ''}
                  onClick={() => setFilter('read')}
                >
                  Read
                </button>
              </div>
              {unreadCount > 0 && (
                <button className="mark-all-read" onClick={markAllAsRead}>
                  Mark all read
                </button>
              )}
            </div>

            <div className="notification-list">
              {filteredNotifications.length === 0 ? (
                <div className="no-notifications">
                  <Bell size={48} />
                  <p>No notifications</p>
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {getIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <button
                      className="delete-notification"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="notification-footer">
                <button className="clear-all-btn" onClick={clearAll}>
                  Clear All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Notifications;
