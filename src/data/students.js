// Mock student data. Attendance values cover Eligible, Warning and Detained.
const students = [
  { id: "s1", name: "Rahul Sharma", enrollment: "1023", email: "rahul.sharma@college.edu", course: "B.Tech CSE", semester: 5, gender: "Male", attendance: 86,
    subjects: [{ name: "Web Technology", attendance: 85 }, { name: "DBMS", attendance: 90 }, { name: "AI", attendance: 78 }] },
  { id: "s2", name: "Priya Patel", enrollment: "1024", email: "priya.patel@college.edu", course: "B.Tech CSE", semester: 5, gender: "Female", attendance: 92,
    subjects: [{ name: "Web Technology", attendance: 94 }, { name: "DBMS", attendance: 91 }, { name: "AI", attendance: 89 }] },
  { id: "s3", name: "Amit Verma", enrollment: "2031", email: "amit.verma@college.edu", course: "B.Tech IT", semester: 3, gender: "Male", attendance: 68,
    subjects: [{ name: "Data Structures", attendance: 70 }, { name: "Networks", attendance: 65 }, { name: "OOP", attendance: 69 }] },
  { id: "s4", name: "Sneha Iyer", enrollment: "2032", email: "sneha.iyer@college.edu", course: "B.Tech IT", semester: 3, gender: "Female", attendance: 79,
    subjects: [{ name: "Data Structures", attendance: 80 }, { name: "Networks", attendance: 76 }, { name: "OOP", attendance: 81 }] },
  { id: "s5", name: "Karan Mehta", enrollment: "3101", email: "karan.mehta@college.edu", course: "BCA", semester: 1, gender: "Male", attendance: 54,
    subjects: [{ name: "C Programming", attendance: 52 }, { name: "Mathematics", attendance: 58 }, { name: "Digital Logic", attendance: 51 }] },
  { id: "s6", name: "Ananya Gupta", enrollment: "3102", email: "ananya.gupta@college.edu", course: "BCA", semester: 1, gender: "Female", attendance: 88,
    subjects: [{ name: "C Programming", attendance: 90 }, { name: "Mathematics", attendance: 85 }, { name: "Digital Logic", attendance: 89 }] },
  { id: "s7", name: "Rohan Desai", enrollment: "4201", email: "rohan.desai@college.edu", course: "MCA", semester: 3, gender: "Male", attendance: 73,
    subjects: [{ name: "Cloud Computing", attendance: 75 }, { name: "Machine Learning", attendance: 70 }, { name: "Java", attendance: 74 }] },
  { id: "s8", name: "Meera Nair", enrollment: "4202", email: "meera.nair@college.edu", course: "MCA", semester: 3, gender: "Female", attendance: 95,
    subjects: [{ name: "Cloud Computing", attendance: 96 }, { name: "Machine Learning", attendance: 94 }, { name: "Java", attendance: 95 }] },
  { id: "s9", name: "Arjun Reddy", enrollment: "5301", email: "arjun.reddy@college.edu", course: "B.Tech ECE", semester: 7, gender: "Male", attendance: 58,
    subjects: [{ name: "VLSI", attendance: 55 }, { name: "Embedded Systems", attendance: 60 }, { name: "Signal Processing", attendance: 59 }] },
  { id: "s10", name: "Isha Kapoor", enrollment: "6401", email: "isha.kapoor@college.edu", course: "B.Tech Mechanical", semester: 5, gender: "Female", attendance: 81,
    subjects: [{ name: "Thermodynamics", attendance: 83 }, { name: "Fluid Mechanics", attendance: 78 }, { name: "CAD", attendance: 82 }] },
  { id: "s11", name: "Vivek Joshi", enrollment: "6402", email: "vivek.joshi@college.edu", course: "B.Tech Mechanical", semester: 5, gender: "Male", attendance: 77,
    subjects: [{ name: "Thermodynamics", attendance: 76 }, { name: "Fluid Mechanics", attendance: 79 }, { name: "CAD", attendance: 76 }] },
  { id: "s12", name: "Riya Shah", enrollment: "1025", email: "riya.shah@college.edu", course: "B.Tech CSE", semester: 5, gender: "Female", attendance: 64,
    subjects: [{ name: "Web Technology", attendance: 66 }, { name: "DBMS", attendance: 62 }, { name: "AI", attendance: 64 }] },
];

export default students;
