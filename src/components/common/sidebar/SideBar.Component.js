import { Storage } from "../../../data/storage.js";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import "../../../assets/css/sidebar.css";

function SideBar(){
    let data = useSelector((state) => state.posts.value);
    let posts = data.slice(-10).map(item => {  return {title: item.title, id: item.id}}).reverse();

    return (
        <div>
            <div className="category-container">
                <h3>
                    Recent Posts
                </h3>
                
                { posts.map(item => ( <Link to={"/post/" + item.id}><h6 key={"post" + item.id}>{item.title}</h6> </Link> )) }
                
            </div>
        
        </div>
    );

}

export default SideBar;