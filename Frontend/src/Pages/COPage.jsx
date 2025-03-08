import SidebarComponent from "../Components/Sidebar/sideBar";
import Header from "../Components/Header/Header";
import CourseOutcomes from "../Components/CouseOutcomes/CourseOutcomes";
import Upperbar from "../Components/Upperbar/Upperbar";
function COPage() {
  return (
    <>
      <Header />
      <Upperbar currentPage="Generate course outcomes" />
      <div
        style={{
          height: "calc(100vh - 135px)",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <SidebarComponent currentPage="cos" collapsed={false} />
        <CourseOutcomes />
      </div>
    </>
  );
}
export default COPage;
