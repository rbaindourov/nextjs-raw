"use client";
import React, {useState, useLayoutEffect, useMemo} from "react";

function FactoryStatus() {

const dependencyMap:Record<string, string[]> = useMemo(()=>({
    "sheets" : ["beams", "bolts", "frames"],
    "beams" : ["bolts", "frames"],
    "bolts" : ["frames"],
  }),[]);

  const [isChecked, setIsChecked] = useState<{[key:string]: boolean}>( // defining an string/boolean object map
    {
      sheets:true,
      beams:true,
      bolts:true,
      frames:true,
    }
  )
  const [isOperational, setIsOperational] = useState<Record<string, boolean>>( // alternate way to create a string/boolean object
    {
      sheets:true,
      beams:true,
      bolts:true,
      frames:true,
    }
  )

  useLayoutEffect(()=>{
    const dependencies = Object.keys(dependencyMap);
    dependencies.forEach((key, index) => {
      const dependenciesToCheck = dependencies.slice(0, index + 1);
      const allDependenciesChecked = dependenciesToCheck.every((dep) => isChecked[dep]);
      for (const dep of dependencyMap[key]) {
        setIsOperational((prev) => ({ ...prev, [dep]: allDependenciesChecked }));
      }
    });

  },[isChecked, dependencyMap]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id} = e.target;
    const [stationId] = id.split("-");
    setIsChecked( (prev)=> ({...prev, [stationId]:e.target.checked}));
  }

  return (
    <div>
    <h3>Control Panel</h3>
    <div> 
      <input type="checkbox" id="sheets-status" onChange={onChange} checked={isChecked['sheets']} />
      <span id="sheets-station" style={!isOperational['sheets'] ? { backgroundColor: "red" } : {backgroundColor: "transparent"}} >SHEETS</span>
    </div>
    <div> 
      <input type="checkbox" id="beams-status" onChange={onChange} checked={isChecked['beams']} /> 
    <span id="beams-station" style={!isOperational['beams'] ? { backgroundColor: "red" } : {backgroundColor: "transparent"}} >BEAMS</span>
    </div>
    <div> 
      <input type="checkbox" id="bolts-status" onChange={onChange} checked={isChecked['bolts']} />
      <span id="bolts-station" style={!isOperational['bolts'] ? { backgroundColor: "red" } : {backgroundColor: "transparent"}} >BOLTS</span>
    </div>
    <div> 
      <input type="checkbox" id="frames-status" onChange={onChange} checked={isChecked['frames']} />
      <span id="frames-station" style={!isOperational['frames'] ? { backgroundColor: "red" } : {backgroundColor: "transparent"}} >FRAMES</span>
    </div>
  </div>
  );
}

export default FactoryStatus;

