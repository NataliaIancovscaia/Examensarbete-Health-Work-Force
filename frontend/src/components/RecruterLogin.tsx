import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/images/assets';
import { AppContext, type Company } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface CompanyResponse {
  success: boolean;
  message: string;
  company?: Company;
  token?: string;
}

const RecruiterLogin: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<'Login' | 'Sign Up'>('Login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('RecruiterLogin must be used inside AppProvider');
  }

  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken } =
    appContext;

  const resetFormState = () => {
    setPassword('');
    setEmail('');
    setName('');
    setImage(null);
    setImagePreview(null);
    setIsTextDataSubmitted(false);
  };

  const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error))
      return error.message || 'Something went wrong';
    if (error instanceof Error) return error.message;
    return 'Something went wrong';
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        const { data } = await axios.post<CompanyResponse>(
          backendUrl + '/api/company/login',
          {
            email,
            password,
          },
        );

        if (!data.success) {
          alert(data.message);
          return;
        }

        setCompanyData(data.company ?? null);
        setCompanyToken(data.token ?? null);
        localStorage.setItem('companyToken', data.token!);

        setShowRecruiterLogin(false);
        navigate('/dashboard');
        return;
      }

      if (!isTextDataSubmitted) {
        setIsTextDataSubmitted(true);
        return;
      }

      if (!image) {
        alert('Upload company logo');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);

      const { data } = await axios.post<CompanyResponse>(
        backendUrl + '/api/company/register',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (!data.success) {
        alert(data.message);
        return;
      }

      setCompanyData(data.company ?? null);
      setCompanyToken(data.token ?? null);
      localStorage.setItem('companyToken', data.token!);

      setShowRecruiterLogin(false);
      navigate('/dashboard');
    } catch (error: unknown) {
      alert(getErrorMessage(error));
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div className="popup-wrapper" onClick={() => setShowRecruiterLogin(false)}>
      <form
        onSubmit={onSubmitHandler}
        className="popup-form"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="popup-close"
          onClick={() => setShowRecruiterLogin(false)}
        >
          <img src={assets.cross_icon} alt="Close" />
        </div>

        <h1 className="popup-title">
          Recruiter {state === 'Login' ? 'Login' : 'Sign Up'}
        </h1>
        <p className="popup-subtitle">
          {state === 'Login' ? 'Sign in to continue' : 'Sign up to continue'}
        </p>

        {state === 'Sign Up' && isTextDataSubmitted ? (
          <div className="popup-upload">
            <label htmlFor="image">
              <img
                src={imagePreview || assets.upload_area}
                alt="Upload"
                className={imagePreview ? 'uploaded-preview' : ''}
              />
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </label>
            <p>Upload Company Logo</p>
          </div>
        ) : (
          <>
            {state === 'Sign Up' && (
              <div className="popup-input">
                <img src={assets.person_icon} alt="Person" />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="popup-input">
              <img src={assets.email_icon} alt="Email" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="popup-input">
              <img src={assets.lock_icon} alt="Password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {state === 'Login' && <p className="forgot">Forgot password?</p>}

        <button type="submit" className="popup-btn">
          {state === 'Login' ? 'Login' : image ? 'Create Account' : 'Next'}
        </button>

        {state === 'Login' ? (
          <p className="switch">
            Don't have an account?
            <span
              onClick={() => {
                setState('Sign Up');
                resetFormState();
              }}
            >
              {' '}
              Sign Up
            </span>
          </p>
        ) : (
          <p className="switch">
            Already have an account?
            <span
              onClick={() => {
                setState('Login');
                resetFormState();
              }}
            >
              {' '}
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
