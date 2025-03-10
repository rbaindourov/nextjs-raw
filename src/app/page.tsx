"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

interface GeneralSelectProps {
  options: string[];
  id: string;
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface CertificateProps {
  studentName: string;
  area: string;
  specialization: string;
}

const GeneralSelect: React.FC<GeneralSelectProps> = ({
  options,
  id,
  onSelect,
}) => {
  return (
    <>
      <select id={id} onChange={onSelect}>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

const Certificate: React.FC<CertificateProps> = ({
  studentName,
  area,
  specialization,
}) => {
  return (
    <div className={styles.certificate}>
      <h1>Certificate</h1>
      <p>Student Name: {studentName}</p>
      <div className={styles.divider}>
        <p>Area: {area}</p>
        <p>Specialization: {specialization}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const areaOptions = ["FrontEnd", "BackEnd", "DevOPs"];
  const specializationOptions = ["React", "Angular", "Vue"];

  const [studentName, setStudentName] = useState("");
  const [area, setArea] = useState(areaOptions[0]);
  const [specialization, setSpecialization] = useState(
    specializationOptions[0]
  );

  const [showCertificate, setShowCertificate] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (studentName === "") setShowError(true);
    else setShowCertificate(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <label> Student Name </label>
        <input
          type="text"
          onChange={({ target: { value } }) => {
            if (value === "") {
              setShowError(true);
              setShowCertificate(false);
            } else if (showError) setShowError(false);
            setStudentName(value);
          }}
        />
        {showError && <p style={{ color: "red" }}>Student Name is required</p>}
        <GeneralSelect
          options={areaOptions}
          id={"AreaSelect"}
          onSelect={({ target: { value } }) => setArea(value)}
        />
        <GeneralSelect
          options={specializationOptions}
          id={"SpecializationSelect"}
          onSelect={({ target: { value } }) => setSpecialization(value)}
        />
        <button onClick={handleSubmit}>Submit</button>

        {showCertificate && (
          <Certificate
            studentName={studentName}
            area={area}
            specialization={specialization}
          />
        )}
      </main>
    </div>
  );
}
