package com.github.szysza26.projectmanager.project;

import org.springframework.stereotype.Component;

@Component
public class ProjectConverter {

	public ProjectSummaryDTO projectToProjectSummaryDTO(Project project) {
		return new ProjectSummaryDTO(project.getId (), project.getName (), project.getActive (),
									 project.getCreatedAt (), project.getCreatedBy ());
	}

	public ProjectDetailedDTO projectToProjectDetailedDTO(Project project) {
		return new ProjectDetailedDTO(project.getId (), project.getName (), project.getDescription (),
									  project.getActive (), project.getCreatedAt (), project.getCreatedBy ());
	}
}
