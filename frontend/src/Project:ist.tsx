import { useEffect, useState } from 'react';
import { Project } from './types/Project';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch('https://localhost:5000/api/Project');
    const data = await response.json();
    setProjects(data);
  };

  const handleEdit = (project: Project) => {
    console.log('Edit project:', project);
    setEditingProject({ ...project });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    const { name, value } = e.target;
    setEditingProject({ ...editingProject, [name]: value });
  };

  const handleSave = async () => {
    if (!editingProject) return;

    const response = await fetch(
      `https://localhost:5000/api/Project/${editingProject.projectId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      },
    );

    if (response.ok) {
      await fetchProjects();
      setEditingProject(null);
    } else {
      console.error('Failed to update project');
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?',
    );
    if (!confirmDelete) return;

    const response = await fetch(
      `https://localhost:5000/api/Project/${projectId}`,
      {
        method: 'DELETE',
      },
    );

    if (response.ok) {
      await fetchProjects();
    } else {
      console.error('Failed to delete project');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Project List</h1>
      <br />

      {/* Edit form now appears above the table */}
      {editingProject && (
        <div
          style={{
            marginBottom: '2rem',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          <h2>Edit Project</h2>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={editingProject.projectName}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="projectType"
            placeholder="Project Type"
            value={editingProject.projectType}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="projectRegionalProgram"
            placeholder="Regional Program"
            value={editingProject.projectRegionalProgram}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="projectImpact"
            placeholder="Impact"
            value={editingProject.projectImpact}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="projectPhase"
            placeholder="Phase"
            value={editingProject.projectPhase}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="projectFunctionalityStatus"
            placeholder="Status"
            value={editingProject.projectFunctionalityStatus}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={handleSave}
              style={{ ...buttonStyle, marginRight: '1rem' }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{ ...buttonStyle, backgroundColor: '#aaa' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <thead style={{ backgroundColor: '#777' }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Regional Program</th>
            <th style={thStyle}>Impact</th>
            <th style={thStyle}>Phase</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Edit</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}
            >
              <td style={tdStyle}>{project.projectName}</td>
              <td style={tdStyle}>{project.projectType}</td>
              <td style={tdStyle}>{project.projectRegionalProgram}</td>
              <td style={tdStyle}>{project.projectImpact}</td>
              <td style={tdStyle}>{project.projectPhase}</td>
              <td style={tdStyle}>{project.projectFunctionalityStatus}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(project)} style={buttonStyle}>
                  Edit
                </button>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(project.projectId)}
                  style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'center',
  borderBottom: '2px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #eee',
};

const rowStyleEven: React.CSSProperties = {
  backgroundColor: '#333',
};

const rowStyleOdd: React.CSSProperties = {
  backgroundColor: '#555',
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px',
  margin: '8px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default ProjectList;
