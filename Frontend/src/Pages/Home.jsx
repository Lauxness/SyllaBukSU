import SidebarComponent from "../Components/Sidebar/sideBar";
import Header from "../Components/Header/Header";
import CourseDescription from "../Components/CourseDescription/CourseDescription";
import CourseOutcomes from "../Components/CouseOutcomes/CourseOutcomes";
import SpecificLOs from "../Components/SpecificLOs/SpecificLOs";
import Upperbar from "../Components/Upperbar/Upperbar";
function LoginPage() {
  return (
    <>
      <Header />
      <Upperbar currentPage="Generate a course description" />
      <div
        style={{
          height: "calc(100vh - 135px)",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <SidebarComponent currentPage="home" collapsed={false} />
        <SpecificLOs />
      </div>
    </>
  );
}
export default LoginPage;
