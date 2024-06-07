import React from "react";
import { Link } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { BsFilesAlt } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';

function ModuleMenuNavigation() {
  const { courseId } = useParams();

  return (
    <div className="border text-Black p-5 rounded-2xl w-[800px] h-auto ">
      <ul className="flex list-none space-x-10">
        <li>
          <Link to={`/ModuleShow/${courseId}`} className="flex items-center">
            <FaRegNewspaper className="mr-2" /> <span className="icon-text">Module Home</span>
          </Link>
        </li>

        <li>
          <Link to={`/DiscussionForum/${courseId}`} className="flex items-center">
            <BsFilesAlt className="mr-2" /> <span className="icon-text">Discussion Forum</span>
          </Link>
        </li>


        <li>
          <Link to={`/TakeTest/${courseId}`} className="flex items-center">
            <BsFillChatLeftTextFill className="mr-2" /> <span className="icon-text">Take Test</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ModuleMenuNavigation;
