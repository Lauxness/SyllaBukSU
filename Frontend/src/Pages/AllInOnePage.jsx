import SidebarComponent from "../Components/Sidebar/sideBar";
import Header from "../Components/Header/Header";
import CourseDescription from "../Components/CourseDescription/CourseDescription";
import CourseOutcomes from "../Components/CouseOutcomes/CourseOutcomes";
import SpecificLOs from "../Components/SpecificLOs/SpecificLOs";
import AllInOne from "../Components/AllInOne/AllInOne";
import Upperbar from "../Components/Upperbar/Upperbar";
function AllInOnePage(props) {
  return (
    <>
      <Header />
      <Upperbar currentPage="Generate all in one prompt" />
      <div
        style={{
          height: "calc(100vh - 135px)",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <SidebarComponent currentPage="allinone" collapsed={false} />
        <AllInOne />
      </div>
    </>
  );
}
export default AllInOnePage;
