import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPositions,
  createNewPosition,
  deleteExistingPosition,
  selectPositions,
  selectPositionsLoading,
  selectPositionsError,
} from "../features/position/positionSlice";
import {
  fetchAllCandidates,
  createNewCandidate,
  deleteExistingCandidate,
  selectCandidates,
  selectCandidatesLoading,
  selectCandidatesError,
} from "../features/candidate/candidateSlice";
import {
  fetchAllApplications,
  createNewApplication,
  deleteExistingApplication,
  selectApplications,
  selectApplicationsLoading,
  selectApplicationsError,
} from "../features/application/applicationSlice";
import store from "../store";
function ApiUsage() {
  const dispatch = useDispatch();
  const positions = useSelector(selectPositions);
  const candidates = useSelector(selectCandidates);
  const applications = useSelector(selectApplications);
  const positionsLoading = useSelector(selectPositionsLoading);
  const candidatesLoading = useSelector(selectCandidatesLoading);
  const applicationsLoading = useSelector(selectApplicationsLoading);
  const positionsError = useSelector(selectPositionsError);
  const candidatesError = useSelector(selectCandidatesError);
  const applicationsError = useSelector(selectApplicationsError);

  useEffect(() => {
    dispatch(fetchAllPositions());
    dispatch(fetchAllCandidates());
    dispatch(fetchAllApplications());
  }, [dispatch]);

  const handleCreatePosition = () => {
    const newPosition = store.getState().position;
    dispatch(createNewPosition(newPosition));
  };

  const handleCreateCandidate = () => {
    const newCandidate = {
      firstName: "ayala",
      lastName: "Doe",
      emailAddress: "johndoe@example.com",
      phoneNumber: "0548412413",
    };
    dispatch(createNewCandidate(newCandidate));
  };
  const handleCreateApplication = () => {
    const newApplication = {
      position: positions[positions.length - 1]._id,
      candidate: candidates[candidates.length - 1]._id,
      cognitiveTestScore: null,
      personalityTestScore: null,
      hasInterview: null,
      hasReliabilityTest: null,
      hasTaskPassed: null,
      hasJobOffer: null,
      isEmployed: null,
      rating: 0,
      totalScore: null,
    };

    dispatch(createNewApplication(newApplication));
  };

  const handleDeletePosition = (positionId: string) => {
    dispatch(deleteExistingPosition(positionId));
  };

  const handleDeleteCandidate = (candidateId: string) => {
    dispatch(deleteExistingCandidate(candidateId));
  };
  const handleDeleteApplication = (applicationId: string) => {
    dispatch(deleteExistingApplication(applicationId));
  };

  if (positionsLoading || candidatesLoading || applicationsLoading) {
    return <div>Loading...</div>;
  }

  if (positionsError || candidatesError || applicationsError) {
    return <div>Error occurred while fetching data.</div>;
  }
  console.log(positions[1]?._id);
  console.log(applications[1]?.position);
  console.log(positions[0]?._id === applications[0]?.position);
  console.log(applications);
  console.log(positions);

  return (
    <div>
      <h2>Positions:</h2>
      <ul>
        {positions.map((position: any) => (
          <li key={position._id}>
            <span>{position.name}</span>
            <button onClick={() => handleDeletePosition(position._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Candidates:</h2>
      <ul>
        {candidates.map((candidate: any) => (
          <li key={candidate._id}>
            <span>
              {candidate.firstName} {candidate.lastName}
            </span>
            <button onClick={() => handleDeleteCandidate(candidate._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Applications:</h2>
      <ul>
        {applications.map((application: any) => (
          <li key={application._id}>
            to position:
            <span>
              {
                positions.find(
                  (position: any) => position._id === application.position
                )?.name
              }
            </span>
            <br />
            from candidate:
            <span>
              {
                candidates.find(
                  (candidate: any) => candidate._id === application.candidate
                )?.firstName
              }
            </span>
            <br />
            <button onClick={() => handleDeleteApplication(application._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreatePosition}>Create New Position</button>
      <button onClick={handleCreateCandidate}>Create New Candidate</button>
      <button onClick={handleCreateApplication}>Create New Application</button>
    </div>
  );
}

export default ApiUsage;
