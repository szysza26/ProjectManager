package com.github.szysza26.projectmanager.project;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("task-service")
public interface TaskClient {

	@DeleteMapping ("/tasks/project/{projectId}")
	void deleteTasksForProject(@PathVariable Long projectId);
}
