import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "images/8.jpeg" },
  { url: "images/2.jpeg" },
  { url: "images/3.jpeg" },
  { url: "images/4.jpeg" },
  { url: "images/5.jpeg" },
  { url: "images/6.jpeg" },
  { url: "images/7.jpeg" },
];

const Slider = () => {
  return (
    <div className="container">
        <div className="row">
      <SimpleImageSlider
        width={1280}
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
    </div>
  );
}
export default Slider;