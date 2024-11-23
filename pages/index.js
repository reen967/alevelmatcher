import MatchingForm from '../components/MatchingForm';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Course and Job Matching</h1>
      <button onClick={() => window.location.href = '/results?searchType=course-to-job'}>A Level to Apprenticeship Search</button>
      <button onClick={() => window.location.href = '/results?searchType=job-to-course'}>Apprenticeship to A Level Search</button>
    </div>
  );
}
