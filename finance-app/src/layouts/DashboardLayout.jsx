import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="ml-64 p-4">
                {children}
            </main>
        </div>
    );
}
