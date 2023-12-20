const Course = ({course}) => {
    const {title,thumbnail, instructor, rating, limitOfStudents, enrollFee} = course.courseDetails
    console.log("Print",title, instructor, rating, limitOfStudents, enrollFee)
    return (
        <div className="card">
            <img src={thumbnail} alt="" />
            <h2>{title}</h2>
        </div>
    );
};

export default Course;