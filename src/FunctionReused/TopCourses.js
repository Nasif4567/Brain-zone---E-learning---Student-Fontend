 // Recommend top they are sorted first based on top enrollment 
export default function recommendTopCourses(courses, topCount) {
    const sortedCourses = courses.sort((a, b) => b.studentEnrolled - a.studentEnrolled);
    return sortedCourses.slice(0, topCount);
  }