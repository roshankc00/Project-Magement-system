import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <Spinner animation="border" role="status" className='d-flex ms-5 justify-content-center'>
      <span className="visually-hidden"></span>
    </Spinner>
  );
}

export default LoadingSpinner;