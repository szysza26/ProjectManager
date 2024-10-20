package com.github.szysza26.projectmanager.project;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final ProjectConverter projectConverter;
	private final TaskClient taskClient;

	public List<ProjectSummaryDTO> getProjects() {
		List<Project> projects = projectRepository.findAll ();
		return projects.stream ().map (projectConverter::projectToProjectSummaryDTO).toList ();
	}

	public ProjectDetailedDTO getProject(Long projectId) {
		Project project = projectRepository.findById (projectId)
				.orElseThrow (() -> new RuntimeException ("Project not found"));

		return projectConverter.projectToProjectDetailedDTO (project);
	}

	public ProjectDetailedDTO createProject(CreateProjectRequest createProjectRequest) {
		Project project = new Project ();
		project.setName (createProjectRequest.getName ());
		project.setDescription (createProjectRequest.getDescription ());
		projectRepository.save (project);

		return projectConverter.projectToProjectDetailedDTO (project);
	}

	public ProjectDetailedDTO updateProject(Long projectId, CreateProjectRequest createProjectRequest) {
		Project project = projectRepository.findById (projectId)
				.orElseThrow (() -> new RuntimeException ("Project not found"));

		project.setName (createProjectRequest.getName ());
		project.setDescription (createProjectRequest.getDescription ());
		projectRepository.save (project);

		return projectConverter.projectToProjectDetailedDTO (project);
	}

	public void deleteProject(Long projectId) {
		taskClient.deleteTasksForProject (projectId);
		projectRepository.deleteById (projectId);
	}
}
