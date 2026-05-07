import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2 className="error-title">Xəta baş verdi</h2>
          <p className="error-message">Səhifə yüklənərkən problem yarandı.</p>
          <button
            className="error-btn"
            onClick={() => this.setState({ hasError: false })}
          >
            Yenidən cəhd et
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;