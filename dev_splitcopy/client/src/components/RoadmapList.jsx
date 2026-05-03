import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import RoadmapViewer from "./RoadmapViewer";

export default function RoadmapList({ roadmaps }) {
  const [selected, setSelected] = useState(null);

  if (roadmaps.length === 0) return null;

  return (
    <div className="roadmap-list">
      <h2 className="roadmap-list-title">Generated Roadmaps</h2>

      {roadmaps.map((r, i) => (
        <div
          key={i}
          className="roadmap-card"
          onClick={() => setSelected(r)}
        >
          <h3>{r.title || r.domain}</h3>
          <RiArrowRightSLine />
        </div>
      ))}

      {selected && (
        <RoadmapViewer data={selected} close={() => setSelected(null)} />
      )}
    </div>
  );
}
