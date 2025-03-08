import SidebarComponent from "../Components/Sidebar/sideBar";
import Header from "../Components/Header/Header";
import CourseDescription from "../Components/CourseDescription/CourseDescription";
import Upperbar from "../Components/Upperbar/Upperbar";
function DescPage() {
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
        <SidebarComponent currentPage="desc" collapsed={false} />
        <CourseDescription />
      </div>
    </>
  );
}
export default DescPage;
