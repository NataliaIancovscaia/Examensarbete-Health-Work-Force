import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { JobCategories, JobLocations } from '../assets/images/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

interface PostJobResponse {
  success: boolean;
  message: string;
}

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) return error.message || 'Something went wrong';
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
};

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Malmo');
  const [category, setCategory] = useState('Diagnostics');
  const [level, setLevel] = useState('Intermediate Level');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const { backendUrl, companyToken } = useContext(AppContext)!;

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write job description...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ header: [1, 2, 3, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'clean'],
        ],
      },
    });

    quillRef.current.on('text-change', () => {
      setDescription(quillRef.current?.root.innerHTML || '');
    });

    return () => {
      quillRef.current?.off('text-change');
      quillRef.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const salaryNumber = salary === '' ? 0 : Number(salary);

  try {
    const { data } = await axios.post<PostJobResponse>(
      `${backendUrl}/api/company/post-job`,
      {
        title,
        description,
        location,
        salary: salaryNumber,
        category,
        level,
      },
      {
        headers: { token: companyToken ?? '' },
      },
    );

    alert(data.message);

    if (data.success) {
   
      setTitle('');
      setSalary('');
      setDescription('');
      setLocation('Malmo');
      setCategory('Diagnostics');
      setLevel('Intermediate Level');

      
      quillRef.current?.setContents([]);
    }
  } catch (error: unknown) {
    alert(getErrorMessage(error));
    console.error(error);
  }
};


  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2 className="add-job-form_headline">
        <strong>Add Job Listing</strong>
      </h2>

      <div className="add-job-form_body">
        <div className="add-job-form_field">
          <label>
            <strong>Job Title</strong>
          </label>
          <input
            type="text"
            placeholder="Enter position title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {JobCategories.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="add-job-form_field">
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {JobLocations.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="add-job-form_field">
            <label>Seniority</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
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
            value={salary}
            min={0}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <button type="submit" className="add-job-form_submit">
          Publish Job
        </button>
      </div>
    </form>
  );
};

export default AddJob;
