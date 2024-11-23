export default function ResultList({ results }) {
  return (
    <div>
      <h2>Matching Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name || result.title}</li>
        ))}
      </ul>
    </div>
  );
}
