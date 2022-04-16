import { useParams } from "react-router-dom";
import { Tree } from "../components/Module";
import moduleToTree from "../courseToTree";
import course from "../example_course.json";

export default function CoursePage() {
  // const [course, setCourse] = useState<CourseType | null>(null);
  const { user, repo } = useParams<{ user: string; repo: string }>();
  const name = `${user}/${repo}`;

  // useEffect(() => {
  //   // parseCourseRepository(name).then(setCourse);
  // }, [name]);

  return course ? (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40rem",
        }}
      >
        <h1>{course.title}</h1>
        <em>{course.authors.join(", ")}</em>
        <br />
        <Tree
          tree={{
            name: "Course Breakdown",
            children: course.modules.map(moduleToTree),
          }}
        />
      </div>
    </div>
  ) : (
    <>No course</>
  );
}
