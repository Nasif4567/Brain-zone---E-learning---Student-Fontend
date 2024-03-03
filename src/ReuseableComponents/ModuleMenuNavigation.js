import React from "react";
import { Link } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { BsFilesAlt } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";

function ModuleMenuNavigation() {
  return (
    <div className="border text-Black p-5 rounded-2xl w-[800px] h-auto ">
      <ul className="flex list-none space-x-10">
        <li>
          <Link to="/ModuleHome" className="flex items-center">
            <FaRegNewspaper className="mr-2" /> <span className="icon-text">Module Home</span>
          </Link>
        </li>

        <li>
          <Link to="/DiscussionForum" className="flex items-center">
            <BsFilesAlt className="mr-2" /> <span className="icon-text">Discussion Forum</span>
          </Link>
        </li>

        <li>
          <Link to="/AssignmentSub" className="flex items-center">
            <BsFillChatLeftTextFill className="mr-2" /> <span className="icon-text">Assignment Submit</span>
          </Link>
        </li>

        <li>
          <Link to="/contact" className="flex items-center">
            <BsFillChatLeftTextFill className="mr-2" /> <span className="icon-text">Assignment Grade</span>
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default ModuleMenuNavigation;
