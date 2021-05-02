import { Carousel } from "react-bootstrap";
export default function Carusel() {
  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://www.games-workshop.com/resources/touts/2020-11-14/GW-New-To-40K-2020-11-14-Portal-All-bm.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>More Necrons awakend</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://warhammer40000.com/wp-content/uploads/2020/05/Introduction-artwork-v3-1.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Marines are still the meta</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
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
