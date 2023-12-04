const Footer = () => {
    return (
        <div>
            <div className='mt-12 bg-slate-200'>
                <footer className="flex lg:flex-row md:flex-row flex-col text-base-content lg:justify-between md:justify-between justify-center gap-4 lg:px-28 py-6">
                    <aside className='flex flex-col gap-3 lg:text-left text-center'>
                        <div className='flex lg:justify-start justify-center gap-3'>
                            <img src="" alt="" className='w-10 h-10' />
                            <h2 className='text-xl font-bold'><span className='text-[#21B573]'>Wisdom</span> <span className='text-[#0645B1]'>Wave</span></h2>
                        </div>
                        <p className='max-w-[350px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, aut obcaecati nam voluptatum nesciunt exercitationem.</p>
                        <button className='btn btn-outline text-[#0645B1]'>Join</button>
                    </aside>
                    <nav className='flex flex-col lg:text-left text-center'>
                        <header className="text-lg font-bold text-black pb-3">Company</header>
                        <a className="link link-hover">About Us</a>
                        <a className="link link-hover">Blog</a>
                        <a className="link link-hover">Cources</a>
                        <a className="link link-hover">FAQ</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center'>
                        <header className="text-lg font-bold text-black pb-3">Quick Links</header>
                        <a className="link link-hover">About Us</a>
                        <a className="link link-hover">Blog</a>
                        <a className="link link-hover">Cources</a>
                        <a className="link link-hover">FAQ</a>
                        <a className="link link-hover">Contact Us</a>
                        <a className="link link-hover">My Account</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center'>
                        <header className="text-lg font-bold text-black pb-3">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <nav className='flex flex-col lg:text-left text-center'>
                        <header className="text-lg font-bold text-black pb-3">Social</header>
                        <a className="link link-hover">Twitter</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">Facebook</a>
                        <a className="link link-hover">Github</a>
                    </nav>
                </footer>
                <footer className='flex flex-col justify-center items-center py-3'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='divider flex justify-center w-[300px] lg:w-[1000px] md:[w-1000px] '></div>
                    </div>
                    <div className='pb-3'>
                        <p>Copyright © 2023 - All right reserved by WisdomWave Ltd</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;