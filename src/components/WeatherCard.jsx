import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { 
  WiThermometer, 
  WiHumidity, 
  WiStrongWind, 
  WiBarometer,
  WiRaindrop,
  WiDaySunny 
} from 'react-icons/wi';

export default function WeatherCard({ weather, loading }) {
  if (loading) return (
    <div className="text-center">
      <Spinner animation="grow" variant="light" />
    </div>
  );

  if (!weather) return null;

  return (
    <Card className="glass-card p-4 text-center mx-auto" style={{ maxWidth: "500px" }}>
      <Card.Body>
        <Row className="align-items-center mb-4">
          <Col>
            <WiDaySunny className="weather-icon" size={80} />
            <Card.Title className="text-shadow h1 fw-bold mb-0">
              {Math.round(weather.main.temp)}°C
            </Card.Title>
            <Card.Text className="h5 text-uppercase">
              {weather.weather[0].description}
            </Card.Text>
            <Card.Text className="h2">{weather.name}</Card.Text>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <div className="p-3 bg-white bg-opacity-10 rounded-3">
              <WiThermometer size={30} />
              <div className="mt-2">Ressenti</div>
              <div className="h5">{Math.round(weather.main.feels_like)}°C</div>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white bg-opacity-10 rounded-3">
              <WiHumidity size={30} />
              <div className="mt-2">Humidité</div>
              <div className="h5">{weather.main.humidity}%</div>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white bg-opacity-10 rounded-3">
              <WiStrongWind size={30} />
              <div className="mt-2">Vent</div>
              <div className="h5">{weather.wind.speed} km/h</div>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-white bg-opacity-10 rounded-3">
              <WiBarometer size={30} />
              <div className="mt-2">Pression</div>
              <div className="h5">{weather.main.pressure} hPa</div>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-white bg-opacity-10 rounded-3">
              <WiRaindrop size={30} />
              <div className="mt-2">Visibilité</div>
              <div className="h5">{weather.visibility / 1000} km</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

