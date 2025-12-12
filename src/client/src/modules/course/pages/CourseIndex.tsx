import { NavLink } from "react-router-dom"

const CourseIndex = () => {
    return (
        <div>
            <h1>Course Index Page</h1>
            <NavLink to={'/course/234'} >course Details</NavLink>
            <NavLink to={'/course/234/edit'} >course Edit</NavLink>
        </div>
    )
}

export default CourseIndex