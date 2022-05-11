import "./style.scss";

export default function Trapezoid() {
  return (
    <div>
      <div id="trapezoid-basic">Trapezoid</div>
      <div id="trapezoid-text-no-transform">Trapezoid</div>
      <nav className="trapezoid-tabs">
        <a href="#" className="trapezoid-tab">
          Home
        </a>
        <a href="#" className="trapezoid-tab selected">
          Projects
        </a>
        <a href="#" className="trapezoid-tab">
          About
        </a>
      </nav>
      <div className="trapezoid-content">Content</div>
      <hr />
      <nav className="trapezoid-menu">
        <a href="#" className="trapezoid-menu-item1">
          <span>大屏管理</span>
        </a>
        <a href="#" className="trapezoid-menu-item2">
          <span>演示预案</span>
        </a>
      </nav>
    </div>
  );
}
