import "./App.css";

// eslint-disable-next-line react/prop-types
function AsteroidsTable({ asteroids }) {
  return (
    <div>
      {asteroids.map((asteroid) => (
        <table key={asteroid.name} style={{ border: "1px solid red" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Diameter</th>
              <th>How far</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textDecoration: "underline" }}>{asteroid.name}</td>
              <td>
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max}
              </td>
              <td>
                {asteroid.close_approach_data[0].miss_distance.kilometers}
              </td>
              <td>
                {asteroid.close_approach_data[0].close_approach_date_full}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

// really default?
export default AsteroidsTable;
