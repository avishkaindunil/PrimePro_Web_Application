import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'
import MainLayout from '../../components/MainLayout';

export default function MainDashboard() {
    return (
        <>
            <MainLayout />
            <Sidebar />
            <Header />
            <h2>Main Dashboard</h2>
        </>
    )
}