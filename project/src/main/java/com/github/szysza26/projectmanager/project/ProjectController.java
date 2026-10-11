package com.github.szysza26.projectmanager.project;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
	@PreAuthorize ("hasRole('CREATE_PROJECT')")
	public ProjectDetailedDTO createProject(@Valid @RequestBody CreateProjectRequest createProjectRequest,
											Authentication authentication) {
		return projectService.createProject (createProjectRequest, authentication.getName ());
	}

	@DeleteMapping("/projects/{projectId}")
	@PreAuthorize("hasRole('DELETE_PROJECT')")
	public void deleteProject(@PathVariable Long projectId) {
		projectService.deleteProject (projectId);
	}
}
