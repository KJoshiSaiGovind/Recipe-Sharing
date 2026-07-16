import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-img"></div>
          <div className="skeleton-content">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-meta"></div>
            <div className="skeleton skeleton-tags"></div>
            <div className="skeleton skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
