import { Link } from 'react-router-dom';

const RegisterNavigation = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-3 gap-16">
                <Link to="/register/customer">
                    <div className="bg-blue-500 hover:bg-blue-600 text-white text-center py-10 px-8 rounded-lg cursor-pointer">
                        Customer Registration
                    </div>
                </Link>
                <Link to="/register/branch-manager">
                    <div className="bg-green-500 hover:bg-green-600 text-white text-center py-10 px-8 rounded-lg cursor-pointer">
                        Branch Manager Registration
                    </div>
                </Link>
                <Link to="/register/admin">
                    <div className="bg-yellow-500 hover:bg-yellow-600 text-white text-center py-10 px-8 rounded-lg cursor-pointer">
                        Admin Registration
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RegisterNavigation;