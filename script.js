const subjectsData = {
  MG: {
    1: [{ name: "Anatomie 1", credits: 7 }, { name: "Biofizică", credits: 5 }],
  },
};

function GradeCalculator() {
  const [grades, setGrades] = React.useState({});
  const [finalGrade, setFinalGrade] = React.useState(null);

  const calculateFinalGrade = () => {
    let totalCredits = 0, weightedSum = 0;
    subjectsData.MG[1].forEach(({ name, credits }) => {
      const val = grades[name];
      if (!isNaN(val)) {
        weightedSum += val * credits;
        totalCredits += credits;
      }
    });
    setFinalGrade((weightedSum / totalCredits).toFixed(2));
  };

  return (
    <div>
      <h2>Calculator Medie</h2>
      {subjectsData.MG[1].map(({ name, credits }) => (
        <div key={name}>
          <span>{name} ({credits} ECTS)</span>
          <input type="number" min="5" max="10" onChange={(e) => setGrades({ ...grades, [name]: parseFloat(e.target.value) })} />
        </div>
      ))}
      <button onClick={calculateFinalGrade}>Calculează</button>
      {finalGrade && <p>Media Finală: {finalGrade}</p>}
    </div>
  );
}

ReactDOM.render(<GradeCalculator />, document.getElementById("app"));