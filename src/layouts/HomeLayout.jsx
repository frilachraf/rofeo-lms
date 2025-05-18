import { Outlet } from 'react-router-dom';
import { Header } from '../components/landing/Header';
import { FooterSection } from '../components/landing/FooterSection';
import { StudentHeader } from '../components/student-header';
// import { Header } from '../components/landing/Header';
// import { Footer } from '../components/landing/Footer';
export default function HomeLayout() {
    return (
        <div className="min-h-screen bg-white">
            {/* <Header /> */}
            <StudentHeader />

            <main className='w-full min-h-screen'>
                <Outlet />
            </main>
            <FooterSection />
        </div>
    );
}
