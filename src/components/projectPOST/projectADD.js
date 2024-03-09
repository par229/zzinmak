import React, { useState } from 'react';
import './projectADD.css';

const ProjectADD = ({ onProjectAdd }) => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    roles: {
      박민형: '',
      김현진: '',
      조원준: '',
    },
    languages: [],
    projectContent: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is related to roles, update the specific person's role
    if (name.startsWith('role_')) {
      const person = name.replace('role_', '');
      setProjectData({
        ...projectData,
        roles: {
          ...projectData.roles,
          [person]: value,
        },
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setProjectData({
      ...projectData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    // 프로젝트 데이터를 서버로 전송
    fetch('http://localhost:3001/api/projects/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 서버로부터 받은 응답 로그
        // 추가된 프로젝트 정보를 부모 컴포넌트로 전달하여 목록에 추가
        onProjectAdd(projectData);

        // 폼 초기화
        setProjectData({
          projectName: '',
          roles: {
            박민형: '',
            김현진: '',
            조원준: '',
          },
          languages: [],
          projectContent: '',
          file: null,
        });
      })
      .catch((error) => {
        console.error('프로젝트 추가 오류: ' + error);
      });
  };

  return (
    <div className="project-add">
      <h2>프로젝트 추가</h2>
      <form>
        {/* 프로젝트 입력 폼 */}
        <label>
          프로젝트 이름:
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleInputChange}
          />
        </label>
        {/* 프로젝트 내용 입력 폼 */}
        <label>
          프로젝트 내용:
          <textarea
            name="projectContent"
            value={projectData.projectContent}
            onChange={handleInputChange}
          />
        </label>
        {/* 저장 버튼 */}
        <button type="button" onClick={handleSubmit}>
          저장
        </button>
      </form>
    </div>
  );
};

export default ProjectADD;
