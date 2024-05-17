import "./App.css";
import { roundStringToTwoDecimalPlaces } from "./utils";

function AsteroidsTable({ asteroids }) {
  return (
    <div>
      <table>
        {asteroids[0] && (
          <thead>
            <tr>
              <th>Asteroid name</th>
              <th>Diameter (km)</th>
              <th>Miss distance from Earth (km)</th>
              <th>When</th>
            </tr>
          </thead>
        )}
        <tbody>
          {asteroids.map((asteroid) => {
            let diamMin = roundStringToTwoDecimalPlaces(
              asteroid.estimated_diameter.kilometers.estimated_diameter_min
            );
            let diamMax = roundStringToTwoDecimalPlaces(
              asteroid.estimated_diameter.kilometers.estimated_diameter_max
            );
            let missDistance = roundStringToTwoDecimalPlaces(
              asteroid.close_approach_data[0].miss_distance.kilometers
            );
            let when = asteroid.close_approach_data[0].close_approach_date_full;
            return (
              <tr key={asteroid.id}>
                <td style={{ textDecoration: "underline" }}>{asteroid.name}</td>
                <td>{`${diamMin}-${diamMax}`}</td>
                <td>{missDistance}</td>
                <td>{when}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// really default?
export default AsteroidsTable;
