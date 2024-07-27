import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Fetch data and validate userType
        const userType = "Employee";
        if (userType === 'Employee') {
            navigate('/employee/MainDashboard');
        } else if (userType === 'Admin') {
            // Navigate to user page
            // Example: history.push('/user');
        } else {
            // Invalid credentials, show error message
            // Example: setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Dont have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;