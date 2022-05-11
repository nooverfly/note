import "./style.scss";

export default function LayoutGrid() {
  return (
    <div>
      <div>
        <h3>grid布局基础</h3>
        <span>foo</span>
        <div id="container">
          <div className="item item1" style={{ background: "#ef342a" }}>
            1
          </div>
          <div className="item item2" style={{ background: "#f68f26" }}>
            2
          </div>
          <div className="item item3" style={{ background: "#4ba946" }}>
            3
          </div>
          <div className="item item4" style={{ background: "#0376c2" }}>
            4
          </div>
          <div className="item item5" style={{ background: "#c077af" }}>
            5
          </div>
          <div className="item item6" style={{ background: "#f8d29d" }}>
            6
          </div>
          <div className="item item7" style={{ background: "#b5a87f" }}>
            7
          </div>
          <div className="item item8" style={{ background: "#d0e4a9" }}>
            8
          </div>
          <div className="item item9" style={{ background: "#4dc7ec" }}>
            9
          </div>
        </div>
        <span>bar</span>
      </div>

    </div>
  );
}
