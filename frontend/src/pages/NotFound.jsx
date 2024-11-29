import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="container-custom">
        <div className="card gaming-gradient max-w-2xl mx-auto text-center p-12">
          <h1 className="font-gaming text-8xl font-bold text-accent mb-4">404</h1>
          <h2 className="font-gaming text-3xl text-white mb-6">System Malfunction</h2>
          <p className="text-lg text-white/80 mb-8">
            The digital realm you're seeking appears to be in another dimension.
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            Return to Base
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
