// Course dataset will be replaced by database and backned
import CourseImage from "../Image/Mobile.jpg";

const courses = [
    { id: 1, image: CourseImage, title: "Android Mobile App Development", description: "This is a description", enrollments: 100, ratings: [4.5, 4.7, 4.2]  },
    { id: 2, image: CourseImage, title: "Swift", description: "This is a second description", enrollments: 80, ratings: [4.0, 4.2, 3.8] },
    { id: 3, image: CourseImage, title: "Kotlin", description: "This is a third description", enrollments: 20, ratings: [4.0, 4.8, 3.8] },
    { id: 4, image: CourseImage, title: "Flutter", description: "This is a fourth description", enrollments: 50, ratings: [4.0, 4.2, 3.8] },
    { id: 5, image: CourseImage, title: "Flutter and Dart", description: "This is a fifth description", enrollments: 50, ratings: [4.0, 4.2, 3.8] },
  ];

  // This function is used of searching courses by key words also with this a function will be implemented 
  // which will recommend top courses based on in enrollment
export default function filterCoursesByKeyword(keyword) {
    return courses.filter(course => course.title.toLowerCase().includes(keyword.toLowerCase()));
  }