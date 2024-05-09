const DashboardTitle = ({title, subTitle}) => {
    return (
        <div className="">
            <h2 className="text-xl font-bold ">{title}</h2>
            <p className="text-sm pt-2 pb-8">{subTitle}</p>
        </div>
    );
};

export default DashboardTitle;