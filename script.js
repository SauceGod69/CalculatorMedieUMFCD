<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <title>Calculator Medie UMFCD</title>

    <!-- React și Babel -->
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <style>
      /* Super minimal reset + phone-friendly setup */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Inter", sans-serif;
        background: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 20px;
      }
      .container {
        width: 100%;
        max-width: 600px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
      h1 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.4rem;
      }

      /* Center the "select" section with a more elegant layout */
      .selector-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 30px;
        margin-bottom: 1.5rem;
      }
      .select-group {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .select-group label {
        font-weight: 600;
        margin-bottom: 5px;
      }
      .select-group select {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 0.95rem;
        background-color: #f9f9f9;
        cursor: pointer;
      }

      /* Subject entries with an elegant gray dividing line */
      .subject-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        font-size: 0.95rem;
      }
      /* Adjust spacing around the last subject line */
      .subject-container:last-of-type {
        margin-bottom: 10px;
      }

      /* Buttons with a friendly UI */
      .calculate-btn,
      .reset-btn {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.2s;
      }
      .calculate-btn {
        background: #007bff;
        color: #fff;
      }
      .calculate-btn:hover {
        background: #005fb3;
        transform: scale(1.01);
      }
      .calculate-btn:disabled {
        background: #bbb;
        cursor: not-allowed;
        transform: none;
      }
      .reset-btn {
        background: #ff4d4d;
        color: #fff;
      }
      .reset-btn:hover {
        background: #d63333;
        transform: scale(1.01);
      }

      /* Display the result in a tidy box */
      .result {
        margin-top: 20px;
        padding: 16px;
        background: #fafafa;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        font-weight: 600;
        line-height: 1.4;
      }
      .result p {
        margin-bottom: 0.5rem;
      }
      .result p:last-of-type {
        margin-bottom: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Calculator Medie UMFCD</h1>
      <div id="app"></div>
    </div>

    <script type="text/babel">
      /***********************************************************
       * Super-efficient, very user-friendly code (React-based)
       * with improved styling & separation lines after each grade
       ***********************************************************/
      const subjectsData = {
        MG: {
          1: [
            { name: "Anatomie 1", credits: 7 },
            { name: "Anatomie 2", credits: 5 },
            { name: "Biofizică", credits: 5 },
            { name: "Biochimie 1", credits: 5 },
            { name: "Biochimie 2", credits: 3 },
            { name: "Genetică", credits: 4 },
            { name: "Psihologie", credits: 3 },
            { name: "Marketing", credits: 2 },
            { name: "Etică", credits: 2 },
            { name: "Biocel", credits: 6 },
            { name: "Fiziologie", credits: 6 },
            { name: "Limba engleză", credits: 4 },
            { name: "Educație fizică", credits: 2 },
            { name: "Elemente juridice", credits: 2 },
            { name: "Opt1", credits: 2 },
            { name: "Opt2", credits: 2 },
            { name: "Practica de vară", credits: 2 },
          ],
          2: [
            { name: "Anatomie 1", credits: 7 },
            { name: "Histologie 1", credits: 5 },
            { name: "Microbiologie 1", credits: 4 },
            { name: "Neuroștiințe", credits: 6 },
            { name: "Informatică medicală", credits: 2 },
            { name: "Opt1", credits: 2 },
            { name: "Opt2", credits: 2 },
            { name: "Anatomie 2", credits: 5 },
            { name: "Histologie 2", credits: 5 },
            { name: "Microbiologie – Bacteriologie 2", credits: 2 },
            { name: "Fiziologie medicală", credits: 6 },
            { name: "Biochimie clinică", credits: 4 },
            { name: "Științele comportamentului uman", credits: 3 },
            { name: "Istoria medicinei", credits: 2 },
            { name: "Limba engleză", credits: 3 },
            { name: "Educație fizică", credits: 2 },
            { name: "Practica de vară", credits: 2 },
          ],
          3: [
            { name: "Semiologie medicală 1", credits: 4 },
            { name: "Farmacologie", credits: 8 },
            { name: "Fiziopatologie 1", credits: 4 },
            { name: "Anatomie patologică 1", credits: 4 },
            { name: "Igienă", credits: 4 },
            { name: "Virusologie", credits: 4 },
            { name: "Parazitologie", credits: 2 },
            { name: "Opt", credits: 2 },
            { name: "Semiologie medicală 2", credits: 4 },
            { name: "Fiziopatologie 2", credits: 4 },
            { name: "Anatomie patologică 2", credits: 4 },
            { name: "Imunologie", credits: 4 },
            { name: "Etică medicală", credits: 2 },
            { name: "Practica de vară", credits: 2 },
          ],
          4: [
            { name: "Cardiologie", credits: 11 },
            { name: "Pneumologie", credits: 9 },
            { name: "Gastroenterologie", credits: 6 },
            { name: "Chirurgie generală", credits: 10 },
            { name: "Ortopedie și traumatologie", credits: 5 },
            { name: "Chirurgie și ortopedie pediatrică", credits: 4 },
            { name: "Oncologie", credits: 2 },
            { name: "Sănătate comunitară", credits: 2 },
            { name: "Radiologie", credits: 3 },
            { name: "Metodologia cercetării științifice", credits: 2 },
            { name: "Farmacologie clinică", credits: 2 },
            { name: "Opt", credits: 2 },
            { name: "Practica de vară", credits: 2 },
          ],
          5: [
            { name: "Reumatologie", credits: 5 },
            { name: "Nefrologie", credits: 5 },
            { name: "Pediatrie și puericultură", credits: 12 },
            { name: "Chirurgie generală", credits: 8 },
            { name: "Neurologie", credits: 9 },
            { name: "Urologie", credits: 4 },
            { name: "Endocrinologie", credits: 5 },
            { name: "Geriatrie și Gerontologie", credits: 2 },
            { name: "Sănătate publică", credits: 4 },
            { name: "Toxicologie", credits: 2 },
            { name: "Opt", credits: 2 },
            { name: "Practica de vară", credits: 2 },
          ],
        },
        MD: {
          1: [
            { name: "Anatomie I", credits: 6 },
            { name: "Biochimie", credits: 4 },
            { name: "Fiziologie I", credits: 4 },
            { name: "Biologie celulară și moleculară", credits: 2 },
            { name: "Biofizică", credits: 4 },
            { name: "Morfologia dinților și arcadelor dentare", credits: 6 },
            { name: "Educație fizică I", credits: 1 },
            { name: "Limba română – limba engleză I", credits: 2 },
            { name: "Optional 1 (sem.1)", credits: 2 },
            { name: "Optional 2 (sem.1)", credits: 2 },
            { name: "Anatomie II", credits: 7 },
            { name: "Biochimia cavității orale", credits: 4 },
            { name: "Fiziologie II", credits: 5 },
            { name: "Histologie", credits: 4 },
            { name: "Embriologie", credits: 4 },
            { name: "Informatică medicală și biostatistică", credits: 2 },
            { name: "Educație fizică II", credits: 1 },
            { name: "Practică de specialitate", credits: 2 },
          ],
          2: [
            { name: "Tehnologia protezelor dentare I", credits: 7 },
            { name: "Anatomie patologică", credits: 5 },
            { name: "Fiziopatologie", credits: 5 },
            { name: "Microbiologie", credits: 5 },
            { name: "Radiologie – imagistică medicală", credits: 2 },
            { name: "Psihologie / Sociologie / Comunicare med.", credits: 2 },
            { name: "Limba română – limba engleză II", credits: 2 },
            { name: "Educație fizică III", credits: 1 },
            { name: "Optional 1 (sem.3)", credits: 2 },
            { name: "Optional 2 (sem.3)", credits: 2 },
            { name: "Tehnologia protezelor dentare II", credits: 7 },
            { name: "Imunologie", credits: 3 },
            { name: "Genetică", credits: 4 },
            { name: "Semiologie medicală", credits: 4 },
            { name: "Științe comportamentale", credits: 4 },
            { name: "Metodologia cercetării științifice", credits: 4 },
            { name: "Educație fizică IV", credits: 1 },
            { name: "Practică de specialitate", credits: 2 },
          ],
          3: [
            { name: "Stomatologie preventivă I", credits: 5 },
            { name: "Odontoterapie restauratoare I", credits: 6 },
            { name: "Psihiatrie", credits: 4 },
            { name: "Ocluzologie și microproteze", credits: 6 },
            { name: "Deontologie medicală. Bioetică", credits: 3 },
            { name: "Farmacologie", credits: 4 },
            { name: "Stomatologie preventivă II", credits: 5 },
            { name: "Materiale dentare", credits: 4 },
            {
              name: "Semiologie chirurgicală. Chirurgie gen. ATI",
              credits: 5,
            },
            { name: "Oftalmologie", credits: 3 },
            { name: "Medicină internă", credits: 2 },
            {
              name: "Prim ajutor. Urgențe stomato",
              credits: 2,
            },
            { name: "Endocrinologie", credits: 3 },
            { name: "Dermato-venerologie", credits: 2 },
            { name: "Practică de specialitate", credits: 2 },
            { name: "Optional 1 (an III)", credits: 2 },
            { name: "Optional 2 (an III)", credits: 2 },
          ],
          4: [
            { name: "Protetică dentară I", credits: 9 },
            { name: "Pedodonție I", credits: 6 },
            { name: "Pediatrie", credits: 3 },
            { name: "Igienă", credits: 4 },
            { name: "Neurologie", credits: 4 },
            { name: "Radiologie dentară", credits: 5 },
            {
              name: "Chirurgie OMF I – Anesteziologie / Sedare",
              credits: 7,
            },
            { name: "ORL", credits: 4 },
            { name: "Odontoterapie restauratoare", credits: 7 },
            { name: "Boli infecțioase, epidemiologie", credits: 4 },
            { name: "Medicină legală", credits: 2 },
            { name: "Practică", credits: 3 },
            { name: "Opțional (an IV)", credits: 2 },
          ],
          5: [
            { name: "Chirurgie O.M.F. II", credits: 9 },
            { name: "Endodonție I", credits: 8 },
            { name: "Parodontologie I", credits: 4 },
            { name: "Managementul cabinetului dentar", credits: 2 },
            {
              name: "Organizare profesională și legislație – malpraxis",
              credits: 2,
            },
            { name: "Fizioterapie", credits: 2 },
            { name: "Bioetică", credits: 2 },
            {
              name: "Ortodonție și ortopedie dento-facială I",
              credits: 8,
            },
            { name: "Protetică dentară II", credits: 8 },
            { name: "Pedodonție II", credits: 6 },
            { name: "Sănătate publică", credits: 2 },
            { name: "Practică", credits: 5 },
            { name: "Optional (an V)", credits: 2 },
          ],
        },
      };

      /* Thresholds only for MG (example). For MD, we skip them. */
      const thresholdsMG = {
        1: { buget: 8.15, bursa: 9.31 },
        2: { buget: 8.13, bursa: 9.45 },
        3: { buget: 8.33, bursa: 9.43 },
        4: { buget: 8.55, bursa: 9.58 },
        5: { buget: 8.5, bursa: 9.66 },
      };

      function getThresholds(program, year) {
        if (program === "MG") {
          return thresholdsMG[year] || null;
        }
        // MD => no threshold
        return null;
      }

      /* Historical stats placeholder - not used in final. */
      function HistoricalStatsMG() {
        return null;
      }

      function GradeCalculator() {
        const [program, setProgram] = React.useState("MG");
        const [year, setYear] = React.useState(1);
        const [grades, setGrades] = React.useState({});
        const [finalGrade, setFinalGrade] = React.useState(null);
        const [status, setStatus] = React.useState(null);

        /* Current subject list */
        const currentSubjects = subjectsData[program][year] || [];
        /* Sort by descending credits for a neat display */
        const sortedSubjects = React.useMemo(() => {
          return [...currentSubjects].sort((a, b) => b.credits - a.credits);
        }, [currentSubjects]);

        /* For MG, we read the thresholds; MD => no thresholds */
        const thresholdInfo = getThresholds(program, year);

        const handleGradeChange = (subjectName, value) => {
          setGrades((prev) => ({
            ...prev,
            [subjectName]: parseFloat(value),
          }));
        };

        const calculateFinalGrade = () => {
          let totalCredits = 0;
          let weightedSum = 0;

          sortedSubjects.forEach(({ name, credits }) => {
            const val = grades[name];
            if (!isNaN(val)) {
              weightedSum += val * credits;
              totalCredits += credits;
            }
          });

          const average = totalCredits ? weightedSum / totalCredits : 0;
          const final = average.toFixed(2);
          setFinalGrade(final);

          if (program === "MG" && thresholdInfo) {
            const { buget, bursa } = thresholdInfo;
            if (average >= bursa) setStatus("Student bursă 🎉");
            else if (average >= buget) setStatus("Student buget ✅");
            else setStatus("Student taxă ❌");
          } else {
            // For MD, no status
            setStatus(null);
          }
        };

        const resetFields = () => {
          setGrades({});
          setFinalGrade(null);
          setStatus(null);
        };

        /* Check if all subjects have a valid numeric grade. */
        const allSubjectsFilled = sortedSubjects.every(({ name }) => {
          const val = grades[name];
          return val !== undefined && !isNaN(val);
        });

        return (
          <div>
            <div className="selector-container">
              <div className="select-group">
                <label>Facultate</label>
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setYear(1);
                    resetFields();
                  }}
                >
                  <option value="MG">Medicină Generală</option>
                  <option value="MD">Medicină Dentară</option>
                </select>
              </div>
              <div className="select-group">
                <label>Anul</label>
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(parseInt(e.target.value, 10));
                    resetFields();
                  }}
                >
                  {[1, 2, 3, 4, 5].map((an) => (
                    <option key={an} value={an}>
                      Anul {an}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {sortedSubjects.map(({ name, credits }) => (
              <div className="subject-container" key={name}>
                <span>
                  {name} ({credits} ECTS)
                </span>
                <select
                  value={grades[name] || ""}
                  onChange={(e) => handleGradeChange(name, e.target.value)}
                >
                  <option value="">Nota</option>
                  {[5, 6, 7, 8, 9, 10].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              className="calculate-btn"
              disabled={!allSubjectsFilled}
              onClick={calculateFinalGrade}
            >
              Calculează Media
            </button>
            <button className="reset-btn" onClick={resetFields}>
              Reset
            </button>

            {finalGrade && (
              <div className="result">
                <p>Medie Finală: {finalGrade}</p>
                {status && <p>{status}</p>}
                {/* If we want to show historical stats for MG:
                    {program === 'MG' && <HistoricalStatsMG studyYear={year} />} */}
              </div>
            )}
          </div>
        );
      }

      ReactDOM.render(<GradeCalculator />, document.getElementById("app"));
    </script>
  </body>
</html>
