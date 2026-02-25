import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  const handleLinkedInLogin = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=http://192.168.29.184:8080/auth/linkedin/callback&scope=openid%20profile%20email`;
  };

  return (
    <div className="flex items-center justify-center min-h-scree">
      <button
        onClick={handleLinkedInLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-25 text-lg rounded-xl shadow-lg transition"
      >
        Continue with LinkedIn
      </button>
    </div>
  );
}
