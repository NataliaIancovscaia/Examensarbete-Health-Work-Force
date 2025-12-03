import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/images/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("RecruiterLogin must be used inside AppProvider");

  const { setShowRecruiterLogin } = appContext;

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (state === "Login") {
      console.log("Logging in:", { email, password });
      return;
    }

    if (state === "Sign Up") {
      if (!isTextDataSubmitted) {
        setIsTextDataSubmitted(true);
        return;
      }

      if (!image) {
        alert("Please upload a company logo before creating the account.");
        return;
      }

      console.log("Creating recruiter account:", { name, email, password, image });
    }
  };

  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "unset";
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
     
        <div className="popup-close" onClick={() => setShowRecruiterLogin(false)}>
    <img src={assets.cross_icon} alt="Close" />
  </div>


        <h1 className="popup-title">Recruiter {state === "Login" ? "Login" : "Sign Up"}</h1>

        <p className="popup-subtitle">
          {state === "Login" ? "Sign in to continue" : "Sign up to continue"}
        </p>

        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="popup-upload">
            <label htmlFor="image">
              <img
                src={imagePreview || assets.upload_area}
                alt="Upload"
                className={imagePreview ? "uploaded-preview" : ""}
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    const url = URL.createObjectURL(file);
                    setImagePreview(url);
                  } else {
                    setImage(null);
                    setImagePreview(null);
                  }
                }}
                type="file"
                id="image"
                hidden
              />
            </label>
            <p>Upload Company Logo</p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="popup-input">
                <img src={assets.person_icon} alt="Person icon" />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="popup-input">
              <img src={assets.email_icon} alt="Email icon" />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
              />
            </div>

            <div className="popup-input">
              <img src={assets.lock_icon} alt="Password icon" />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && <p className="forgot">Forgot password?</p>}

        <button type="submit" className="popup-btn">
          {state === "Login"
            ? "Login"
            : image
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="switch">
            Don’t have an account?
            <span onClick={() => setState("Sign Up")}> Sign Up</span>
          </p>
        ) : (
          <p className="switch">
            Already have an account?
            <span onClick={() => setState("Login")}> Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;


