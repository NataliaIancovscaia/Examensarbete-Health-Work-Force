import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../assets/images/assets";


const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Malmo");
  const [category, setCategory] = useState("Diagnostics");
  const [level, setLevel] = useState("Intermediate Level");
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write job description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
          ],
        },
      });
      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current?.root.innerHTML || "");
      });
    }
    return () => {
      quillRef.current?.off("text-change");
      quillRef.current = null;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, location, category, level, salary });
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2 className="add-job-form_headline">Add Job Listing</h2>

      <div className="add-job-form_field">
        <label>Job Title</label>
        <input
          type="text"
          placeholder="Enter position title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="add-job-form_field">
        <label>Job Description</label>
        <div className="add-job-form_editor">
          <div ref={editorRef} className="editor-container" />
        </div>
      </div>

      <div className="add-job-form_grid">
        <div className="add-job-form_field">
          <label>Category</label>
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            {JobCategories.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="add-job-form_field">
          <label>Location</label>
          <select onChange={(e) => setLocation(e.target.value)} value={location}>
            {JobLocations.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="add-job-form_field">
          <label>Seniority</label>
          <select onChange={(e) => setLevel(e.target.value)} value={level}>
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div className="add-job-form_field">
        <label>Salary (SEK)</label>
        <input
          type="number"
          placeholder="25000"
          onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
          value={salary}
          min={0}
        />
      </div>

      <button type="submit" className="add-job-form_submit">Publish Job</button>
    </form>
  );
};

export default AddJob;
