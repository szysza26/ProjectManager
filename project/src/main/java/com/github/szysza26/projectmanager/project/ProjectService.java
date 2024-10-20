package com.github.szysza26.projectmanager.project;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

	@Value ("${app.notification-queue-name}")
	private String notificationQueueName;

	private final ProjectRepository projectRepository;
	private final ProjectConverter projectConverter;
	private final TaskClient taskClient;
	private final RabbitTemplate rabbitTemplate;

	public ProjectService (ProjectRepository projectRepository, ProjectConverter projectConverter,
						   TaskClient taskClient, RabbitTemplate rabbitTemplate) {
		this.projectRepository = projectRepository;
		this.projectConverter = projectConverter;
		this.taskClient = taskClient;
		this.rabbitTemplate = rabbitTemplate;
	}

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

		rabbitTemplate.convertAndSend (notificationQueueName, "project created");

		return projectConverter.projectToProjectDetailedDTO (project);
	}

	public ProjectDetailedDTO updateProject(Long projectId, CreateProjectRequest createProjectRequest) {
		Project project = projectRepository.findById (projectId)
				.orElseThrow (() -> new RuntimeException ("Project not found"));

		project.setName (createProjectRequest.getName ());
		project.setDescription (createProjectRequest.getDescription ());
		projectRepository.save (project);

		rabbitTemplate.convertAndSend (notificationQueueName, "project updated");

		return projectConverter.projectToProjectDetailedDTO (project);
	}

	public void deleteProject(Long projectId) {
		rabbitTemplate.convertAndSend (notificationQueueName, "project deleted");
		taskClient.deleteTasksForProject (projectId);
		projectRepository.deleteById (projectId);
	}
}
