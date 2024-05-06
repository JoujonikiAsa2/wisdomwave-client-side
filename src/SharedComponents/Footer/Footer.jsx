import logo from '../../assets/Photos/LandingPage/logo_wave.png'

const Footer = () => {
    return (
        <div className='bg-[#CEE7E1]'>
            <footer className="flex lg:flex-row md:flex-row flex-col text-base-content lg:justify-between md:justify-between justify-center lg:px-28 px-10 pt-4 gap-8">
                <div className='flex flex-col justify-center items-center gap-3 lg:text-left text-center lg:w-[25%] w-full'>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <div className='flex gap-2 justify-center items-center'>
                            <img src={logo} alt="" className='lg:w-10 lg:h-10 w-6 h-6' />
                            <div>
                                <h2 className='text-lg'><span className='text-[#5c802d]'>Wisdom</span> <span className='text-[#0645B1]'>Wave</span></h2>
                            </div>
                        </div>
                        <p className='max-w-[350px] text-gray-500 text-center'>A global learning platform. You can join as Student, Instructor and Tutor From anyhwere</p>
                        <div className=''>
                            <button className='btn  btn-sm w-24 bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white border-2 border-none capitalize'>Join</button>
                        </div>
                    </div>
                </div>
                <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                    <header className="text-base text-black pb-3">Quick Links</header>
                    <a className="link link-hover text-gray-500">Home</a>
                    <a className="link link-hover text-gray-500">Find Tutors</a>
                    <a className="link link-hover text-gray-500">Discussions Forum</a>
                    <a className="link link-hover text-gray-500">All Cources</a>
                </nav>
                <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                    <header className="text-base text-black pb-3">Legal</header>
                    <a className="link link-hover text-gray-500">Terms of use</a>
                    <a className="link link-hover text-gray-500">Privacy policy</a>
                    <a className="link link-hover text-gray-500">Cookie policy</a>
                </nav>
                <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                    <header className="text-base text-black pb-3">Social</header>
                    <a className="link link-hover text-gray-500">Twitter</a>
                    <a className="link link-hover text-gray-500">Instagram</a>
                    <a className="link link-hover text-gray-500">Facebook</a>
                    <a className="link link-hover text-gray-500">Github</a>
                </nav>
            </footer>
            <footer className='flex flex-col justify-center items-center'>
                <div className='divider h-[1px] bg-slate-400'></div>
                <div className='pb-3 text-center'>
                    <p className='text-gray-500'>Copyright © 2023 - All right reserved by WisdomWave Ltd</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;