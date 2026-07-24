import { HiBackward } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Favorites() {
    return (
        <>

            <Link to={'/'}>
                <div className="back-btn">
                    <HiBackward /> Back
                </div>
            </Link>

            

        </>
    )
}
