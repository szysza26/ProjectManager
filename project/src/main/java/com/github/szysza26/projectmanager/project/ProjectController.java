package com.github.szysza26.projectmanager.project;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
public class ProjectController {

	private final ProjectService projectService;

	@GetMapping("/projects")
	public List<ProjectSummaryDTO> index() {
		return projectService.getProjects ();
	}

	@GetMapping("/projects/{projectId}")
	public ProjectDetailedDTO show(@PathVariable Long projectId) {
		return projectService.getProject (projectId);
	}

	@PostMapping("/projects")
	public ProjectDetailedDTO createProject(@Valid @RequestBody CreateProjectRequest createProjectRequest) {
		return projectService.createProject (createProjectRequest);
	}

	@PutMapping("/projects/{projectId}")
	public ProjectDetailedDTO updateProject(@PathVariable Long projectId,
											@Valid @RequestBody CreateProjectRequest createProjectRequest) {
		return projectService.updateProject (projectId, createProjectRequest);
	}

	@DeleteMapping("/projects/{projectId}")
	public void deleteProject(@PathVariable Long projectId) {
		projectService.deleteProject (projectId);
	}
}
