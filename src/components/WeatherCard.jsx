import { Card, ListGroup, Spinner } from 'react-bootstrap';

export default function WeatherCard({ weather, loading }) {
  if (loading) return <Spinner animation="border" />;
  if (!weather) return null;

  return (
    <Card className="mt-4" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{weather.name}</Card.Title>
        <Card.Img variant="top" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <Card.Text>{weather.weather[0].description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Température: {Math.round(weather.main.temp)}°C</ListGroup.Item>
        <ListGroup.Item>Humidité: {weather.main.humidity}%</ListGroup.Item>
        <ListGroup.Item>Vent: {weather.wind.speed} km/h</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}