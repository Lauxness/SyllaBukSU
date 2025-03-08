import SidebarComponent from "../Components/Sidebar/sideBar";
import Header from "../Components/Header/Header";
import SpecificLOs from "../Components/SpecificLOs/SpecificLOs";
import Upperbar from "../Components/Upperbar/Upperbar";
function SLOPage() {
  return (
    <>
      <Header />
      <Upperbar currentPage="Generate specific learning outcomes" />
      <div
        style={{
          height: "calc(100vh - 135px)",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <SidebarComponent currentPage="slos" collapsed={false} />
        <SpecificLOs />
      </div>
    </>
  );
}
export default SLOPage;
