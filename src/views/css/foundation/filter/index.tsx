import map from "../../../../assets/images/map.png";

export default function CssFilter() {
  const style = {
    transform: `scale(0.3, 0.3)`,
    filter: `brightness(80%)
      opacity(0.5)`,
  };

  return (
    <div>
      <img src={map} alt="map" style={style} />
    </div>
  );
}
