import { Carousel } from "react-bootstrap";
export default function Carusel() {
  return (
    <div className="carouselx">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="mx-auto d-block img-thumbnail"
            src="https://www.games-workshop.com/resources/touts/2020-11-14/GW-New-To-40K-2020-11-14-Portal-All-bm.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>More Necrons awakend</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="mx-auto d-block img-thumbnail"
            src="https://www.games-workshop.com/resources/touts/2020-11-14/GW-New-To-40K-2020-11-14-Portal-All-bm.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Indominitus is good deal</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
