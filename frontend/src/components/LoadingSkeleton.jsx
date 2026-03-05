import React from 'react';

export const CardSkeleton = () => (
  <div className="card-premium p-1-5rem">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-badge"></div>
    </div>
    <div className="skeleton-text-short"></div>
    <div className="skeleton-number"></div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="card-premium p-1rem">
    <div className="skeleton-table">
      <div className="skeleton-row skeleton-header-row">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-cell">
            <div className="skeleton-id"></div>
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-name"></div>
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-email"></div>
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-dept"></div>
          </div>
          <div className="skeleton-cell">
            <div className="skeleton-action"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AttendanceSkeleton = () => (
  <div className="attendance-grid-layout p-1-5rem">
    <div className="card-premium">
      <div className="skeleton-date-picker"></div>
      <div className="skeleton-attendance-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-attendance-item">
            <div className="skeleton-employee-info">
              <div className="skeleton-name"></div>
              <div className="skeleton-id"></div>
            </div>
            <div className="skeleton-buttons">
              <div className="skeleton-btn"></div>
              <div className="skeleton-btn"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="card-premium attendance-sidebar">
      <div className="skeleton-history-header"></div>
      <div className="skeleton-history-list">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-history-item"></div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="animate-up">
    <div className="page-header">
      <div className="skeleton-title"></div>
      <div className="skeleton-subtitle"></div>
    </div>
    <div className="dashboard-grid dashboard-stats-grid">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="card-premium mt-3rem">
      <div className="skeleton-status"></div>
    </div>
  </div>
);
