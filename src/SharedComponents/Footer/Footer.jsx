import logo from '../../assets/Photos/LandingPage/logo_wave.png'

const Footer = () => {
    return (
        <div className=''>
            <div className=' bg-slate-200 dark:bg-slate-200'>
                <footer className="flex lg:flex-row md:flex-row flex-col text-base-content lg:justify-between md:justify-between justify-center gap-4 lg:px-28 py-6">
                    <aside className='flex flex-col justify-center items-center gap-3 lg:text-left text-center'>
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='flex gap-2 justify-center items-center'>
                                <img src={logo} alt="" className='lg:w-10 lg:h-10 w-6 h-6' />
                                <div>
                                    <h2 className='text-base font-bold'><span className='text-[#5c802d]'>Wisdom</span> <span className='text-[#0645B1]'>Wave</span></h2>
                                </div>
                            </div>
                            <p className='max-w-[350px] dark:text-black text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, aut obcaecati nam voluptatum nesciunt exercitationem.</p>
                            <div className=''>
                                <button className='btn  btn-sm w-24 bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white border-2 border-none'>Join</button>
                            </div>
                        </div>
                    </aside>
                    <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                        <header className="text-base font-bold text-black pb-3">Company</header>
                        <a className="link link-hover">About Us</a>
                        <a className="link link-hover">Blog</a>
                        <a className="link link-hover">Cources</a>
                        <a className="link link-hover">FAQ</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                        <header className="text-base font-bold text-black pb-3">Quick Links</header>
                        <a className="link link-hover">About Us</a>
                        <a className="link link-hover">Blog</a>
                        <a className="link link-hover">Cources</a>
                        <a className="link link-hover">FAQ</a>
                        <a className="link link-hover">Contact Us</a>
                        <a className="link link-hover">My Account</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                        <header className="text-base font-bold text-black pb-3">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center dark:text-black'>
                        <header className="text-base font-bold text-black pb-3">Social</header>
                        <a className="link link-hover">Twitter</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">Facebook</a>
                        <a className="link link-hover">Github</a>
                    </nav>
                </footer>
                <footer className='flex flex-col justify-center items-center py-3'>
                    <div className='divider h-[1px] bg-slate-400'></div>
                    <div className='pb-3 text-center'>
                        <p>Copyright © 2023 - All right reserved by WisdomWave Ltd</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;